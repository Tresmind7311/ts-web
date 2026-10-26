'use server';

import { deliverContactEnquiry } from '@/lib/contact/smtp';
import { validateContactForm, validateFooterForm, type ContactEnquiry } from '@/lib/contact/validate';

export type ContactFormState = { status: 'idle' | 'success' | 'error'; message: string };

export async function submitContactForm(
    _previousState: ContactFormState,
    formData: FormData,
): Promise<ContactFormState> {
    return sendEnquiry(validateContactForm(formData));
}

export async function submitFooterForm(
    _previousState: ContactFormState,
    formData: FormData,
): Promise<ContactFormState> {
    return sendEnquiry(validateFooterForm(formData));
}

async function sendEnquiry(enquiry: ContactEnquiry | null): Promise<ContactFormState> {
    if (!enquiry) {
        return { status: 'error', message: 'Please check the form fields and try again.' };
    }

    if (!(await deliverContactEnquiry(enquiry))) {
        return { status: 'error', message: 'Your message could not be sent. Please try again later.' };
    }

    return { status: 'success', message: 'Your message was sent.' };
}
