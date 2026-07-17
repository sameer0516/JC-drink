// NO "use client" here — server component
import Script from "next/script";
import BlogListPage from "./BlogListPage";

const SITE_URL = "https://jcdrink.com";
const PAGE_URL = "https://jcdrink.com/blog";
const OG_IMAGE = "/Blog-image-8.png";
const TITLE = "JC Drink Blog | Beverage Business Tips & Distributorship Guide";
const DESCRIPTION =
  "Explore JC Drink blogs for insights on beverage distribution, business tips, and growth strategies in India’s FMCG market.";

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
    "@type": "CollectionPage",
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
        name: "Blog",
        item: PAGE_URL,
      },
    ],
  },
  // TODO: agar individual blog posts ke liye alag schema chahiye (jaise BlogPosting
  // type, har post ke apne slug/page pe), to yeh us blog post ke [slug]/page.js me
  // add karna, is listing page me nahi. Example:
  // {
  //   "@context": "https://schema.org",
  //   "@type": "BlogPosting",
  //   headline: "Post Title",
  //   image: `${SITE_URL}/post-image.jpg`,
  //   datePublished: "2026-01-01",
  //   author: { "@type": "Organization", name: "JC Drink" },
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

      <BlogListPage />
    </>
  );
}