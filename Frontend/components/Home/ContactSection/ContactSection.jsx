"use client";

import emailjs from "@emailjs/browser";
import React, { useState } from "react";
import "./ContactSection.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    try {
      // 1. Web3Forms ko data bhejo (lead yaha jayegi)
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "4a9bb777-cba4-4d73-988c-45782826f6d0",
          subject: `New Contact Message from ${formData.firstName} ${formData.lastName}`,
          from_name: "JC Drink Website - Contact Section",
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
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

        setSubmitted(true);
        setStatus({ loading: false, error: null });
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setStatus({ loading: false, error: "Something went wrong. Please try again." });
      }
    } catch (err) {
      setStatus({ loading: false, error: "Something went wrong. Please try again." });
    }
  };

  return (
    <>
      <div className="cs-contact-section">
        <div className="cs-contact-section-container">
          <div className="cs-contact-content">
            <div className="cs-contact-grid">

              <div data-aos="fade-right" className="cs-contact-form-section">
                <h2 className="cs-form-title">Leave a Message</h2>
                <p className="cs-form-subtitle">
                  We'll get back to you within one business day.
                </p>

                {submitted && (
                  <div className="cs-form-success">
                    Thank you! We'll be in touch soon.
                  </div>
                )}

                <form className="cs-contact-form" onSubmit={handleSubmit}>
                  <div className="cs-form-row">
                    <div className="cs-form-group">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="cs-form-input"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="cs-form-group">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="cs-form-input"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="cs-form-group cs-full-width">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="cs-form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="cs-form-group cs-full-width">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      className="cs-form-textarea"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="cs-form-submit-row">
                    <button type="submit" className="cs-submit-btn" disabled={status.loading}>
                      {status.loading ? "SENDING..." : "SEND MESSAGE"}
                    </button>
                    {status.error && (
                      <p className="cs-form-error-msg">{status.error}</p>
                    )}
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}