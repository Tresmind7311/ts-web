import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configuredEnv = {
    SMTP_HOST: 'smtp.example.test',
    SMTP_PORT: '587',
    SMTP_SECURE: 'false',
    SMTP_USER: 'test-user',
    SMTP_PASSWORD: 'test-password',
    CONTACT_EMAIL_FROM: 'verified@example.test',
    CONTACT_EMAIL_TO: 'info@tresmind.com',
};

function harness({ env = configuredEnv, accepted = ['info@tresmind.com'], reject = false } = {}) {
    const sent = [];
    const transports = [];
    const diagnostics = [];
    const cache = new Map();
    const nodemailer = {
        createTransport(options) {
            transports.push(options);
            return {
                async sendMail(message) {
                    sent.push(message);
                    if (reject) throw Object.assign(new Error('mock SMTP rejection'), { code: 'EMOCK' });
                    return { accepted };
                },
                close() {},
            };
        },
    };

    function load(relativePath) {
        if (cache.has(relativePath)) return cache.get(relativePath);
        const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
        const code = ts.transpileModule(source, {
            compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
        }).outputText;
        const exports = {};
        cache.set(relativePath, exports);
        const mockRequire = (name) => {
            if (name === 'server-only') return {};
            if (name === 'nodemailer') return nodemailer;
            if (name === '@/lib/contact/smtp') return load('lib/contact/smtp.ts');
            if (name === '@/lib/contact/validate') return load('lib/contact/validate.ts');
            throw new Error(`Unexpected dependency: ${name}`);
        };
        new Function('exports', 'require', 'process', 'console', 'FormData', code)(
            exports,
            mockRequire,
            { env },
            { error: (...args) => diagnostics.push(args) },
            FormData,
        );
        return exports;
    }

    return { actions: load('app/contact/actions.ts'), sent, transports, diagnostics };
}

function payload(values = {}) {
    const data = new FormData();
    for (const [key, value] of Object.entries({
        website: '', name: 'Ada', email: 'ada@example.test', phone: '',
        subject: 'New project', message: 'Please contact me.', ...values,
    })) data.set(key, value);
    return data;
}

const idle = { status: 'idle', message: '' };

test('/contact sends validated fields as a plain-text SMTP message', async () => {
    const { actions, sent, transports } = harness();
    const result = await actions.submitContactForm(idle, payload({ phone: '+1 555 1234' }));
    assert.equal(result.status, 'success');
    assert.equal(sent.length, 1);
    assert.equal(sent[0].subject, 'Website enquiry: New project');
    assert.equal(sent[0].replyTo, 'ada@example.test');
    assert.match(sent[0].text, /Name: Ada\nEmail: ada@example\.test\nPhone: \+1 555 1234\nSubject: New project\n\nMessage:\nPlease contact me\./);
    assert.equal(sent[0].html, undefined);
    assert.equal(transports[0].requireTLS, true);
});

test('footer supplies a fixed server-controlled subject and no phone', async () => {
    const { actions, sent } = harness();
    const result = await actions.submitFooterForm(idle, payload({ subject: 'Forged', phone: '+1 555 9999' }));
    assert.equal(result.status, 'success');
    assert.equal(sent[0].subject, 'Website enquiry: Website footer enquiry');
    assert.match(sent[0].text, /Phone: Not provided\nSubject: Website footer enquiry/);
    assert.doesNotMatch(sent[0].text, /Forged|555 9999/);
});

test('missing required fields and oversized inputs fail before SMTP', async () => {
    const { actions, sent } = harness();
    for (const [submit, values] of [
        [actions.submitContactForm, { name: '' }],
        [actions.submitContactForm, { email: 'invalid' }],
        [actions.submitContactForm, { subject: 'x'.repeat(161) }],
        [actions.submitContactForm, { message: 'x'.repeat(5001) }],
        [actions.submitFooterForm, { name: 'x'.repeat(121) }],
        [actions.submitFooterForm, { message: '' }],
    ]) {
        assert.equal((await submit(idle, payload(values))).status, 'error');
    }
    assert.equal(sent.length, 0);
});

test('honeypot submissions never reach SMTP', async () => {
    const { actions, sent, transports } = harness();
    assert.equal((await actions.submitContactForm(idle, payload({ website: 'bot' }))).status, 'error');
    assert.equal((await actions.submitFooterForm(idle, payload({ website: 'bot' }))).status, 'error');
    assert.equal(sent.length, 0);
    assert.equal(transports.length, 0);
});

test('missing SMTP configuration fails closed', async () => {
    const { actions, sent, transports, diagnostics } = harness({ env: {} });
    assert.equal((await actions.submitContactForm(idle, payload())).status, 'error');
    assert.equal(sent.length, 0);
    assert.equal(transports.length, 0);
    assert.equal(diagnostics.length, 1);
});

test('SMTP rejection reports an error', async () => {
    const { actions, sent } = harness({ reject: true });
    assert.equal((await actions.submitContactForm(idle, payload())).status, 'error');
    assert.equal(sent.length, 1);
});

test('success requires configured recipient acceptance', async () => {
    const other = harness({ accepted: ['other@example.test'] });
    assert.equal((await other.actions.submitContactForm(idle, payload())).status, 'error');
    const recipient = harness();
    assert.equal((await recipient.actions.submitContactForm(idle, payload())).status, 'success');
});

test('client-controlled sender, recipient, and SMTP fields are ignored', async () => {
    const { actions, sent, transports } = harness();
    const data = payload({
        from: 'forged@example.test', to: 'forged@example.test',
        SMTP_HOST: 'forged.example.test', SMTP_PASSWORD: 'forged',
    });
    assert.equal((await actions.submitContactForm(idle, data)).status, 'success');
    assert.equal(sent[0].from, configuredEnv.CONTACT_EMAIL_FROM);
    assert.equal(sent[0].to, configuredEnv.CONTACT_EMAIL_TO);
    assert.equal(transports[0].host, configuredEnv.SMTP_HOST);
    assert.equal(transports[0].auth.pass, configuredEnv.SMTP_PASSWORD);
    assert.equal(sent[0].replyTo, 'ada@example.test');
});
