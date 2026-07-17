import Script from "next/script";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ContactSection from "./ContactSection/ContactSection";
import Energizing from "./Energizing/Energizing";
import OurExpertise from "./OurExpertise/OurExpertise";
import NFTMarketplace from "./NFTMarketplace/NFTMarketplace";
import Nutrition from "./Nutrition/Nutrition";
import FAQS from "./FAQS/page";


const SITE_URL = "https://jcdrink.com/";
const PAGE_URL = "https://jcdrink.com/";
const OG_IMAGE = "/Just-Drink-Banner.jpg";
const TITLE = "Buy Affordable Cold Drinks Online – Desi Summer Drinks | JC Drink";
const DESCRIPTION = "Shop refreshing desi drinks and affordable cold drinks online at JC Drink. Explore tasty summer beverages in convenient bottles. Order now!";

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
        "@type": "Organization", // TODO: agar business type alag hai to yeh bhi change karna (jaise LocalBusiness, Store, etc.)
        "@id": `${SITE_URL}/#organization`,
        name: "Your Brand Name", // TODO
        url: `${SITE_URL}/`,
        logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}${OG_IMAGE}`,
        },
        sameAs: [
            // TODO: apne social links add karo, jaise
            // "https://www.instagram.com/yourhandle/",
            // "https://twitter.com/yourhandle",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-XXXXXXXXXX", // TODO: change
            contactType: "customer service",
            email: "info@yourdomain.com", // TODO: change
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Your Brand Name", // TODO
        publisher: {
            "@id": `${SITE_URL}/#organization`,
        },
        potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/?s={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: {
            "@id": `${SITE_URL}/#website`,
        },
        about: {
            "@id": `${SITE_URL}/#organization`,
        },
    },
    // TODO: agar FAQS component me actual questions/answers hain, unko
    // FAQPage schema me daal do, jaise:
    // {
    //   "@context": "https://schema.org",
    //   "@type": "FAQPage",
    //   "@id": `${PAGE_URL}#faq`,
    //   mainEntity: [
    //     {
    //       "@type": "Question",
    //       name: "Your question here?",
    //       acceptedAnswer: {
    //         "@type": "Answer",
    //         text: "Your answer here.",
    //       },
    //     },
    //   ],
    // },
];

export default function Home() {
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

            <Header />
            <NFTMarketplace />
            <OurExpertise />
            <Energizing />
            <Main />
            <ContactSection />
            <Nutrition />
            <FAQS />
        </>
    );
}