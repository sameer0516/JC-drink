import BlogClient from "./BlogClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getBlog(slug) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.message === "Blog not found") return null;
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | JC Drink",
      description: "This blog post does not exist.",
    };
  }

  return {
    title: blog.pageTitle || blog.title,
    description: blog.metaDescription || blog.title,
    openGraph: {
      title: blog.pageTitle || blog.title,
      description: blog.metaDescription || blog.title,
      images: blog.image ? [{ url: `${API_URL}${blog.image}`, alt: blog.altTag || blog.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.pageTitle || blog.title,
      description: blog.metaDescription || blog.title,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <BlogClient slug={slug} />;
}