import Script from "next/script";
import ContactForm from "./ContactForm";
import "./contact.css";

const SITE_URL = "https://jcdrink.com";
const PAGE_URL = "https://jcdrink.com/contact";
const OG_IMAGE = "/Just-Drink-Banner.jpg";
const TITLE = "Contact JC Drink | Apply for Distributorship & Support"; 
const DESCRIPTION ="Get in touch with JC Drink for distributorship inquiries, business partnerships, or support. Contact our team today to start your journey.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "JC Drink",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@jcdrink",
    images: [
      {
        url: OG_IMAGE,
        alt: TITLE,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: {
      "@id": `${SITE_URL}/#website`, // TODO: home page ke WebSite schema ke "@id" se match hona chahiye
    },
    about: {
      "@id": `${SITE_URL}/#organization`, // TODO: home page ke Organization schema ke "@id" se match hona chahiye
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${PAGE_URL}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: PAGE_URL,
      },
    ],
  },
];

export default function Page() {
  return (
    <>
      {/* Dynamic JSON-LD schema rendering */}
      {schemaData.map((schema, index) => (
        <Script
          key={schema["@id"] || index}
          id={`schema-${schema["@type"]}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <ContactForm />
    </>
  );
}