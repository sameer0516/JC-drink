"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jcdrink.com";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
    });

    const [status, setStatus] = useState({ loading: false, success: null, error: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

            setStatus({ loading: false, success: data.message, error: null });
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                subject: "General Inquiry",
                message: "",
            });
        } catch (err) {
            setStatus({ loading: false, success: null, error: err.message });
        }
    };

    return (
        <>
            <div className="contact-section">
                <div className="contact-section-container">
                    <div className="contact-content">
                        <div className="contact-grid">

                            <div data-aos="fade-right" className="contact-form-section">
                                <h1 className="form-title">Contact Us – Start Your Business with JC Drink</h1>
                                <p className="form-subtitle">
                                    We'll get back to you within one business day.
                                </p>

                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                className="form-input"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                className="form-input"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                className="form-input"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number"
                                                className="form-input"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group full-width">
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            className="form-input"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <textarea
                                            name="message"
                                            placeholder="Your Message"
                                            className="form-textarea"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="submit-btn" disabled={status.loading}>
                                        {status.loading ? "SENDING..." : "SEND MESSAGE"}
                                    </button>

                                    {status.success && (
                                        <p className="form-success-msg">{status.success}</p>
                                    )}
                                    {status.error && (
                                        <p className="form-error-msg">{status.error}</p>
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