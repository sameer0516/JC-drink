'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) setIsMobileMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const handleClickOutside = (e) => {
            if (!e.target.closest(`.${styles.navbarContent}`)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMobileMenuOpen]);

    const navLinks = [
        ['/', 'Home'],
        ['/about', 'About Us'],
        ['/product', 'Products'],
        ['/distributor', 'Distributor'],
        ['/blog', 'Blog'],
        ['/contact', 'Contact Us'],
    ];

    return (
        <nav className={`${styles.navbarContainer} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.navbarContent}>

                {/* Logo */}
                <div className={styles.navbarLogo}>
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <img src="/jcDrink-logo.webp" alt="JC Drink Logo" className={styles.logo} />
                    </Link>
                </div>

                {/* Desktop Menu — only visible at 1200px+ */}
                <ul className={styles.desktopNav}>
                    {navLinks.map(([href, label]) => (
                        <li key={href}>
                            <Link href={href}>{label}</Link>
                        </li>
                    ))}
                </ul>

                {/* Right Side */}
                <div className={styles.navbarRight}>
                    {/* WhatsApp Button — only on desktop */}
                    <button
                        className={styles.contactBtn}
                        onClick={() => window.open("https://wa.me/918432221711?text=Hello%20there!", "_blank")}
                        aria-label="Call us"
                    >
                        <span className={styles.phoneIcon}>📞</span>
                        <span className={styles.phoneText}>+91-8432221711</span>
                    </button>

                    {/* Hamburger — only on mobile/tablet */}
                    <button
                        className={styles.hamburger}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line1Open : ''}`} />
                        <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line2Open : ''}`} />
                        <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.line3Open : ''}`} />
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                    <ul className={styles.mobileNavList}>
                        {navLinks.map(([href, label]) => (
                            <li key={href}>
                                <Link href={href} onClick={() => setIsMobileMenuOpen(false)}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                        <li className={styles.mobileWhatsapp}>
                            <button onClick={() => {
                                window.open("https://wa.me/918432221711?text=Hello%20there!", "_blank");
                                setIsMobileMenuOpen(false);
                            }}>
                                📞 +91-8432221711
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}