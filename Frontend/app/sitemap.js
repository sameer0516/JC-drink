export const dynamic = "force-static";
const API_BASE_URL = "https://api.jcdrink.com";

export default async function sitemap() {
  let productEntries = [];
  let blogEntries = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      next: { revalidate: 3600 },
    });
    const products = await res.json();

    productEntries = products
      .filter((p) => p.slug)
      .map((p) => ({
        url: `https://jcdrink.com/product/${p.slug}`,
        lastModified: new Date(p.updatedAt || p.createdAt),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch (e) {
    console.error("Sitemap product error:", e);
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/blogs`, {
      next: { revalidate: 3600 },
    });
    const blogs = await res.json();

    const seenSlugs = new Set();

    blogEntries = (Array.isArray(blogs) ? blogs : [])
      .filter((b) => !b.status || b.status === "published")
      .map((b) => {
        const slug = b.urlHandle || b.slug;
        if (!slug || seenSlugs.has(slug)) return null;
        seenSlugs.add(slug);

        return {
          url: `https://jcdrink.com/blog/${slug}`,
          lastModified: new Date(b.updatedAt || b.createdAt || Date.now()),
          changeFrequency: "weekly",
          priority: 0.7,
        };
      })
      .filter(Boolean);
  } catch (e) {
    console.error("Sitemap blog error:", e);
  }

  return [
    {
      url: "https://jcdrink.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://jcdrink.com/product",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://jcdrink.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://jcdrink.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://jcdrink.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...productEntries,
    ...blogEntries,
  ];
}