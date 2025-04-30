'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

import { Link, Text, Button } from '@/components';
import { Mail, LinkedIn, Github } from '@/assets';
import { FADE_IN_SLIDE_DOWN, FADE_IN } from '@/constants/animations';

const contactMethods = [
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
    {
        icon: Mail,
        title: 'Email',
        value: 'jdiogok@gmail.com',
        link: 'mailto:jdiogok@gmail.com',
        linkText: 'Write me →',
        ariaLabel: 'Send email to jdiogok@gmail.com',
    },
];

/**
 * Contact section component that displays contact methods and a form for sending messages
 *
 * @returns {JSX.Element} The Contact section component
 */
export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        message: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState({
        loading: false,
        success: false,
        error: false,
        message: null,
    });

    const MAX_MESSAGE_LENGTH = 500;
    const [messageCount, setMessageCount] = useState(0);

    const validateField = (field, value) => {
        if (!value) {
            return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
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

        setTouched({
            name: true,
            email: true,
            message: true,
        });

        const errors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            message: validateField('message', formData.message),
        };

        const hasErrors = Object.values(errors).some((error) => error !== null);
        if (hasErrors) {
            setFormStatus({
                loading: false,
                error: true,
                message: 'Please fix the errors before submitting',
            });

            return;
        }

        setFormStatus({
            loading: true,
            success: false,
            error: false,
            message: null,
        });
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            const data = await response.json();

            setFormStatus({
                loading: false,
                ...data,
            });

            setFormData({ name: '', email: '', message: '' });
            setTouched({ name: false, email: false, message: false });
        } catch (error) {
            setFormStatus({
                loading: false,
                ...error,
            });
        } finally {
            setTimeout(() => {
                setFormStatus({
                    loading: false,
                    success: false,
                    error: false,
                    message: null,
                });
            }, 2500);

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
                weight="font-bold"
                align="center"
                id="contact-heading"
                role="heading"
                aria-label="Contact section"
                className="mb-4"
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    ...FADE_IN_SLIDE_DOWN.transition,
                }}
            >
                Contact
            </Text>
            <Text
                as="h2"
                size="text-sm"
                weight="font-normal"
                id="about-me-intro-heading"
                role="heading"
                aria-label="Get to know me section"
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    ...FADE_IN_SLIDE_DOWN.transition,
                    delay: 0.2,
                }}
            >
                Get to know me!
            </Text>

            <motion.div
                variants={FADE_IN}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                    ...FADE_IN.transition,
                    delay: 0.4,
                }}
                className="mt-8 flex flex-col gap-8 md:flex-row"
            >
                <div className="flex-1">
                    <div className="space-y-6">
                        {contactMethods.map((method) => (
                            <div
                                key={method.title}
                                className="rounded-lg border border-border-light bg-surface-light p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary-light/20 dark:border-border-dark dark:bg-surface-dark dark:hover:shadow-primary-dark/20"
                            >
                                <div className="flex flex-col items-center space-y-2 text-center">
                                    <method.icon
                                        className="fill-primary-light dark:fill-primary-dark"
                                        aria-hidden="true"
                                    />
                                    <Text
                                        as="span"
                                        size="text-base"
                                        weight="font-semibold"
                                        id={`${method.title.toLowerCase()}-heading`}
                                        aria-label={`${method.title} contact information`}
                                    >
                                        {method.title}
                                    </Text>
                                    <Text
                                        as="span"
                                        size="text-sm"
                                        id={`${method.title.toLowerCase()}-value`}
                                        aria-label={`${method.title} ${method.title === 'Email' ? 'address' : 'username'}`}
                                    >
                                        {method.value}
                                    </Text>
                                    <Link
                                        href={method.link}
                                        isExternal
                                        ariaLabel={method.ariaLabel}
                                        className="mt-2 text-sm"
                                    >
                                        {method.linkText}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <form
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

                        <div className="mb-6">
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
                            <div className="mt-1 min-h-[20px]">
                                {getFieldError('name') && (
                                    <p
                                        id="name-error"
                                        className="text-sm text-red-600 dark:text-red-400"
                                        role="alert"
                                    >
                                        {getFieldError('name')}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
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
                            <div className="mt-1 min-h-[20px]">
                                {getFieldError('email') && (
                                    <p
                                        id="email-error"
                                        className="text-sm text-red-600 dark:text-red-400"
                                        role="alert"
                                    >
                                        {getFieldError('email')}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
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

                        <Button
                            className="mt-6"
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
                            {!formStatus.loading && 'Send message'}
                        </Button>

                        <div
                            id="form-status"
                            className="sr-only"
                            aria-live="polite"
                            role="status"
                        >
                            {formStatus.loading && 'Form is submitting...'}
                            {formStatus.success && formStatus.message}
                            {formStatus.error && formStatus.message}
                        </div>

                        {formStatus.success && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4 rounded-md bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                role="alert"
                            >
                                {formStatus.message}
                            </motion.div>
                        )}

                        {formStatus.error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                role="alert"
                            >
                                {formStatus.error}
                            </motion.div>
                        )}
                    </form>
                </div>
            </motion.div>
        </section>
    );
}

Contact.propTypes = {};
