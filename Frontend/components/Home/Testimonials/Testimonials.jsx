"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "./Testimonials.css";

const testimonialsData = [
    {
        id: 1,
        text: "JC Drink is my go-to chill partner! Tangy Orange ka taste next level hai — ekdum chatpata aur refreshing. Perfect for summer vibes!",
        author: "Rahul S.",
    },
    {
        id: 2,
        text: "Sweet Lemon is seriously amazing! Thandak bhi aur taste bhi — pura desi feel aata hai. Highly recommended!",
        author: "Priya M.",
    },
    {
        id: 3,
        text: "Affordable bhi hai aur taste bhi mast hai. College hangouts ho ya road trip — JC Drink always sorted!",
        author: "Aman K.",
    },
    {
        id: 4,
        text: "Fizz itna smooth hai ki har sip enjoy karne ka mann karta hai. Desi flavors with modern touch — great job!",
        author: "Neha R.",
    },
    {
        id: 5,
        text: "Energy drink bhi try kiya — X Factor is powerful! Workout ke liye perfect boost milta hai.",
        author: "Karan V.",
    },
    {
        id: 6,
        text: "JC Drink ka Desi Jeera mera favorite hai. Bilkul ghar jaisa taste with extra swag!",
        author: "Sandeep T.",
    },
    {
        id: 7,
        text: "Quality aur taste dono top-notch hain. Price bhi reasonable hai — value for money product!",
        author: "Pooja S.",
    },
    {
        id: 8,
        text: "Packaging stylish hai aur drink ka flavor consistent rehta hai. Har baar same awesome experience!",
        author: "Vishal G.",
    },
];

const TOTAL = testimonialsData.length;
const TRANSITION_DURATION = 500;
const AUTO_PLAY_INTERVAL = 3500;

export default function Testimonials() {
    const [trackIndex, setTrackIndex] = useState(1);
    const [activeDot, setActiveDot] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const trackRef = useRef(null);
    const autoPlayRef = useRef(null);
    const isJumping = useRef(false);

    const extendedSlides = [
        testimonialsData[TOTAL - 1],
        ...testimonialsData,
        testimonialsData[0],
    ];

    const moveTo = useCallback((index, animate = true) => {
        setIsTransitioning(animate);
        setTrackIndex(index);
    }, []);

    const handleTransitionEnd = useCallback(() => {
        if (isJumping.current) return;

        if (trackIndex === TOTAL + 1) {
            isJumping.current = true;
            setIsTransitioning(false);
            setTrackIndex(1);
            setActiveDot(0);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    isJumping.current = false;
                    setIsTransitioning(true);
                });
            });
        } else if (trackIndex === 0) {
            isJumping.current = true;
            setIsTransitioning(false);
            setTrackIndex(TOTAL);
            setActiveDot(TOTAL - 1);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    isJumping.current = false;
                    setIsTransitioning(true);
                });
            });
        }
    }, [trackIndex]);

    // Next slide
    const goNext = useCallback(() => {
        setTrackIndex((prev) => {
            const next = prev + 1;
            const realIndex = next > TOTAL ? 0 : next - 1;
            setActiveDot(realIndex < TOTAL ? realIndex : 0);
            return next;
        });
        setIsTransitioning(true);
    }, []);

    const goToDot = useCallback((dotIndex) => {
        setActiveDot(dotIndex);
        moveTo(dotIndex + 1);
    }, [moveTo]);

    // Auto-play
    const startAutoPlay = useCallback(() => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(goNext, AUTO_PLAY_INTERVAL);
    }, [goNext]);

    const stopAutoPlay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, [startAutoPlay]);

    return (
        <>
            <section className="testimonials-section">
                <h2 className="testimonials-title">Customer reviews and testimonials</h2>

                <div
                    className="testimonials-slider-wrapper"
                    onMouseEnter={stopAutoPlay}
                    onMouseLeave={startAutoPlay}
                >
                    <div
                        ref={trackRef}
                        className="testimonials-track"
                        onTransitionEnd={handleTransitionEnd}
                        style={{
                            transform: `translateX(-${trackIndex * 100}%)`,
                            transition: isTransitioning
                                ? `transform ${TRANSITION_DURATION}ms ease-in-out`
                                : "none",
                        }}
                    >
                        {extendedSlides.map((item, i) => (
                            <div className="testimonial-card" key={i}>
                                <p className="testimonial-text">
                                    <span className="quote-open">❝</span>
                                    {item.text}
                                    <span className="quote-close">❞</span>
                                </p>
                                <p className="testimonial-author">" {item.author} "</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="testimonials-dots">
                    {testimonialsData.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${activeDot === index ? "active" : ""}`}
                            onClick={() => goToDot(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}