import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className="row">

                    {/* Logo Section */}
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className={styles.footerSection}>
                            <div className={styles.logo}>
                                <div className={styles.logoContainer}>
                                    <img src="/jcDrink-logo.webp" alt="Company Logo" />
                                </div>
                                <p>SHREE BALAJI FOODS</p>
                            </div>
                        </div>
                    </div>


                    <div className="col-lg-3 col-md-6 col-12">
                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>About</h3>
                            <ul className={styles.footerLinks}>
                                <li><Link href="/" className={styles.footerLink}>Home</Link></li>
                                <li><Link href="/distributor" className={styles.footerLink}>Distributor</Link></li>
                                <li><Link href="/about" className={styles.footerLink}>About Us</Link></li>
                                <li><Link href="/team" className={styles.footerLink}>Team</Link></li>
                                <li><Link href="/blog" className={styles.footerLink}>Blog</Link></li>
                                <li><Link href="/faqs" className={styles.footerLink}>FAQ`s</Link></li>
                                <li><Link href="/contact" className={styles.footerLink}>Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>

                  

                    <div className="col-lg-3 col-md-6 col-12">
                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>Products</h3>
                            <ul className={styles.footerLinks}>
                                <li><Link href="/product/energy-drink/" className={styles.footerLink}>Energy Drink</Link></li>
                                <li><Link href="/product/desi-jeera/" className={styles.footerLink}>Desi Jeera</Link></li>
                                <li><Link href="/product/clear-lemon/" className={styles.footerLink}>Clear Lemon</Link></li>
                                <li><Link href="/product/cola-drink/" className={styles.footerLink}>Cola Drink</Link></li>
                                <li><Link href="/product/apple-fiizi/" className={styles.footerLink}>Apple Fiizi</Link></li>
                                <li><Link href="/product/sweet-lemon/" className={styles.footerLink}>Sweet Lemon</Link></li>
                                <li><Link href="/product/tangy-orange/" className={styles.footerLink}>Tangy Orange</Link></li>

                            </ul>
                        </div>
                    </div>



                    {/* Contact */}
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>Contact</h3>
                            <ul className={styles.footerLinks}>
                                <li className={styles.footerLink}>+91-8432221711</li>
                                <li className={styles.footerLink}>info@balajibeverages.com</li>
                            </ul>
                            <div className={styles.socialIcons}>
                                <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                    <FaFacebook size={20} />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                    <FaTwitter size={20} />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                    <FaLinkedin size={20} />
                                </a>
                                <a href="https://www.instagram.com/jcdrinkofficial/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                    <FaInstagram size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className={styles.footerBottom}>
                    <div className={styles.footerBottomContent}>
                        <span className={styles.footerBottomLink}>
                            copyright 2026. ALL rights Reserved
                        </span>
                        <a
                            href="https://lensclickerdigital.com/"
                            className={styles.footerBottomLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Developed By lensclickerdigital.com
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}