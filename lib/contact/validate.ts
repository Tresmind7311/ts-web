export type ContactEnquiry = {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
};

const LIMITS = { name: 120, email: 254, phone: 40, subject: 160, message: 5000 } as const;

export function validateContactForm(formData: FormData): ContactEnquiry | null {
    if (formData.get('website') !== '') return null;

    const fields = {} as Record<keyof ContactEnquiry, string>;
    for (const key of Object.keys(LIMITS) as (keyof ContactEnquiry)[]) {
        const raw = formData.get(key);
        if (typeof raw !== 'string') return null;
        const value = raw.trim();
        if (value.length > LIMITS[key] || (key !== 'phone' && !value)) return null;
        fields[key] = value;
    }

    if (!/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(fields.email)) return null;
    if (/[\r\n\x00-\x1f\x7f]/.test(fields.name + fields.email + fields.phone + fields.subject)) return null;

    return fields;
}

export function validateFooterForm(formData: FormData): ContactEnquiry | null {
    const mapped = new FormData();
    for (const key of ['website', 'name', 'email', 'message']) {
        const value = formData.get(key);
        if (typeof value !== 'string') return null;
        mapped.set(key, value);
    }
    mapped.set('phone', '');
    mapped.set('subject', 'Website footer enquiry');
    return validateContactForm(mapped);
}
