"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./blog.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").slice(0, 150);
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Blog">
      <div className="Blog-line"></div>
      <div className="Blog-container-Box-Image">
        <div className="container">
          <div className="row">
            <div className="About-title">
              <h1>JC Drink Blog – Business Tips & Industry Insights</h1>
            </div>

            {loading ? (
              <p style={{ padding: "20px" }}>Loading blogs...</p>
            ) : blogs.length === 0 ? (
              <p style={{ padding: "20px" }}>No blogs published yet.</p>
            ) : (
              blogs.map((blog) => {
                const imageSrc = blog.image
                  ? blog.image.startsWith("http")
                    ? blog.image
                    : `${API_URL}${blog.image}`
                  : "/Blog-image.png";

                return (
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12" key={blog._id}>
                    <Link href={`/blog/${blog.urlHandle}`} style={{ textDecoration: "none" }}>
                      <div className="Blog-Section">
                        <div className="blog-img-wrapper">
                          <img src={imageSrc} alt={blog.altTag || blog.title} />
                        </div>
                        <div className="blog-content">
                          <div className="blog-meta">
                            <span>{blog.author}</span>
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="Blog-title">{blog.title}</div>
                          <div className="Blog-des">
                            {blog.metaDescription || stripHtml(blog.content)}
                          </div>
                          <div className="blog-btn">
                            <span>Read More →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}