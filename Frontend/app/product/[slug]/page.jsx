// app/product/[slug]/page.jsx

import ProductDetailClient from "./ProductDetailClient";
import Link from "next/link";

const API_BASE_URL = "https://api.jcdrink.com";
const API_URL = `${API_BASE_URL}/api`;

// Static export ke liye required
export const dynamicParams = false;

// ─────────────────────────────
// Custom SEO Data
// ─────────────────────────────
const productSEO = {
  "desi-jeera": {
    metaTitle:
      "Desi Jeera Drink – Refreshing Masala Cold Drink for Summer",

    metaDescription:
      "Cool down with our refreshing desi jeera drink. A flavorful masala cold drink perfect for summer. Order online from JC Drink today!",

    canonical:
      "https://jcdrink.com/product/desi-jeera",
  },

  "apple-fiizi": {
    metaTitle:
      "Shop Delicious Apple Apple Fizz Drink in India Online",

    metaDescription:
      "Quench your thirst with Apple Fiizi – a refreshing apple-flavored drink and fruit beverage. Order online in India and enjoy a delicious daily refreshment! ",

    canonical:
      "https://jcdrink.com/product/apple-fiizi",
  },

  "sweet-lemon": {
    metaTitle:
      "Buy Refreshing Sweet Lemon Drink Online in India",

    metaDescription:
      "Enjoy our refreshing Sweet Lemon Drink – a zesty lemon-flavored beverage perfect for summer. Buy your favorite lemon drink online in India from JC Drink today!",

    canonical:
      "https://jcdrink.com/product/sweet-lemon",
  },

  "cola-drink": {
    metaTitle:
      "Buy Refreshing & Affordable Cold Cola in India Online",

    metaDescription:
      "Enjoy the classic taste of our refreshing Cola Drink – a cola-flavored daily drink that’s affordable and perfect for India. Order online from JC Drink today!",

    canonical:
      "https://jcdrink.com/product/cola-drink",
  },

  "clear-lemon": {
    metaTitle:
      "Buy Refreshing Clear Lemon Soft Drink in India | JC Drink",

    metaDescription:
      "Stay refreshed with our Clear Lemon Drink – a zesty lemon soft drink perfect for summer. Enjoy a cool lemon cold drink online from JC Drink in India!",

    canonical:
      "https://jcdrink.com/product/clear-lemon",
  },

  "energy-drink": {
    metaTitle:
      "Boost Energy Instantly with Healthy Energy Drink in India",

    metaDescription:
      "Looking for the best energy drink in India? JC Drink offers healthy, instant energy drinks to keep you active and refreshed. Shop online today!",

    canonical:
      "https://jcdrink.com/product/energy-drink",
  },

  "tangy-orange": {
    metaTitle:
      "Shop Refreshing Tangy Orange Drink Online in India",

    metaDescription:
      "Shop Tangy Orange Drink – a zesty, refreshing orange-flavored beverage in India. Order online today and enjoy cool, delicious refreshment!",

    canonical:
      "https://jcdrink.com/product/tangy-orange",
  },
};


// ─────────────────────────────
// Fetch Products
// ─────────────────────────────
async function getAllProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, {
      cache: "force-cache",
    });

    if (!res.ok) return [];

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Product fetch error:", err);
    return [];
  }
}

// ─────────────────────────────
// Static Params
// ─────────────────────────────
export async function generateStaticParams() {
  const products = await getAllProducts();

  if (!products.length) {
    console.warn("⚠️ No products found");
    return [];
  }

  return products
    .filter((p) => p?.slug)
    .map((p) => ({
      slug: String(p.slug).trim(),
    }));
}

// ─────────────────────────────
// SEO Metadata
// ─────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const products = await getAllProducts();

  const product = products.find(
    (p) =>
      String(p.slug).trim() ===
      String(slug).trim()
  );

  if (!product) {
    return {
      title: "Product Not Found | JC Drink",
      description:
        "The product you are looking for does not exist.",
    };
  }

  const seo = productSEO[slug];

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${API_BASE_URL}/${product.image
      ?.replace(/\\/g, "/")
      .replace(/^\/+/, "")}`;

  return {
    title:
      seo?.metaTitle ||
      `${product.title} | JC Drink`,

    description:
      seo?.metaDescription ||
      `Buy ${product.title} online from JC Drink.`,

    keywords: [
      product.title,
      product.category,
      "JC Drink",
      "soft drink",
      "beverages",
      "buy online",
    ]
      .filter(Boolean)
      .join(", "),

    alternates: {
      canonical:
        seo?.canonical ||
        `https://jcdrink.com/product/${slug}`,
    },

    openGraph: {
      title:
        seo?.metaTitle ||
        `${product.title} | JC Drink`,

      description:
        seo?.metaDescription ||
        `Buy ${product.title} online from JC Drink.`,

      url: `https://jcdrink.com/product/${slug}`,

      siteName: "JC Drink",

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title:
        seo?.metaTitle ||
        `${product.title} | JC Drink`,

      description:
        seo?.metaDescription ||
        `Buy ${product.title} online from JC Drink.`,

      images: [imageUrl],
    },
  };
}

// ─────────────────────────────
// Product Page
// ─────────────────────────────
export default async function Page({
  params,
}) {
  const { slug } = await params;

  const products = await getAllProducts();

  const initialProduct =
    products.find(
      (p) =>
        String(p.slug).trim() ===
        String(slug).trim()
    ) || null;

  if (!initialProduct) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          fontFamily: "sans-serif",
        }}
      >
        <h2>Product Not Found</h2>

        <p>
          The product &quot;{slug}&quot; does not exist.
        </p>

      <Link
          href="/product"
          style={{
            color: "#ffd93d",
            fontWeight: 600,
          }}
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <ProductDetailClient
      slug={slug}
      initialProduct={initialProduct}
    />
  );
}