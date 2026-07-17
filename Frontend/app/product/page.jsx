import Script from "next/script";
import ProductClient from "./ProductClient";

const SITE_URL = "https://jcdrink.com";
const PAGE_URL = "https://jcdrink.com/product";
const OG_IMAGE = "/SugarFree-Banner.webp"; 
const TITLE = "Buy Soft Drinks & Energy Drinks Online in India";
const DESCRIPTION ="Buy soft drinks online in India from JC Drink. Explore refreshing beverages and energy drinks at affordable prices. Perfect for daily refreshment. Shop now!";

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
    "@type": "WebPage",
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
        name: "Products",
        item: PAGE_URL,
      },
    ],
  },
  // TODO: agar yeh page individual products ki listing hai to har product ke liye
  // "Product" schema bhi add kar sakte ho, jaise:
  // {
  //   "@context": "https://schema.org",
  //   "@type": "Product",
  //   name: "Product Name",
  //   image: `${SITE_URL}/product-image.jpg`,
  //   description: "Product description",
  //   offers: {
  //     "@type": "Offer",
  //     price: "0.00",
  //     priceCurrency: "INR",
  //     availability: "https://schema.org/InStock",
  //   },
  // },
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