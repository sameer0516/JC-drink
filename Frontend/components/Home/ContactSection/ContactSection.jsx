"use client";
import { useState } from "react";
import "./ContactSection.css";

// Use your jcDrink backend URL here. 
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jcdrink.com"; 

export default function ContactSection() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });
    
    const [status, setStatus] = useState({ loading: false, success: "", error: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: "", error: "" });

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

            setStatus({ loading: false, success: "Message sent successfully!", error: "" });
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                message: "",
            });
        } catch (err) {
            setStatus({ loading: false, success: "", error: err.message });
        }
    };

    return (
        <>
            <div className="contact-section">
                <div className="contact-section-container">
                    <div className="contact-content">
                        <div className="contact-grid">
                            <div data-aos="fade-right" className="contact-form-section">
                                <h2 className="form-title">Leave a Message</h2>
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
                                    <div className="form-group full-width">
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

                                    {/* Success and Error Messages */}
                                    {status.error && <p className="form-error" style={{ color: "red", fontSize: "14px", paddingBottom: "10px" }}>{status.error}</p>}
                                    {status.success && <p className="form-success" style={{ color: "green", fontSize: "14px", paddingBottom: "10px" }}>{status.success}</p>}

                                    <button type="submit" className="submit-btn" disabled={status.loading}>
                                        {status.loading ? "SENDING..." : "SEND MESSAGE"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}