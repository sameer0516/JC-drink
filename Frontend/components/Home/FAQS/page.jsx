"use client";
import { useState } from "react";
import { aboutContent, faqList } from "./faqData";
import "./faq.css";

function renderInline(text) {
  const normalized = text.replace(/<\/?(b|strong)>/gi, "**");
  const tokenRegex = /(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = normalized.split(tokenRegex);

  return parts.map(function (part, i) {
    if (!part) {
      return null;
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkUrl = linkMatch[2];
      const isExternal = linkUrl.indexOf("http") === 0;

      const extraProps = {};
      if (isExternal) {
        extraProps.target = "_blank";
        extraProps.rel = "noopener noreferrer";
      }

      return (
        <a key={i} href={linkUrl} className="faq-content-link" {...extraProps}>
          {linkText}
        </a>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

function AboutBlock(props) {
  const block = props.block;
  const index = props.index;

  if (block.type === "h1") {
    return <h1 key={index} className="faq-content-h1">{renderInline(block.text)}</h1>;
  }
  if (block.type === "h2") {
    return <h2 key={index} className="faq-content-h2">{renderInline(block.text)}</h2>;
  }
  if (block.type === "h3") {
    return <h3 key={index} className="faq-content-h3">{renderInline(block.text)}</h3>;
  }
  if (block.type === "boldp") {
    return <p key={index} className="faq-content-boldp">{renderInline(block.text)}</p>;
  }
  if (block.type === "ul") {
    return (
      <ul key={index} className="faq-content-ul">
        {block.items.map(function (item, i) {
          return <li key={i}>{renderInline(item)}</li>;
        })}
      </ul>
    );
  }
  return <p key={index} className="faq-content-p">{renderInline(block.text)}</p>;
}

const FAQS = () => {
  const [openSection, setOpenSection] = useState(null);

  function toggleSection(section) {
    setOpenSection(function (prev) {
      return prev === section ? null : section;
    });
  }

  return (
    <div className="faq-page-wrapper">
      <div className="faq-container">

        <div className={"faq-accordion " + (openSection === "about" ? "active" : "")}>
          <button
            type="button"
            className="faq-accordion-header"
            onClick={function () { toggleSection("about"); }}
          >
            <span>JC – About Our Soft Drinks</span>
            <span className="faq-accordion-arrow">▾</span>
          </button>

          {openSection === "about" && (
            <div className="faq-accordion-body">
              {aboutContent.map(function (block, i) {
                return <AboutBlock block={block} index={i} key={i} />;
              })}
            </div>
          )}
        </div>

        <div className={"faq-accordion " + (openSection === "faq" ? "active" : "")}>
          <button
            type="button"
            className="faq-accordion-header"
            onClick={function () { toggleSection("faq"); }}
          >
            <span>Frequently Asked Questions</span>
            <span className="faq-accordion-arrow">▾</span>
          </button>

          {openSection === "faq" && (
            <div className="faq-accordion-body">
              {faqList.map(function (item, i) {
                return (
                  <div key={i} className="faq-qa-item">
                    <h3 className="faq-content-h3">{i + 1}. {item.q}</h3>
                    <p className="faq-content-p">{item.a}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default FAQS;