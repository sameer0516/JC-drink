"use client";
import { useState } from "react";
import "./faqs.css";

// ✅ Schema data
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "What are soft drinks?", acceptedAnswer: { "@type": "Answer", text: "Soft drinks are non-alcoholic beverages that are usually flavored, sweetened, and served chilled for refreshment." } },
        { "@type": "Question", name: "Which are the most popular soft drinks in India?", acceptedAnswer: { "@type": "Answer", text: "Popular soft drinks in India include cola, lemon-based drinks, orange drinks, and traditional desi flavors like jeera." } },
        { "@type": "Question", name: "What is an energy drink?", acceptedAnswer: { "@type": "Answer", text: "An energy drink is a beverage designed to provide instant refreshment and help improve alertness and energy levels." } },
        { "@type": "Question", name: "Which is the best energy drink in India?", acceptedAnswer: { "@type": "Answer", text: "The best energy drink in India depends on taste, affordability, and availability, with consumers often choosing based on personal preference." } },
        { "@type": "Question", name: "Can I buy soft drinks online in India?", acceptedAnswer: { "@type": "Answer", text: "Yes, soft drinks can be easily purchased online through websites that offer a wide range of options and convenient delivery." } },
        { "@type": "Question", name: "Are soft drinks available in bulk for retailers?", acceptedAnswer: { "@type": "Answer", text: "Yes, many suppliers provide bulk purchasing options for retailers and distributors to ensure consistent stock availability." } },
        { "@type": "Question", name: "What are desi drinks?", acceptedAnswer: { "@type": "Answer", text: "Desi drinks are beverages inspired by traditional Indian flavors such as jeera, lemon, and masala-based drinks." } },
        { "@type": "Question", name: "Which soft drinks are best for summer?", acceptedAnswer: { "@type": "Answer", text: "Lemon, orange, and fizzy cold drinks are among the best options for summer as they provide quick refreshment." } },
        { "@type": "Question", name: "Are affordable soft drinks available in India?", acceptedAnswer: { "@type": "Answer", text: "Yes, India has a wide range of affordable soft drinks that are suitable for daily consumption." } },
        { "@type": "Question", name: "What sizes are available in cold drink bottles?", acceptedAnswer: { "@type": "Answer", text: "Cold drink bottles are available in multiple sizes to suit individual use, family consumption, and retail requirements." } },
        { "@type": "Question", name: "Why are soft drinks so popular in India?", acceptedAnswer: { "@type": "Answer", text: "Soft drinks are popular due to their refreshing taste, wide variety of flavors, and affordable pricing." } },
        { "@type": "Question", name: "Are soft drinks available in bulk for retailers?", acceptedAnswer: { "@type": "Answer", text: "Yes, many suppliers provide bulk purchasing options for retailers and distributors to ensure consistent stock availability." } },
        { "@type": "Question", name: "What types of flavors are available in soft drinks?", acceptedAnswer: { "@type": "Answer", text: "Soft drinks come in various flavors including cola, citrus, fruit-based, and traditional Indian flavors." } },
        { "@type": "Question", name: "Are soft drinks suitable for daily consumption?", acceptedAnswer: { "@type": "Answer", text: "Soft drinks are commonly consumed daily for refreshment, depending on individual preference." } },
        { "@type": "Question", name: "How can retailers benefit from selling soft drinks?", acceptedAnswer: { "@type": "Answer", text: "Retailers benefit from high demand, fast product turnover, and repeat purchases." } },
        { "@type": "Question", name: "What should I check before buying soft drinks online?", acceptedAnswer: { "@type": "Answer", text: "Check product variety, pricing, packaging, availability, and supplier reliability before purchasing." } },
        { "@type": "Question", name: "Do soft drinks have a long shelf life?", acceptedAnswer: { "@type": "Answer", text: "Most soft drinks have a good shelf life when stored properly in a cool and dry place." } },
        { "@type": "Question", name: "What makes a soft drink brand reliable?", acceptedAnswer: { "@type": "Answer", text: "Consistency in quality, availability, taste, and pricing makes a brand reliable." } },
        { "@type": "Question", name: "Are there different types of energy drinks available?", acceptedAnswer: { "@type": "Answer", text: "Yes, energy drinks come in different flavors and formulations to suit various preferences." } },
        { "@type": "Question", name: "Can distributors get regular supply of soft drinks?", acceptedAnswer: { "@type": "Answer", text: "Yes, reliable suppliers ensure consistent supply for distributors and retailers." } },
        { "@type": "Question", name: "What are the benefits of buying soft drinks online?", acceptedAnswer: { "@type": "Answer", text: "Online buying offers convenience, wider selection, and easy bulk ordering options." } },
        { "@type": "Question", name: "Which soft drinks sell the most in India?", acceptedAnswer: { "@type": "Answer", text: "Cola, lemon, orange, and affordable desi drinks are among the highest-selling soft drinks." } },
        { "@type": "Question", name: "Are soft drinks easy to store for retailers?", acceptedAnswer: { "@type": "Answer", text: "Yes, soft drinks are easy to store and display, making them suitable for retail businesses." } },
        { "@type": "Question", name: "Why is pricing important in the soft drinks market?", acceptedAnswer: { "@type": "Answer", text: "Affordable pricing increases accessibility and helps drive higher sales volume." } },
        { "@type": "Question", name: "Can I start a soft drinks distribution business in India?", acceptedAnswer: { "@type": "Answer", text: "Yes, the soft drinks market offers strong opportunities due to consistent demand and wide consumer base." } },
    ],
};

