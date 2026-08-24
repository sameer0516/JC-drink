"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jcdrink.com";

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
            const res = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong.");
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
            
        } catch (err) {
            setStatus({ loading: false, success: null, error: err.message || "Something went wrong. Please try again." });
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
                                                <p className="cf-field-error-msg" style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{fieldErrors.firstName}</p>
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
                                                <p className="cf-field-error-msg" style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{fieldErrors.lastName}</p>
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
                                                <p className="cf-field-error-msg" style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{fieldErrors.email}</p>
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
                                                <p className="cf-field-error-msg" style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{fieldErrors.phone}</p>
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
                                            <p className="cf-field-error-msg" style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{fieldErrors.subject}</p>
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
                                            <p className="cf-field-error-msg" style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{fieldErrors.message}</p>
                                        )}
                                    </div>

                                    <button type="submit" className="cf-submit-btn" disabled={status.loading}>
                                        {status.loading ? "SENDING..." : "SEND MESSAGE"}
                                    </button>

                                    {status.success && (
                                        <p className="cf-form-success-msg" style={{ color: "green", marginTop: "10px", fontWeight: "bold" }}>{status.success}</p>
                                    )}
                                    {status.error && (
                                        <p className="cf-form-error-msg" style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>{status.error}</p>
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