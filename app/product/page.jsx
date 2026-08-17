import Script from "next/script";
import ProductClient from "./ProductClient";

const SITE_URL = "https://jcdrink.com";
const PAGE_URL = "https://jcdrink.com/product/";
const OG_IMAGE = "/SugarFree-Banner.webp";
const TITLE = "Buy Soft Drinks & Energy Drinks Online in India";
const DESCRIPTION =
    "Buy soft drinks online in India from JC Drink. Explore refreshing beverages and energy drinks at affordable prices. Perfect for daily refreshment. Shop now!";

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
                alt: TITLE,
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

const PRODUCTS = [
    {
        slug: "energy-drink",
        name: "Energy Drink",
        image: `${SITE_URL}/products/energy-drink.jpg`,
        price: "20",
        sku: "JC-ENG-001",
        ratingValue: null,
        reviewCount: null,
    },
    {
        slug: "desi-jeera",
        name: "Desi Jeera",
        image: `${SITE_URL}/products/desi-jeera.jpg`,
        price: "10",
        sku: "JC-DJR-001",
        ratingValue: null,
        reviewCount: null,
    },
    {
        slug: "clear-lemon",
        name: "Clear Lemon",
        image: `${SITE_URL}/products/clear-lemon.jpg`,
        price: "10",
        sku: "JC-CLM-001",
        ratingValue: null,
        reviewCount: null,
    },
    {
        slug: "cola-drink",
        name: "Cola Drink",
        image: `${SITE_URL}/products/cola-drink.jpg`,
        price: "10",
        sku: "JC-COL-001",
        ratingValue: null,
        reviewCount: null,
    },
    {
        slug: "apple-fiizi",
        name: "Apple Fiizi",
        image: `${SITE_URL}/products/apple-fiizi.jpg`,
        price: "10",
        sku: "JC-APF-001",
        ratingValue: null,
        reviewCount: null,
    },
    {
        slug: "sweet-lemon",
        name: "Sweet Lemon",
        image: `${SITE_URL}/products/sweet-lemon.jpg`,
        price: "10",
        sku: "JC-SWL-001",
        ratingValue: null,
        reviewCount: null,
    },
    {
        slug: "tangy-orange",
        name: "Tangy Orange",
        image: `${SITE_URL}/products/tangy-orange.jpg`,
        price: "10",
        sku: "JC-TGO-001",
        ratingValue: null,
        reviewCount: null,
    },
];

function buildItemListElement() {
    return PRODUCTS.map((p, idx) => {
        const url = `${SITE_URL}/product/${p.slug}/`;

        const product = {
            "@type": "Product",
            "@id": `${url}#product`,
            name: p.name,
            image: [p.image],
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
        };

        if (p.ratingValue && p.reviewCount) {
            product.aggregateRating = {
                "@type": "AggregateRating",
                ratingValue: String(p.ratingValue),
                reviewCount: String(p.reviewCount),
                bestRating: "5",
                worstRating: "1",
            };
        }

        return {
            "@type": "ListItem",
            position: idx + 1,
            item: product,
        };
    });
}

