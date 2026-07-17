import Script from "next/script";
import "./about.css";

const SITE_URL = "https://jcdrink.com";
const PAGE_URL = "https://jcdrink.com/about";
const OG_IMAGE = "/Just-Drink-Banner.jpg"; 
const TITLE = "About JC Drink | Beverage Brand & Distributorship Opportunity India";
const DESCRIPTION =
    "Learn about JC Drink, our mission, vision, and growing beverage brand in India. Discover how we support distributors with high-demand desi drinks.";

export const metadata = {
    title: TITLE,
    description: DESCRIPTION,

    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: PAGE_URL,
        siteName: "JC Drink",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: OG_IMAGE,
                alt: TITLE,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        creator: "@jcdrink",
        images: [
            {
                url: OG_IMAGE,
                alt: TITLE,
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

const schemaData = [
    {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: {
            "@id": `${SITE_URL}/#website`, // TODO: home page ke WebSite schema ke "@id" se match hona chahiye
        },
        about: {
            "@id": `${SITE_URL}/#organization`, // TODO: home page ke Organization schema ke "@id" se match hona chahiye
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "About",
                item: PAGE_URL,
            },
        ],
    },
];

export default function About() {
    return (
        <div className="about">
            {/* Dynamic JSON-LD schema rendering */}
            {schemaData.map((schema, index) => (
                <Script
                    key={schema["@id"] || index}
                    id={`schema-${schema["@type"]}-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            <div className="container">

                {/* Hero Section */}
                <section className="about-content">
                    <div className="about-content-header">
                        <h1 className="about-heading">About JC Drink – Our Story & Vision</h1>
                        <p className="about-description">
                            We believe in creating extraordinary experiences through innovation,
                            dedication, and a commitment to excellence that spans every aspect of our work.
                        </p>
                    </div>

                    {/* About Company Section */}
                    <div className="about-main-section">
                        <div className="about-text-container">
                            <div className="about-text-content">
                                <h3 className="about-title">About Us</h3>
                                <p className="about-paragraph">
                                    Founded in 2012, <strong>Shree Balaji Foods</strong> is a growing name in the Indian beverage industry,
                                    dedicated to crafting refreshing and affordable drinks tailored to Indian tastes. With a vision
                                    to quench the thirst of millions across urban and rural India, we blend tradition and
                                    innovation to deliver high-quality beverages that resonate with every Indian palate.
                                </p>
                                <p className="about-paragraph">
                                    Our manufacturing facility, located in the industrial heart of Ajmer, Rajasthan, is equipped
                                    with modern machinery and stringent quality-control processes to ensure that every bottle
                                    that leaves our plant reflects excellence.
                                </p>
                                <p className="about-paragraph">
                                    What sets us apart is our founder's deep understanding of consumer needs. With over a
                                    decade of experience in food and beverage manufacturing, <strong>Mr. Rajeyssh Saddhwani</strong> continues
                                    to lead the company with a hands-on approach, focused on quality, trust, and customer
                                    satisfaction.
                                </p>
                                <p className="about-paragraph">
                                    At <strong>Shree Balaji Foods,</strong> we specialize in creating beverages that blend traditional Indian
                                    flavors with modern processing techniques, ensuring both taste and safety in every bottle.
                                    Our commitment to hygiene, innovation, and affordability has helped us win hearts across the
                                    country from bustling cities to the smallest villages.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision Section */}
                    <div className="mission-vision-section">
                        <div className="mission-card">
                            <h3 className="about-title">Our Mission</h3>
                            <p className="section-text">
                                To deliver safe, affordable, and flavorful beverages that cater to the diverse tastes of Indian
                                consumers — from bustling cities to remote villages.
                            </p>
                        </div>
                        <div className="vision-card">
                            <h3 className="about-title">Our Vision</h3>
                            <p className="section-text">
                                To become a household name across India by offering a range of beverages that combine
                                traditional flavors with modern standards of quality and hygiene.
                            </p>
                        </div>
                    </div>

                    {/* Target Audience Section */}
                    <div className="target-audience-section">
                        <h3 className="about-title">Target Audience</h3>
                        <p className="section-text">
                            We proudly serve both rural and urban markets across India, offering products that are not
                            only refreshing and tasty but also accessible and economical. From street-side vendors to
                            urban retailers, Shree Balaji Foods is building a wide and loyal consumer base.
                        </p>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="why-choose-us-section">
                        <h3 className="about-title">Why Choose Us</h3>
                        <div className="features-grid">
                            {[
                                {
                                    title: "Affordable for Every Indian",
                                    text: "From small villages to big cities, our pricing is designed to fit every pocket without compromising on quality.",
                                },
                                {
                                    title: "Strong Rural Distribution",
                                    text: "Unlike many brands, we focus equally on rural markets — ensuring our drinks are available in even the most remote areas.",
                                },
                                {
                                    title: "Customized for Indian Tastes",
                                    text: "We understand what people in India like to drink. Our flavours are created by Indians, for Indians - refreshing, energizing and delicious.",
                                },
                                {
                                    title: "RO Purified Water in Every Drink",
                                    text: "All our beverages are made with RO-treated water, maintaining purity and protecting your health.",
                                },
                                {
                                    title: "Regular Lab Testing & Quality Checks",
                                    text: "Every production batch undergoes lab testing for taste, safety, and shelf-life, so only the best reaches you.",
                                },
                                {
                                    title: "Safe for All Age Groups",
                                    text: "Our beverages are made keeping safety in mind for both kids and adults — no excessive carbonation or harmful preservatives.",
                                },
                                {
                                    title: "FSSAI Certified & GMP Compliant Facility",
                                    text: "Our manufacturing follows strict FSSAI norms and Good Manufacturing Practices (GMP), ensuring every bottle meets national safety standards.",
                                },
                                {
                                    title: "Eco-Conscious Production",
                                    text: "We use recyclable materials and water-saving techniques to reduce environmental impact, including BPA-free and recyclable plastic bottles.",
                                },
                            ].map((feature) => (
                                <div key={feature.title} className="feature-card">
                                    <h4 className="feature-title">{feature.title}</h4>
                                    <p className="feature-text">{feature.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cold Drinks Section */}
                <section className="drinks-section">
                    <div className="about-content-header">
                        <h2 className="about-heading">Refreshments</h2>
                        <p className="about-description">
                            Sip. Chill. Repeat. Explore our range of bold, refreshing drinks crafted to hit the
                            perfect taste every time and keep your vibe on point.
                        </p>
                    </div>

                    <div className="drinks-grid">
                        {[
                            {
                                src: "/marquee-2.webp",
                                alt: "Fresh Orange Juice",
                                title: "Cola & Sweet Lemon",
                                desc: "Thoda cola, thoda lemon, Full desi blast! Fun, swag aur ultimate refreshment.",
                            },
                            {
                                src: "/X-Factor-(2).webp",
                                alt: "Tropical Blend",
                                title: "X Factor",
                                desc: "Kickstart your vibe, full X Factor mode! Energy ka blast, swag ka twist. Sip karo, duniya ko beat karo.",
                            },
                            {
                                src: "/marquee-4.webp",
                                alt: "Citrus Mint",
                                title: "Tangy Orange",
                                desc: "Orange ka tadka, full-on swag! Sip karo, chill karo, vibe banao. Tangy hai boss, masti ka dose.",
                            },
                        ].map((drink) => (
                            <div key={drink.title} className="drink-card">
                                <div className="drink-image-wrapper">
                                    <img src={drink.src} alt={drink.alt} />
                                    <div className="drink-overlay">
                                        <div className="drink-overlay-content">
                                            <h3>{drink.title}</h3>
                                            <p>{drink.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}