"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Header.css";

export default function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const slides = [
    {
      mobileImage: "/X-Factor-mobile.jpg",
      desktopImage: "/X-Factor.jpg",
    },
    {
      mobileImage: "/Just-Drink-mobile.jpg",
      desktopImage: "/Just-Drink-Banner.jpg",
    },
    {
      mobileImage: "/Pure-Desi-mobile.jpg",
      desktopImage: "/Pure-Desi-Banner.jpg",
    },
    {
      mobileImage: "/SugarFree-Banner.webp",
      desktopImage: "/Main-Banner-5.webp",
    },
  ];

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1280);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className="Header-slider-container">
        <div className="Header-slider-wrapper">
          {slides.map((slide, index) => {
            const imageSrc = isDesktop ? slide.desktopImage : slide.mobileImage;
            return (
              <div
                key={index}
                className={`Header-slide ${index === currentSlide ? "active" : ""}`}
              >
                {/* Using Next.js <Image> for optimization */}
                <Image
                  src={imageSrc}
                  alt={`Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="Header-slide-image"
                  style={{ objectFit: "cover" }}
                />

                <div className="Header-slide-overlay" />
              </div>
            );
          })}
        </div>

        {/* Prev Arrow */}
        <button
          onClick={prevSlide}
          className="nav-arrow nav-arrow-left"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Arrow */}
        <button
          onClick={nextSlide}
          className="nav-arrow nav-arrow-right"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dot Indicators */}
        <div className="dot-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`dot ${index === currentSlide ? "dot-active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="Header-content-container">
          <div className="Header-content-wrapper">
            <div className="Header-content-grid">
              <div className="Header-content-section">
                {/* Apna content yahan add karein */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}