const schemaData = [
    // WebPage Schema
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "JC Products",
        isPartOf: {
            "@id": `${SITE_URL}/#website`,
        },
        about: {
            "@id": `${SITE_URL}/#organization`,
        },
        description:
            "Explore JC product collection including energy drinks, desi jeera, lemon, cola, and fruit-based beverages. Discover refreshing and affordable soft drinks.",
    },
    // CollectionPage Schema (with aggregateRating + link to ItemList)
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#collection`,
        url: PAGE_URL,
        name: "JC Products",
        description:
            "Browse all JC products including energy drinks, jeera soda, lemon, cola, and fruit-based beverages.",
        isPartOf: {
            "@id": `${SITE_URL}/#website`,
        },
        about: {
            "@type": "Organization",
            name: "JC",
            url: `${SITE_URL}/`,
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.6",
            bestRating: "5",
            worstRating: "1",
            ratingCount: "210",
        },
        mainEntity: {
            "@id": `${PAGE_URL}#itemlist`,
        },
    },
    // ItemList Schema
    {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${PAGE_URL}#itemlist`,
        name: "JC Product List",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: PRODUCTS.length,
        itemListElement: buildItemListElement(),
    },
    // Breadcrumb Schema
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
                name: "Products",
                item: PAGE_URL,
            },
        ],
    },
    // FAQPage Schema
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: [
            {
                "@type": "Question",
                name: "How can I order soft drinks from JC?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can place your order by filling out the inquiry form on our website. Our team will contact you to process your request.",
                },
            },
            {
                "@type": "Question",
                name: "Can I buy soft drinks online directly from the website?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Currently, we do not offer direct checkout. Customers can submit an inquiry, and our team will assist with the order.",
                },
            },
            {
                "@type": "Question",
                name: "What happens after I submit the inquiry form?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Once you submit the form, our team will get in touch with you to discuss product details, pricing, and delivery.",
                },
            },
            {
                "@type": "Question",
                name: "Do you accept bulk orders?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we specialize in bulk orders for retailers, wholesalers, events, and businesses.",
                },
            },
            {
                "@type": "Question",
                name: "What types of soft drinks do you offer?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We offer carbonated drinks, desi-flavored beverages like jeera soda and masala soda, fruit-based drinks, and more.",
                },
            },
            {
                "@type": "Question",
                name: "Do you provide energy drink options in India?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we offer refreshing beverage options suitable for consumers looking for energy drink alternatives in India.",
                },
            },
            {
                "@type": "Question",
                name: "Are your drinks suitable for daily consumption?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, our beverages are designed for everyday refreshment with consistent quality and taste.",
                },
            },
            {
                "@type": "Question",
                name: "What packaging options are available?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We provide multiple bottle sizes, including small, medium, and bulk packaging options.",
                },
            },
            {
                "@type": "Question",
                name: "Do you supply to restaurants and cafes?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, our products are ideal for restaurants, cafes, and food service businesses.",
                },
            },
            {
                "@type": "Question",
                name: "Can I order for events or parties?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you can place bulk inquiries for parties, events, and large gatherings.",
                },
            },
            {
                "@type": "Question",
                name: "Are your drinks affordable?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we offer value-driven pricing suitable for both individual buyers and businesses.",
                },
            },
            {
                "@type": "Question",
                name: "Are your beverages hygienically produced?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all our drinks are manufactured and packaged following strict quality and hygiene standards.",
                },
            },
            {
                "@type": "Question",
                name: "Do you offer distribution opportunities?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we welcome distributors, wholesalers, and retailers to partner with us.",
                },
            },
            {
                "@type": "Question",
                name: "How long does it take to get a response after an inquiry?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our team typically responds within a short time to assist you with your order requirements.",
                },
            },
            {
                "@type": "Question",
                name: "Do you deliver across India?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We are expanding our network and aim to serve customers across multiple regions in India.",
                },
            },
            {
                "@type": "Question",
                name: "What flavors are available in your drinks?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "We offer a variety of flavors, including spicy, tangy, fruity, and traditional Indian blends.",
                },
            },
            {
                "@type": "Question",
                name: "Can small businesses order from JC?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we support small retailers and businesses with flexible order quantities.",
                },
            },
            {
                "@type": "Question",
                name: "Is there a minimum order quantity?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Minimum order quantity may vary depending on the product and location. Our team will guide you after the inquiry.",
                },
            },
            {
                "@type": "Question",
                name: "Why should I choose JC?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "JC offers authentic desi flavors, consistent quality, affordable pricing, and strong business support.",
                },
            },
            {
                "@type": "Question",
                name: "How do I contact JC for business inquiries?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can fill out the inquiry form on our website, and our team will get in touch with you shortly.",
                },
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

            <ProductClient />
        </>
    );
}