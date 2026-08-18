import BlogClient from "./BlogClient";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.jcdrink.com";
const FETCH_TIMEOUT_MS = 15000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function normalizeSlug(slug) {
  if (!slug) return "";
  try {
    return decodeURIComponent(slug).trim().toLowerCase();
  } catch {
    return slug.trim().toLowerCase();
  }
}

async function getAllBlogs() {
  if (!API_URL) return [];
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(`${API_URL}/api/blogs`, FETCH_TIMEOUT_MS);
      if (!res.ok) throw new Error(`API responded with status ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error(`[blog] Attempt ${attempt}/${MAX_RETRIES} failed: ${err.message}`);
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
    }
  }
  return [];
}

// Har build me: known blogs + ek "placeholder" fallback shell page.
// Ye placeholder hi SPA-fallback ke kaam aayega (Step 2 dekhein).
export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs();
    const validSlugs = blogs
      .map((blog) => blog.urlHandle || blog.slug)
      .filter((slug) => typeof slug === "string" && slug.trim().length > 0)
      .map((slug) => ({ slug: slug.trim() }));

    const uniqueSlugs = Array.from(
      new Map(validSlugs.map((item) => [item.slug, item])).values()
    );

    return [{ slug: "placeholder" }, ...uniqueSlugs];
  } catch (error) {
    console.error("[blog] generateStaticParams error:", error);
    return [{ slug: "placeholder" }];
  }
}

async function getBlog(slug) {
  const normalized = normalizeSlug(slug);
  if (!normalized || normalized === "placeholder") return null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(`${API_URL}/api/blogs/${encodeURIComponent(slug)}`, FETCH_TIMEOUT_MS);
      if (!res.ok) throw new Error(`API responded with status ${res.status}`);
      const data = await res.json();
      if (!data || data.message === "Blog not found") break;
      return data;
    } catch (err) {
      console.error(`[blog] Direct fetch attempt ${attempt}/${MAX_RETRIES} failed for ${slug}: ${err.message}`);
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
    }
  }

  const blogs = await getAllBlogs();
  const match = blogs.find((b) => normalizeSlug(b.urlHandle || b.slug) === normalized);
  return match || null;
}

function resolveImageUrl(image) {
  if (!image || typeof image !== "string") return null;
  return image.startsWith("http") ? image : `${API_URL}${image}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "JC Drink Blog",
      description: "Beverage business tips and distributorship guide.",
    };
  }

  const title = blog.pageTitle || blog.title;
  const description = blog.metaDescription || blog.title;
  const imageUrl = resolveImageUrl(blog.image);
  const canonicalUrl = `https://jcdrink.com/blog/${slug}`;

  return {
    title,
    description,
    keywords: blog.metaKeywords || blog.focusKeyword || undefined,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: imageUrl ? [{ url: imageUrl, alt: blog.altTag || blog.title }] : [],
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt || blog.createdAt,
      authors: blog.author ? [blog.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

function buildSchema(blog, slug) {
  try {
    if (blog.schemaMarkup) return blog.schemaMarkup;
    if (blog.schema) return blog.schema;
    const canonicalUrl = `https://jcdrink.com/blog/${slug}`;
    const imageUrl = resolveImageUrl(blog.image);
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.metaDescription || blog.title,
      image: imageUrl ? [imageUrl] : undefined,
      author: { "@type": "Person", name: blog.author || "JC Drink" },
      publisher: {
        "@type": "Organization",
        name: "JC Drink",
        logo: { "@type": "ImageObject", url: "https://jcdrink.com/jcDrink-logo.webp" },
      },
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt || blog.createdAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    };
  } catch (err) {
    console.error(`[blog] buildSchema failed for "${slug}":`, err.message);
    return null;
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const schema = blog ? buildSchema(blog, slug) : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <BlogClient initialBlog={blog} slug={slug} />
    </>
  );
}