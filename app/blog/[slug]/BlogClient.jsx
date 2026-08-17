"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { marked } from "marked";
import "../blog.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jcdrink.com";
const SITE_URL = "https://jcdrink.com";

function resolveImageUrl(image) {
  if (!image || typeof image !== "string") return null;
  return image.startsWith("http") ? image : `${API_URL}${image}`;
}

function setMetaByName(name, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setMetaByProperty(property, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function setSchema(schemaObj) {
  let script = document.querySelector('script[data-blog-schema="true"]');
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-blog-schema", "true");
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaObj);
}

function buildSchema(blog, slug) {
  if (blog.schemaMarkup) return blog.schemaMarkup;
  if (blog.schema) return blog.schema;
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;
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
      logo: { "@type": "ImageObject", url: `${SITE_URL}/jcDrink-logo.webp` },
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };
}

function applyBlogHeadTags(blog, slug) {
  if (!blog) return;

  const title = blog.pageTitle || blog.title;
  const description = blog.metaDescription || blog.title;
  const imageUrl = resolveImageUrl(blog.image);
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  document.title = title;

  setMetaByName("description", description);
  if (blog.metaKeywords || blog.focusKeyword) {
    setMetaByName("keywords", blog.metaKeywords || blog.focusKeyword);
  }
  setMetaByName("robots", "index, follow");
  setMetaByName("googlebot", "index, follow");

  setCanonical(canonicalUrl);

  setMetaByProperty("og:title", title);
  setMetaByProperty("og:description", description);
  setMetaByProperty("og:url", canonicalUrl);
  setMetaByProperty("og:type", "article");
  if (imageUrl) {
    setMetaByProperty("og:image", imageUrl);
    setMetaByProperty("og:image:alt", blog.altTag || blog.title);
  }

  setMetaByName("twitter:card", "summary_large_image");
  setMetaByName("twitter:title", title);
  setMetaByName("twitter:description", description);
  if (imageUrl) setMetaByName("twitter:image", imageUrl);

  setSchema(buildSchema(blog, slug));
}

export default function BlogClient({ initialBlog, slug: serverSlug }) {
  const pathname = usePathname();
  const realSlug = decodeURIComponent(pathname.split("/").filter(Boolean).pop() || "");

  const initialMatches =
    initialBlog &&
    (initialBlog.urlHandle || initialBlog.slug) &&
    (initialBlog.urlHandle || initialBlog.slug).toLowerCase() === realSlug.toLowerCase();

  const [blog, setBlog] = useState(initialMatches ? initialBlog : null);
  const [loading, setLoading] = useState(!initialMatches);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (initialMatches) {
      setBlog(initialBlog);
      setLoading(false);
      setNotFound(false);
      return;
    }

    if (!realSlug || realSlug === "placeholder") {
      setLoading(false);
      setNotFound(true);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    fetch(`${API_URL}/api/blogs/${encodeURIComponent(realSlug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (!data || data.message === "Blog not found") {
          setNotFound(true);
          setBlog(null);
        } else {
          setBlog(data);
        }
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setNotFound(true);
        setBlog(null);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [realSlug, initialMatches, initialBlog]);

  useEffect(() => {
    if (blog) {
      applyBlogHeadTags(blog, realSlug || serverSlug);
    }
  }, [blog, realSlug, serverSlug]);

  if (loading) {
    return <div style={{ padding: "60px", textAlign: "center" }}>Loading...</div>;
  }

  if (notFound || !blog) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        <p>Blog not found.</p>
      </div>
    );
  }

  const imageSrc = resolveImageUrl(blog.image) || "/Blog-image.png";
  const htmlContent = marked.parse(blog.content || "");

  return (
    <div className="Blog">
      <div className="Blog-line"></div>
      <div className="BlogDetail-wrapper">
        <div className="BlogDetail-hero">
          <img src={imageSrc} alt={blog.altTag || blog.title} />
          <div className="BlogDetail-hero-overlay"></div>
        </div>
        <div className="BlogDetail-body">
          <h1 className="Blog-main-h1">{blog.title}</h1>
          <div className="BlogDetail-meta" style={{ marginBottom: "20px", color: "#888" }}>
            <span>{blog.author}</span>
            <span style={{ marginLeft: "12px" }}>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="BlogDetail-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </div>
  );
}