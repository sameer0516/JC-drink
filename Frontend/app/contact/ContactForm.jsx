"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,15}$/;

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const [status, setStatus] = useState({ loading: false, success: null, error: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Typing shuru hote hi us field ka error clear kar do
        if (fieldErrors[name]) {
            setFieldErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = "First name is required.";
        }

        if (!formData.lastName.trim()) {
            errors.lastName = "Last name is required.";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required.";
        } else if (!EMAIL_REGEX.test(formData.email.trim())) {
            errors.email = "Enter a valid email address.";
        }

        if (formData.phone.trim() && !PHONE_REGEX.test(formData.phone.trim())) {
            errors.phone = "Enter a valid phone number.";
        }

        if (!formData.subject.trim()) {
            errors.subject = "Subject is required.";
        }

        if (!formData.message.trim()) {
            errors.message = "Message is required.";
        } else if (formData.message.trim().length < 10) {
            errors.message = "Message should be at least 10 characters.";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: false, success: null, error: null });

        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setStatus({ loading: false, success: null, error: "Please fix the errors below." });
            return;
        }

        setFieldErrors({});
        setStatus({ loading: true, success: null, error: null });

        try {
            // 1. Web3Forms ko data bhejo (lead yaha jayegi)
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: "4a9bb777-cba4-4d73-988c-45782826f6d0",
                    subject: `New Contact Inquiry: ${formData.subject}`,
                    from_name: "JC Drink Website - Contact Us",
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                }),
            });

            const result = await res.json();

            if (result.success) {
                // 2. User ko confirmation mail bhejo (EmailJS se)
                try {
                    await emailjs.send(
                        "service_kuj44zk",
                        "template_8q3mab6",
                        {
                            name: formData.firstName,
                            email: formData.email,
                        },
                        "UauMKTazbyzpUjf7y"
                    );
                } catch (emailErr) {
                    console.error("Confirmation email failed:", emailErr);
                }

                setStatus({ loading: false, success: "Thank you! We'll be in touch soon.", error: null });
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    subject: "General Inquiry",
                    message: "",
                });
                setTimeout(() => setStatus({ loading: false, success: null, error: null }), 4000);
            } else {
                setStatus({ loading: false, success: null, error: "Something went wrong. Please try again." });
            }
        } catch (err) {
            setStatus({ loading: false, success: null, error: "Something went wrong. Please try again." });
        }
    };

    return (
        <>
            <div className="cf-contact-section">
                <div className="cf-contact-section-container">
                    <div className="cf-contact-content">
                        <div className="cf-contact-grid">

                            <div data-aos="fade-right" className="cf-contact-form-section">
                                <h1 className="cf-form-title">Contact Us – Start Your Business with JC Drink</h1>
                                <p className="cf-form-subtitle">
                                    We'll get back to you within one business day.
                                </p>

                                <form className="cf-contact-form" onSubmit={handleSubmit} noValidate>
                                    <div className="cf-form-row">
                                        <div className="cf-form-group">
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                className={`cf-form-input ${fieldErrors.firstName ? "cf-input-error" : ""}`}
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                            {fieldErrors.firstName && (
                                                <p className="cf-field-error-msg">{fieldErrors.firstName}</p>
                                            )}
                                        </div>
                                        <div className="cf-form-group">
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                className={`cf-form-input ${fieldErrors.lastName ? "cf-input-error" : ""}`}
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                            {fieldErrors.lastName && (
                                                <p className="cf-field-error-msg">{fieldErrors.lastName}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="cf-form-row">
                                        <div className="cf-form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                className={`cf-form-input ${fieldErrors.email ? "cf-input-error" : ""}`}
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            {fieldErrors.email && (
                                                <p className="cf-field-error-msg">{fieldErrors.email}</p>
                                            )}
                                        </div>
                                        <div className="cf-form-group">
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number"
                                                className={`cf-form-input ${fieldErrors.phone ? "cf-input-error" : ""}`}
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                            {fieldErrors.phone && (
                                                <p className="cf-field-error-msg">{fieldErrors.phone}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="cf-form-group cf-full-width">
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            className={`cf-form-input ${fieldErrors.subject ? "cf-input-error" : ""}`}
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                        {fieldErrors.subject && (
                                            <p className="cf-field-error-msg">{fieldErrors.subject}</p>
                                        )}
                                    </div>

                                    <div className="cf-form-group cf-full-width">
                                        <textarea
                                            name="message"
                                            placeholder="Your Message"
                                            className={`cf-form-textarea ${fieldErrors.message ? "cf-input-error" : ""}`}
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                        {fieldErrors.message && (
                                            <p className="cf-field-error-msg">{fieldErrors.message}</p>
                                        )}
                                    </div>

                                    <button type="submit" className="cf-submit-btn" disabled={status.loading}>
                                        {status.loading ? "SENDING..." : "SEND MESSAGE"}
                                    </button>

                                    {status.success && (
                                        <p className="cf-form-success-msg">{status.success}</p>
                                    )}
                                    {status.error && (
                                        <p className="cf-form-error-msg">{status.error}</p>
                                    )}
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}