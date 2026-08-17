import Script from "next/script";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ContactSection from "./ContactSection/ContactSection";
import Energizing from "./Energizing/Energizing";
import OurExpertise from "./OurExpertise/OurExpertise";
import NFTMarketplace from "./NFTMarketplace/NFTMarketplace";
import Nutrition from "./Nutrition/Nutrition";
import Testimonials from "./Testimonials/Testimonials";
import FeatureBadges from "./featureBadges/featureBadges";
import AboutUs from "./Aboutsection/aboutUs";
import ChooseUs from "./chooseUs/ChooseUs";
import BestSelling from "./BestSelling/BestSelling";
import FAQS from "./FAQS/page";
import LatestBlog from "./LatestBlog/LatestBlog";

const SITE_URL = "https://jcdrink.com";
const PAGE_URL = "https://jcdrink.com/";
const OG_IMAGE = "https://jcdrink.com/New-About-us.png";
const LOGO_IMAGE = "https://jcdrink.com/jcDrink-logo.webp";
const TITLE = "JC – Refreshing & Affordable Cold Drinks in India";
const DESCRIPTION =
    "Discover JC cold drinks – refreshing, affordable beverages including jeera, lemon, cola, and energy drinks across India.";

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
        siteName: "JC",
        type: "website",
        locale: "en_IN",
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "JC Cold Drinks – Refreshing Desi Beverages Collection",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        site: "@Jcdrink0",
        creator: "@Jcdrink0",
        images: [
            {
                url: OG_IMAGE,
                alt: "JC Cold Drinks – Refreshing Desi Beverages Collection",
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

const HOME_PRODUCTS = [
    {
        slug: "energy-drink", name: "Energy Drink", image: "/Distributor-7.png", price: "20", sku: "JC-ENG-001"
    },
    { slug: "desi-jeera", name: "Desi Jeera", image: "/Distributor-1.png", price: "10", sku: "JC-DJR-001" },
    { slug: "clear-lemon", name: "Clear Lemon", image: "/Distributor-5.png", price: "10", sku: "JC-CLM-001" },
    { slug: "cola-drink", name: "Cola Drink", image: "/Distributor-4.png", price: "10", sku: "JC-COL-001" },
    { slug: "apple-fiizi", name: "Apple Fiizi", image: "/Distributor-2.png", price: "10", sku: "JC-APF-001" },
    { slug: "sweet-lemon", name: "Sweet Lemon", image: "/Distributor-3.png", price: "10", sku: "JC-SWL-001" },
    { slug: "tangy-orange", name: "Tangy Orange", image: "/Distributor-6.png", price: "10", sku: "JC-TGO-001" },
];

const schemaData = [
    // Organization Schema
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "JC",
        url: `${SITE_URL}/`,
        logo: {
            "@type": "ImageObject",
            url: LOGO_IMAGE,
        },
        image: OG_IMAGE,
        sameAs: [
            "https://x.com/Jcdrink0",
            "https://www.instagram.com/jcdrinkofficial/",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            areaServed: "India",
            availableLanguage: ["English", "Hindi"],
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            worstRating: "1",
            ratingCount: "1340",
        },
    },
    // Website Schema
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "JC",
        publisher: {
            "@id": `${SITE_URL}/#organization`,
        },
        potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    },
    // Webpage Schema
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
    // Video Schema
    {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "@id": `${SITE_URL}/#main-video`,
        name: "JC – Refreshing Soft Drinks",
        description:
            "Explore JC refreshing soft drinks. Discover delicious flavors and enjoy quality beverages for every occasion.",
        thumbnailUrl: [`${SITE_URL}/Main-Banner-2.webp`],
        uploadDate: "2026-01-01T08:00:00+05:30",
        contentUrl: `${SITE_URL}/videoplayback.mp4`,
        embedUrl: `${SITE_URL}/`,
        duration: "PT1M30S",
        publisher: {
            "@type": "Organization",
            name: "JC",
            logo: {
                "@type": "ImageObject",
                url: LOGO_IMAGE,
            },
        },
    },
    // Breadcrumb Schema
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
            },
        ],
    },
    // ItemList (Product Collection) Schema
    {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${SITE_URL}/#products`,
        name: "JC Product Collection",
        description:
            "Explore JC range of refreshing beverages, including energy drinks, jeera, lemon, cola, and fruit flavors.",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: HOME_PRODUCTS.length,
        itemListElement: HOME_PRODUCTS.map((p, idx) => {
            const url = `${SITE_URL}/product/${p.slug}/`;
            return {
                "@type": "ListItem",
                position: idx + 1,
                item: {
                    "@type": "Product",
                    "@id": `${url}#product`,
                    name: p.name,
                    image: [`${SITE_URL}${p.image}`],
                    url,
                    sku: p.sku,
                    brand: { "@type": "Brand", name: "JC" },
                    offers: {
                        "@type": "Offer",
                        url,
                        priceCurrency: "INR",
                        price: String(p.price),
                        availability: "https://schema.org/InStock",
                        itemCondition: "https://schema.org/NewCondition",
                    },
                },
            };
        }),
    },
    // FAQPage Schema
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
            {
                "@type": "Question",
                name: "What types of cold drinks does JC offer?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "JC offers a wide range of cold drinks, including jeera soda, masala soda, fruit-based beverages, and regional-flavored desi drinks.",
                },
            },
            {
                "@type": "Question",
                name: "Are JC beverages suitable for daily consumption?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, our drinks are designed for daily refreshment with consistent taste and quality.",
                },
            },
            {
                "@type": "Question",
                name: "What makes JC different from other cold drink brands?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "JC focuses on authentic desi flavors, affordable pricing, and high-quality ingredients, making it stand out from regular soft drinks.",
                },
            },
            {
                "@type": "Question",
                name: "Can I buy cold drinks online from JC?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you can easily buy cold drinks online through our platform with convenient ordering and delivery options.",
                },
            },
            {
                "@type": "Question",
                name: "Are your drinks suitable for summer?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely, our cold drinks for summer are specially crafted to keep you refreshed and hydrated during hot weather.",
                },
            },
            {
                "@type": "Question",
                name: "Do you offer affordable drinks for bulk purchase?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we provide cost-effective pricing and bulk packaging options for retailers, wholesalers, and distributors.",
                },
            },
            {
                "@type": "Question",
                name: "What bottle sizes are available?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We offer small, medium, and bulk cold drink bottle options to suit different needs.",
                },
            },
            {
                "@type": "Question",
                name: "Are JC beverages made with quality ingredients?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we use carefully selected ingredients and follow strict quality standards to ensure freshness and safety.",
                },
            },
            {
                "@type": "Question",
                name: "Do you offer distribution or dealership opportunities?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, JC offers business opportunities for distributors, retailers, and wholesalers across India.",
                },
            },
            {
                "@type": "Question",
                name: "What are desi drinks?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Desi drinks are traditional Indian beverages known for their unique flavors, such as jeera soda and masala soda.",
                },
            },
            {
                "@type": "Question",
                name: "Are your drinks suitable for parties and events?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, our beverages are perfect for parties, gatherings, and special occasions.",
                },
            },
            {
                "@type": "Question",
                name: "How do I contact JC for business inquiries?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can contact us through our website or customer support for distribution and partnership opportunities.",
                },
            },
            {
                "@type": "Question",
                name: "Do your drinks contain traditional Indian flavors?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, our products are inspired by authentic Indian taste preferences and regional flavors.",
                },
            },
            {
                "@type": "Question",
                name: "Are your cold drinks available across India?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We are expanding our distribution network to make our products widely available across India.",
                },
            },
            {
                "@type": "Question",
                name: "Are your drinks safe and hygienic?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all our beverages are produced under strict hygiene and safety standards.",
                },
            },
            {
                "@type": "Question",
                name: "Can retailers stock JC products easily?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we offer reliable supply and packaging suitable for retail environments.",
                },
            },
            {
                "@type": "Question",
                name: "Do you offer fruit-based cold drinks?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we provide a variety of fruit-based cold drinks for a refreshing and lighter taste.",
                },
            },
            {
                "@type": "Question",
                name: "Why are desi drinks becoming popular in India?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Consumers are increasingly choosing desi drinks for their authentic taste and unique flavors compared to regular sodas.",
                },
            },
            {
                "@type": "Question",
                name: "Are JC products suitable for restaurants and cafes?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, our beverages are a great addition to restaurant and cafe menus.",
                },
            },
            {
                "@type": "Question",
                name: "How can I start a business with JC?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can partner with us as a distributor or retailer by contacting our team for more details.",
                },
            },
        ],
    },
];

export default function Home() {
    return (
        <>
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
            <ChooseUs />
            <BestSelling />
            <ContactSection />
            <Nutrition />
            <AboutUs />
            <FeatureBadges />
            <Testimonials />
            <LatestBlog />
            <FAQS />
        </>
    );
}