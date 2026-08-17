"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ProductDetailAccordion.module.css";

// Converts **bold text** and <a href='...'>text</a> inside a string into real elements
function renderInline(text) {
  if (!text) return null;

  const pattern = /(\*\*[^*]+\*\*|<a\s+href=['"][^'"]+['"]\s*>[^<]*<\/a>)/g;
  const parts = String(text).split(pattern);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }

    const linkMatch = part.match(/^<a\s+href=['"]([^'"]+)['"]\s*>([^<]*)<\/a>$/);
    if (linkMatch) {
      const href = linkMatch[1];
      const label = linkMatch[2];

      if (href.startsWith("/")) {
        return (
          <Link key={i} href={href} className={styles.inlineLink}>{label}</Link>
        );
      }

      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>{label}</a>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

function AccordionItem({ title, children, isOpen, onToggle }) {
  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionHeader} onClick={onToggle}>
        <span>{title}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}>▼</span>
      </button>
      <div className={`${styles.accordionBody} ${isOpen ? styles.accordionBodyOpen : ""}`}>
        {isOpen && children}
      </div>
    </div>
  );
}

function AboutContent({ data }) {
  if (Array.isArray(data?.about) && data.about.length > 0) {
    return (
      <>
        {data.about.map((block, i) => {
          if (block.type === "heading") {
            return (
              <h4 key={i} className={styles.aboutHeading}>
                {renderInline(block.text)}
              </h4>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className={styles.aboutList}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          }
          return <p key={i}>{renderInline(block.text)}</p>;
        })}
      </>
    );
  }

  return (
    <p>
      {data?.aboutText ||
        "JC Drinks brings you a range of refreshing masala and fruit flavored beverages made with quality ingredients, perfect for every season across India."}
    </p>
  );
}

export default function ProductDetailAccordion({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const aboutTitle = data?.aboutTitle || "JC – About Our Soft Drinks";
  const faqs = data?.faqs?.length
    ? data.faqs
    : [
        {
          q: "Is this product available across India?",
          a: "Yes, we deliver JC Drink products across India.",
        },
      ];

  return (
    <div className={styles.accordionWrapper}>
      <AccordionItem title={aboutTitle} isOpen={openIndex === 0} onToggle={() => toggle(0)}>
        <AboutContent data={data} />
      </AccordionItem>

      <AccordionItem title="Frequently Asked Questions" isOpen={openIndex === 1} onToggle={() => toggle(1)}>
        {faqs.map((item, i) => (
          <div key={i} className={styles.faqItem}>
            <p className={styles.faqQuestion}>
              <strong>Q{i + 1}: {item.q}</strong>
            </p>
            <p className={styles.faqAnswer}>{renderInline(item.a)}</p>
          </div>
        ))}
      </AccordionItem>
    </div>
  );
}