const faqData = [
    { id: 1, question: "What are soft drinks?", answer: "Soft drinks are non-alcoholic beverages that are usually flavored, sweetened, and served chilled for refreshment.", tag: "Returns & Refund" },
    { id: 2, question: "Which are the most popular soft drinks in India?", answer: "Popular soft drinks in India include cola, lemon-based drinks, orange drinks, and traditional desi flavors like jeera.", tag: "Shipping" },
    { id: 3, question: "What is an energy drink?", answer: "An energy drink is a beverage designed to provide instant refreshment and help improve alertness and energy levels.", tag: "Orders" },
    { id: 4, question: "Which is the best energy drink in India?", answer: "The best energy drink in India depends on taste, affordability, and availability, with consumers often choosing based on personal preference.", tag: "Payment" },
    { id: 5, question: "Can I buy soft drinks online in India?", answer: "Yes, soft drinks can be easily purchased online through websites that offer a wide range of options and convenient delivery.", tag: "Account" },
    { id: 6, question: "Are soft drinks available in bulk for retailers?", answer: "Yes, many suppliers provide bulk purchasing options for retailers and distributors to ensure consistent stock availability.", tag: "Support" },
    { id: 7, question: "What are desi drinks?", answer: "Desi drinks are beverages inspired by traditional Indian flavors such as jeera, lemon, and masala-based drinks.", tag: "Returns & Refund" },
    { id: 8, question: "Which soft drinks are best for summer?", answer: "Lemon, orange, and fizzy cold drinks are among the best options for summer, as they provide quick refreshment.", tag: "Shipping" },
    { id: 9, question: "Are affordable soft drinks available in India?", answer: "Yes, India has a wide range of affordable soft drinks that are suitable for daily consumption.", tag: "Orders" },
    { id: 10, question: "What sizes are available in cold drink bottles?", answer: "Cold drink bottles are available in multiple sizes to suit individual use, family consumption, and retail requirements.", tag: "Payment" },
    { id: 11, question: "Why are soft drinks so popular in India?", answer: "Soft drinks are popular due to their refreshing taste, wide variety of flavors, and affordable pricing.", tag: "Account" },
    { id: 12, question: "Are soft drinks available in bulk for retailers?", answer: "Yes, many suppliers provide bulk purchasing options for retailers and distributors to ensure consistent stock availability.", tag: "Support" },
    { id: 13, question: "What types of flavors are available in soft drinks?", answer: "Soft drinks come in various flavors including cola, citrus, fruit-based, and traditional Indian flavors.", tag: "Returns & Refund" },
    { id: 14, question: "Are soft drinks suitable for daily consumption?", answer: "Soft drinks are commonly consumed daily for refreshment, depending on individual preference.", tag: "Shipping" },
    { id: 15, question: "How can retailers benefit from selling soft drinks?", answer: "Retailers benefit from high demand, fast product turnover, and repeat purchases.", tag: "Orders" },
    { id: 16, question: "What should I check before buying soft drinks online?", answer: "Check product variety, pricing, packaging, availability, and supplier reliability before purchasing.", tag: "Payment" },
    { id: 17, question: "Do soft drinks have a long shelf life?", answer: "Most soft drinks have a good shelf life when stored properly in a cool and dry place.", tag: "Account" },
    { id: 18, question: "What makes a soft drink brand reliable?", answer: "Consistency in quality, availability, taste, and pricing makes a brand reliable.", tag: "Support" },
    { id: 19, question: "Are there different types of energy drinks available?", answer: "Yes, energy drinks come in different flavors and formulations to suit various preferences.", tag: "Returns & Refund" },
    { id: 20, question: "Can distributors get a regular supply of soft drinks?", answer: "Yes, reliable suppliers ensure consistent supply for distributors and retailers.", tag: "Shipping" },
    { id: 21, question: "What are the benefits of buying soft drinks online?", answer: "Online buying offers convenience, wider selection, and easy bulk ordering options.", tag: "Orders" },
    { id: 22, question: "Which soft drinks sell the most in India?", answer: "Cola, lemon, orange, and affordable desi drinks are among the highest-selling soft drinks.", tag: "Payment" },
    { id: 23, question: "Are soft drinks easy to store for retailers?", answer: "Yes, soft drinks are easy to store and display, making them suitable for retail businesses.", tag: "Account" },
    { id: 24, question: "Why is pricing important in the soft drinks market?", answer: "Affordable pricing increases accessibility and helps drive higher sales volume.", tag: "Support" },
    { id: 25, question: "Can I start a soft drinks distribution business in India?", answer: "Yes, the soft drink market offers strong opportunities due to consistent demand and wide consumer base.", tag: "Support" },
];

