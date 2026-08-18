"use client";
import Link from "next/link";
import { useState, useRef, useCallback, useEffect } from "react";
import "./blog.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.jcdrink.com";

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").slice(0, 150);
}

export default function BlogListPage({ initialBlogs = [] }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [loading, setLoading] = useState(initialBlogs.length === 0);

  const skippedInitialFetch = useRef(false);

  const fetchBlogs = useCallback(async () => {
    if (!skippedInitialFetch.current && initialBlogs.length > 0) {
      skippedInitialFetch.current = true;
      setBlogs(initialBlogs);
      setLoading(false);
      return;
    }
    skippedInitialFetch.current = true;

    try {
      const res = await fetch(`${API_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [initialBlogs]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <>
      <div className="Blog">
        <div className="Blog-line"></div>
        <div className="Blog-container-Box-Image">
          <div className="container">
            <div className="row">
              <div className="About-title">
                <h2>Latest Blogs</h2>
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
    </>
  );
}