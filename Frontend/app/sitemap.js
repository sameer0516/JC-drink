// app/sitemap.js
export const dynamic = "force-static";
const API_BASE_URL = "https://api.jcdrink.com";

export default async function sitemap() {
  let productEntries = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      next: { revalidate: 3600 },
    });
    const products = await res.json();

    productEntries = products
      .filter((p) => p.slug)
      .map((p) => ({
        url: `https://www.jcdrink.com/product/${p.slug}`,
        lastModified: new Date(p.updatedAt || p.createdAt),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch (e) {
    console.error("Sitemap error:", e);
  }

  return [
    {
      url: "https://www.jcdrink.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.jcdrink.com/product",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://www.jcdrink.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.jcdrink.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.jcdrink.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}