// ✅ Sirf "-" aur "+" text icon — koi SVG nahi
function PlusIcon({ open }) {
    return (
        <span className={`faq-icon ${open ? "faq-icon--open" : ""}`}>
            {open ? "−" : "+"}
        </span>
    );
}

function FaqItem({ faq, isOpen, onClick }) {
    return (
        <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
            <button className="faq-btn" onClick={onClick} aria-expanded={isOpen}>
                <span className="faq-q">{faq.question}</span>
                <PlusIcon open={isOpen} />
            </button>
            <div className={`faq-body ${isOpen ? "faq-body--open" : ""}`}>
                <div className="faq-body-inner">
                    <p className="faq-a">{faq.answer}</p>
                </div>
            </div>
        </div>
    );
}

export default function Faqs() {
    const [openId, setOpenId] = useState(null);

    const handleToggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <>
            {/* ✅ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="faq-section-banner"></div>
            <section className="faq-section">
                <div className="faq-container">
                    <div className="faq-header">
                        <h2 className="faq-title">Frequently Asked Questions</h2>
                        <p className="faq-subtitle">
                            Sabse zyada puche jaane wale sawalon ke jawab yahan milenge.
                        </p>
                    </div>
                    <div className="faq-list">
                        {faqData.map((faq) => (
                            <FaqItem
                                key={faq.id}
                                faq={faq}
                                isOpen={openId === faq.id}
                                onClick={() => handleToggle(faq.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}