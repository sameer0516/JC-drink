"use client";
import { useEffect, useState } from "react";
import { marked } from "marked";
import "../blog.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BlogClient({ slug }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.message === "Blog not found") {
          setNotFound(true);
        } else {
          setBlog(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div style={{ padding: "60px", textAlign: "center" }}>Loading...</div>;
  }

  if (notFound || !blog) {
    return <div style={{ padding: "60px", textAlign: "center" }}><p>Blog not found.</p></div>;
  }

  const imageSrc = blog.image
    ? blog.image.startsWith("http")
      ? blog.image
      : `${API_URL}${blog.image}`
    : "/Blog-image.png";

  // Markdown content ko HTML me convert karo taaki H1/H2/H3/bold/list sahi render ho
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
          <div
            className="BlogDetail-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
}