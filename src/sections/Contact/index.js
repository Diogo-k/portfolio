'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { Link, Text, Button } from '@/components';

import { Mail, LinkedIn, Github } from '@/assets';

import { submitContactForm } from '@/utils';

const contactMethods = [
    {
        icon: Mail,
        title: 'Email',
        value: 'jdiogok@gmail.com',
        link: 'mailto:jdiogok@gmail.com',
        linkText: 'Write me →',
        ariaLabel: 'Send email to jdiogok@gmail.com',
    },
    {
        icon: LinkedIn,
        title: 'LinkedIn',
        value: 'João Diogo Paulo',
        link: 'https://www.linkedin.com/in/jdiogop/',
        linkText: 'Connect with me →',
        ariaLabel: 'Visit LinkedIn profile',
    },
    {
        icon: Github,
        title: 'GitHub',
        value: 'Diogo-k',
        link: 'https://github.com/Diogo-k',
        linkText: 'Follow me →',
        ariaLabel: 'Visit GitHub profile',
    },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState({
        loading: false,
        error: null,
        success: false,
    });
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        message: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const MAX_MESSAGE_LENGTH = 500;

    const validateField = (field, value) => {
        if (!value)
            return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Invalid email format';
        }
        if (field === 'message' && value.length > MAX_MESSAGE_LENGTH) {
            return `Message must be less than ${MAX_MESSAGE_LENGTH} characters`;
        }
        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));
        if (name === 'message') {
            setMessageCount(value.length);
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark all fields as touched on submit
        setTouched({
            name: true,
            email: true,
            message: true,
        });

        // Validate all fields
        const errors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            message: validateField('message', formData.message),
        };

        // Check if there are any errors
        const hasErrors = Object.values(errors).some((error) => error !== null);
        if (hasErrors) {
            setFormStatus({
                loading: false,
                error: 'Please fix the errors before submitting',
                success: false,
            });
            return;
        }

        // If no errors, proceed with submission
        setFormStatus({ loading: true, error: null, success: false });
        setIsSubmitting(true);

        try {
            const result = await submitContactForm(formData);
            setFormStatus({
                loading: false,
                error: null,
                success: true,
                message: result.message,
            });
            setFormData({ name: '', email: '', message: '' });
            setTouched({ name: false, email: false, message: false });
        } catch (error) {
            setFormStatus({
                loading: false,
                error: error.message,
                success: false,
            });
        } finally {
            setTimeout(() => {
                setFormStatus({
                    loading: false,
                    error: null,
                    success: false,
                    message: null,
                });
            }, 1500);
            setIsSubmitting(false);
        }
    };

    const getFieldError = (field) => {
        if (!touched[field] && !isSubmitting) return null;
        return validateField(field, formData[field]);
    };

    const isFormValid = () => {
        return (
            formData.name.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.message.trim() !== '' &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        );
    };

    return (
        <section
            id="contact"
            className="mx-auto flex min-h-[50vh] max-w-5xl flex-col px-4 py-28 sm:px-6 lg:px-8"
            aria-labelledby="contact-heading"
        >
            <Text
                as="h1"
                size="text-4xl"
                responsiveSize={{
                    sm: 'text-3xl',
                    md: 'text-4xl',
                    lg: 'text-5xl',
                }}
                weight="font-bold"
                align="center"
                id="contact-heading"
                role="heading"
                aria-label="Contact section"
            >
                Contact
            </Text>

            <div className="mt-8 flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-center">
                <div className="flex-1">
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {contactMethods.map((method) => (
                            <div
                                key={method.title}
                                className="rounded-lg border border-border-light bg-surface-light p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary-light/20 dark:border-border-dark dark:bg-surface-dark dark:hover:shadow-primary-dark/20"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <method.icon
                                        className="fill-primary-light"
                                        aria-hidden="true"
                                    />
                                    <Text
                                        as="h3"
                                        size="text-base"
                                        weight="font-semibold"
                                        id={`${method.title.toLowerCase()}-heading`}
                                        role="heading"
                                        aria-label={`${method.title} contact information`}
                                    >
                                        {method.title}
                                    </Text>
                                    <Text
                                        size="text-sm"
                                        className="text-muted-light dark:text-muted-dark"
                                        id={`${method.title.toLowerCase()}-value`}
                                        role="text"
                                        aria-label={`${method.title} ${method.title === 'Email' ? 'address' : 'username'}`}
                                    >
                                        {method.value}
                                    </Text>
                                    <Link
                                        href={method.link}
                                        isExternal
                                        ariaLabel={method.ariaLabel}
                                        ariaCurrent="contact"
                                        className="mt-2 text-sm transition-colors duration-300 hover:text-primary-light dark:hover:text-primary-dark"
                                    >
                                        {method.linkText}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="flex-1">
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                        noValidate
                        aria-labelledby="contact-form-heading"
                        aria-describedby="form-status"
                    >
                        <Text
                            as="h2"
                            size="text-lg"
                            weight="font-semibold"
                            id="contact-form-heading"
                            className="sr-only"
                        >
                            Contact Form
                        </Text>

                        <div
                            id="form-status"
                            className="sr-only"
                            aria-live="polite"
                            role="status"
                        >
                            {formStatus.loading && 'Form is submitting...'}
                            {formStatus.success &&
                                'Form submitted successfully!'}
                            {formStatus.error && `Error: ${formStatus.error}`}
                        </div>

                        {formStatus.success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-md bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                role="alert"
                            >
                                {formStatus.message}
                            </motion.div>
                        )}

                        {formStatus.error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                role="alert"
                            >
                                {formStatus.error}
                            </motion.div>
                        )}

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-muted-light dark:text-muted-dark"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your name"
                                required
                                disabled={formStatus.loading}
                                aria-required="true"
                                aria-invalid={!!getFieldError('name')}
                                aria-describedby={
                                    getFieldError('name')
                                        ? 'name-error'
                                        : undefined
                                }
                                className={`mt-2 w-full rounded-md border ${
                                    getFieldError('name')
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500 dark:focus:ring-red-500'
                                        : 'border-border-light focus:border-primary-light focus:ring-primary-light dark:border-border-dark dark:focus:border-primary-dark dark:focus:ring-primary-dark'
                                } bg-surface-light px-4 py-2 text-base text-text-light focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-surface-dark dark:text-text-dark`}
                            />
                            {getFieldError('name') && (
                                <p
                                    id="name-error"
                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                    role="alert"
                                >
                                    {getFieldError('name')}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-muted-light dark:text-muted-dark"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your email"
                                required
                                disabled={formStatus.loading}
                                aria-required="true"
                                aria-invalid={!!getFieldError('email')}
                                aria-describedby={
                                    getFieldError('email')
                                        ? 'email-error'
                                        : undefined
                                }
                                className={`mt-2 w-full rounded-md border ${
                                    getFieldError('email')
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500 dark:focus:ring-red-500'
                                        : 'border-border-light focus:border-primary-light focus:ring-primary-light dark:border-border-dark dark:focus:border-primary-dark dark:focus:ring-primary-dark'
                                } bg-surface-light px-4 py-2 text-base text-text-light focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-surface-dark dark:text-text-dark`}
                            />
                            {getFieldError('email') && (
                                <p
                                    id="email-error"
                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                    role="alert"
                                >
                                    {getFieldError('email')}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold text-muted-light dark:text-muted-dark"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows="6"
                                placeholder="Write your message here..."
                                required
                                disabled={formStatus.loading}
                                maxLength={MAX_MESSAGE_LENGTH}
                                aria-required="true"
                                aria-invalid={!!getFieldError('message')}
                                aria-describedby={
                                    getFieldError('message')
                                        ? 'message-error'
                                        : 'message-count'
                                }
                                className={`mt-2 w-full rounded-md border ${
                                    getFieldError('message')
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500 dark:focus:ring-red-500'
                                        : 'border-border-light focus:border-primary-light focus:ring-primary-light dark:border-border-dark dark:focus:border-primary-dark dark:focus:ring-primary-dark'
                                } bg-surface-light px-4 py-2 text-base text-text-light focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-surface-dark dark:text-text-dark`}
                            />
                            <div className="mt-1 flex justify-between">
                                {getFieldError('message') && (
                                    <p
                                        id="message-error"
                                        className="text-sm text-red-600 dark:text-red-400"
                                        role="alert"
                                    >
                                        {getFieldError('message')}
                                    </p>
                                )}
                                <p
                                    id="message-count"
                                    className={`text-sm ${
                                        messageCount > MAX_MESSAGE_LENGTH * 0.9
                                            ? 'text-red-600 dark:text-red-400'
                                            : 'text-muted-light dark:text-muted-dark'
                                    }`}
                                >
                                    {messageCount}/{MAX_MESSAGE_LENGTH}{' '}
                                    characters
                                </p>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                loading={formStatus.loading}
                                disabled={formStatus.loading || !isFormValid()}
                                aria-label={
                                    formStatus.loading
                                        ? 'Sending message...'
                                        : 'Send message'
                                }
                            >
                                {formStatus.loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg
                                            className="size-5 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    'Send message'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
