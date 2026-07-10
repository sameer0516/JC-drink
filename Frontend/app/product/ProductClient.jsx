"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./product.module.css";
import accordionStyles from "./Accordion.module.css";

const API_BASE_URL = "https://api.jcdrink.com";

function getPriceRange(product) {
  if (!product.priceVariations?.length)
    return `₹${Number(product.price || 0).toFixed(2)}`;
  const prices = product.priceVariations.map((v) => Number(v.price));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max
    ? `₹${min.toFixed(2)}`
    : `₹${min.toFixed(2)} - ₹${max.toFixed(2)}`;
}

function getImageUrl(imagePath) {
  if (!imagePath) return "https://via.placeholder.com/300x300?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE_URL}/${imagePath.replace(/\\/g, "/").replace(/^\/+/, "")}`;
}

const faqItems = [
  {
    question: "JC – About Our Soft Drinks",
    answer: (
      <>
        <h2>Soft Drinks India – Refreshing Beverages for Every Lifestyle</h2>
        <p>
          Welcome to JC, your trusted destination for premium{" "}
          <strong>soft drinks in India</strong>. We offer a wide variety of
          refreshing beverages crafted to suit modern tastes while
          celebrating authentic Indian flavors. Whether you're looking for
          fizzy sodas, flavorful desi drinks, or convenient ready-to-drink
          options, JC delivers the perfect combination of taste, quality,
          and affordability.
        </p>
        <p>
          From traditional Indian-inspired flavors to modern refreshing
          blends, our drinks are designed to satisfy every palate. We
          understand that today's consumers seek both taste and
          convenience, which is why our beverages are created to be easily
          accessible, enjoyable, and suitable for every occasion.
        </p>
        <p>
          With changing lifestyles and increasing demand for on-the-go
          refreshment, soft drinks have become an essential part of daily
          life across India. From quick breaks during work to social
          gatherings and celebrations, beverages play a key role in
          enhancing everyday moments.
        </p>
        <p>
          At JC, we go beyond just offering <strong>drinks</strong>—we focus
          on delivering a refreshing experience. Our commitment to quality,
          consistency, and innovation ensures that every sip is enjoyable,
          whether you're relaxing at home, hosting guests, or running a
          business.
        </p>
        <p>
          Choose JC to experience soft drinks that truly reflect the taste,
          energy, and diversity of India.
        </p>

        <h2>Explore a Wide Range of Soft Drinks in India</h2>
        <p>
          At JC, we provide a diverse and carefully curated selection of
          beverages designed to satisfy every taste and preference. As a
          growing name in the <strong>Indian soft drink</strong> market, we
          focus on delivering variety, flavor, and quality in every bottle.
        </p>
        <p>
          <strong>Our product range includes:</strong>
        </p>
        <ul>
          <li>
            <strong>Carbonated Soft Drinks</strong> – Crisp, fizzy, and
            instantly refreshing, perfect for those who enjoy classic soda
            experiences
          </li>
          <li>
            <strong>Desi Flavored Drinks</strong> – Traditional favorites
            like jeera soda, masala soda, and Indian-inspired blends that
            capture authentic local taste
          </li>
          <li>
            <strong>Fruit-Based Beverages</strong> – Light, naturally
            refreshing drinks with fruity flavors that appeal to all age
            groups
          </li>
          <li>
            <strong>Sparkling Drinks</strong> – A smooth balance of fizz and
            flavor, ideal for a modern and refreshing drinking experience
          </li>
        </ul>
        <p>
          Each beverage is crafted with attention to taste, consistency,
          and quality to ensure a satisfying experience every time. Whether
          you prefer bold and spicy desi flavors or light and refreshing
          fruit drinks, JC has something for everyone.
        </p>
        <p>
          Our wide range makes our products suitable for{" "}
          <strong>
            daily refreshment, family gatherings, parties, restaurants, and
            retail businesses
          </strong>
          . With a strong focus on innovation and customer preferences, we
          continue to expand our offerings to meet the evolving demands of
          the Indian beverage market.
        </p>
        <p>
          Enjoy drinks that are not only refreshing but also reflect the
          rich diversity of flavors found across India.
        </p>

        <h2>Energy Drink India – Refreshment That Keeps You Going</h2>
        <p>
          Looking for reliable options in the{" "}
          <strong>energy drink India</strong> category? JC offers
          refreshing beverages designed to match your active lifestyle and
          keep you feeling energized throughout the day. Our drinks are
          crafted to provide instant refreshment while delivering a
          satisfying taste that keeps you coming back for more.
        </p>
        <p>
          In today's fast-paced world, consumers need beverages that can
          keep up with their daily routines. Whether you're managing a busy
          work schedule, commuting, or simply taking a break, JC provides
          the perfect solution for quick and enjoyable refreshment.
        </p>
        <p>
          <strong>Our beverages are ideal for:</strong>
        </p>
        <ul>
          <li>
            <strong>Busy work schedules</strong> – Stay refreshed and
            focused during long hours
          </li>
          <li>
            <strong>Travel and outdoor activities</strong> – Easy-to-carry
            drinks for on-the-go hydration
          </li>
          <li>
            <strong>Social gatherings and events</strong> – A refreshing
            addition to any occasion
          </li>
          <li>
            <strong>Everyday energy and refreshment</strong> – Perfect for
            daily consumption
          </li>
        </ul>
        <p>
          We focus on creating drinks that balance taste, quality, and
          refreshment, making them suitable for a wide range of consumers.
          With a growing{" "}
          <strong>demand for energy drink options in India</strong>, JC
          aims to offer beverages that not only quench thirst but also
          complement modern lifestyles.
        </p>
        <p>
          Experience a refreshing boost anytime, anywhere with JC—your
          go-to choice for flavorful and energizing beverages in India.
        </p>

        <h2>Buy Soft Drinks Online – Fast, Easy &amp; Reliable</h2>
        <p>
          Now you can easily <strong>buy soft drinks online</strong> from
          JC with a smooth, secure, and hassle-free experience. Our
          platform is designed to meet the needs of modern consumers who
          value convenience, speed, and reliability. Whether you're
          restocking your favorite beverages or placing a bulk order for
          business purposes, we make the entire process simple and
          efficient.
        </p>
        <p>
          With just a few clicks, you can explore our wide range of{" "}
          <strong>soft drinks</strong>, compare options, and place your
          order anytime, from anywhere. Our streamlined system ensures that
          your shopping experience is quick, user-friendly, and
          stress-free.
        </p>
        <p>
          <strong>Benefits of Ordering Online:</strong>
        </p>
        <ul>
          <li>
            <strong>Easy product selection and checkout</strong> – Browse a
            variety of drinks and place orders in minutes
          </li>
          <li>
            <strong>Hygienic and secure packaging</strong> – Ensuring
            freshness and safety in every delivery
          </li>
          <li>
            <strong>Timely and dependable delivery</strong> – Get your
            beverages delivered right when you need them
          </li>
          <li>
            <strong>Wide range of drink options</strong> – Choose from desi
            drinks, carbonated beverages, and more
          </li>
        </ul>
        <p>
          Whether you're ordering for your{" "}
          <strong>home, office, events, or retail business</strong>, JC
          ensures that every bottle reaches you in perfect
          condition—fresh, flavorful, and ready to enjoy.
        </p>
        <p>
          Experience the convenience of online beverage shopping and enjoy
          your favorite soft drinks delivered straight to your doorstep
          with ease.
        </p>

        <h2>Designed for Modern Indian Consumers</h2>
        <p>
          Today's consumers expect more than just refreshment—they look for{" "}
          <strong>variety, convenience, quality, and value</strong> in
          every purchase. At JC, we understand these evolving expectations
          and design our products to meet the needs of modern lifestyles
          while staying true to authentic Indian taste preferences.
        </p>
        <p>
          As the demand for <strong>soft drinks in India</strong> continues
          to grow, consumers are increasingly choosing beverages that offer
          both flavor and convenience. Whether it's a quick refreshment
          during a busy day or a drink to complement social moments, JC
          ensures the perfect balance of taste and accessibility.
        </p>
        <p>
          <strong>We focus on:</strong>
        </p>
        <ul>
          <li>
            <strong>Unique and bold flavors</strong> – Inspired by Indian
            tastes and regional preferences
          </li>
          <li>
            <strong>Affordable pricing</strong> – Making quality beverages
            accessible to a wide audience
          </li>
          <li>
            <strong>Convenient packaging options</strong> – Easy to carry,
            store, and use anytime, anywhere
          </li>
          <li>
            <strong>Consistent product quality</strong> – Ensuring the same
            great taste in every bottle
          </li>
        </ul>
        <p>
          Our approach is centered on delivering beverages that seamlessly
          fit into everyday life—whether at home, at work, or on the go. We
          continuously innovate to keep up with changing consumer trends
          while maintaining the authenticity that defines our brand.
        </p>
        <p>
          <strong>Our goal is simple:</strong> to make premium-quality soft
          drinks accessible, enjoyable, and widely available across India
          for every consumer and every occasion.
        </p>

        <h2>Perfect for Every Occasion</h2>
        <p>
          JC beverages are crafted to fit seamlessly into every moment of
          your day, making them the perfect choice for a wide range of
          occasions. Whether you're relaxing at home or hosting a large
          gathering, our refreshing drinks add flavor and enjoyment to
          every experience.
        </p>
        <p>
          <strong>Our versatile range of soft drinks in India is ideal for:</strong>
        </p>
        <ul>
          <li>
            <strong>Daily refreshment</strong> – Enjoy a quick, refreshing
            break anytime during your day
          </li>
          <li>
            <strong>Family gatherings</strong> – Share great taste and
            memorable moments with loved ones
          </li>
          <li>
            <strong>Parties and celebrations</strong> – Add energy and
            excitement to special occasions
          </li>
          <li>
            <strong>Restaurants and cafes</strong> – A perfect addition to
            menus, enhancing customer experience
          </li>
          <li>
            <strong>Retail stores and distribution</strong> – Reliable and
            popular products for consistent sales
          </li>
        </ul>
        <p>
          Designed to suit different tastes and settings, JC beverages
          offer the perfect balance of refreshment and flavor. From casual
          moments to festive celebrations, our drinks are made to
          complement every occasion.
        </p>
        <p>
          No matter where you are or what you're celebrating, JC ensures
          that every sip delivers freshness, satisfaction, and a taste
          you'll enjoy again and again.
        </p>

        <h2>Our Commitment to Quality &amp; Safety</h2>
        <p>
          At JC, quality is at the core of everything we do. Every bottle
          is produced using carefully selected ingredients and follows
          strict hygiene and safety standards. From sourcing raw materials
          to final packaging, we ensure that each step meets high-quality
          benchmarks.
        </p>
        <p>
          <strong>
            We continuously monitor our processes to maintain the
            following:
          </strong>
        </p>
        <ul>
          <li>Consistent taste across batches</li>
          <li>Safe and hygienic production practices</li>
          <li>Freshness in every bottle</li>
          <li>Reliable packaging standards</li>
        </ul>
        <p>
          Our commitment ensures that every drink you consume is safe,
          refreshing, and satisfying.
        </p>

        <h2>Packaging &amp; Bottle Options</h2>
        <p>
          We understand that different customers have different needs.
          That's why JC offers flexible <strong>cold drink bottle</strong>{" "}
          options suitable for both individual consumption and bulk supply.
        </p>
        <p>
          <strong>Available Packaging Options:</strong>
        </p>
        <ul>
          <li>
            <strong>Small Bottles</strong> – Ideal for single servings and
            quick refreshment
          </li>
          <li>
            <strong>Medium Bottles</strong> – Perfect for daily use at home
            or office
          </li>
          <li>
            <strong>Bulk Packaging</strong> – Best suited for retailers,
            wholesalers, and events
          </li>
        </ul>
        <p>
          Our packaging is designed for convenience, durability, and easy
          transportation, ensuring your beverages remain fresh and ready to
          enjoy.
        </p>

        <h2>Business &amp; Distribution Opportunities</h2>
        <p>
          JC is not just a beverage brand—it's a growing business
          opportunity. We welcome partnerships with distributors,
          wholesalers, and retailers across India who want to expand in the
          beverage industry.
        </p>
        <p>
          <strong>Partner With Us:</strong>
        </p>
        <ul>
          <li>Strong demand for soft drinks in India</li>
          <li>Attractive margins for partners</li>
          <li>Reliable supply and logistics support</li>
          <li>Growing brand recognition</li>
        </ul>
        <p>
          Whether you're starting a new venture or expanding an existing
          business, JC provides the right platform for growth.
        </p>

        <h2>Growing Demand for Soft Drinks in India</h2>
        <p>
          The demand for <strong>soft drinks in India</strong> is steadily
          increasing due to changing lifestyles, urbanization, and rising
          consumer preferences for ready-to-drink beverages.
        </p>
        <p>
          <strong>Consumers today are:</strong>
        </p>
        <ul>
          <li>Looking for convenient beverage options</li>
          <li>Exploring new and unique flavors</li>
          <li>Choosing affordable yet high-quality drinks</li>
          <li>Preferring locally inspired desi beverages</li>
        </ul>
        <p>
          JC is well-positioned to meet this demand with a diverse and
          evolving product range.
        </p>

        <h2>Sustainability &amp; Responsible Practices</h2>
        <p>
          We believe in growing responsibly while minimizing our
          environmental impact. JC is committed to adopting better
          practices in packaging, production, and distribution.
        </p>
        <p>
          <strong>Our focus includes:</strong>
        </p>
        <ul>
          <li>Efficient use of resources</li>
          <li>Reducing waste in production</li>
          <li>Improving packaging sustainability over time</li>
        </ul>
        <p>
          We aim to contribute to a better future while continuing to
          deliver great-tasting beverages.
        </p>

        <h2>Customer Satisfaction &amp; Trust</h2>
        <p>
          Customer satisfaction is our top priority. We strive to build
          long-term relationships by consistently delivering quality
          products and reliable service.
        </p>
        <p>
          <strong>What you can expect:</strong>
        </p>
        <ul>
          <li>Consistent product experience</li>
          <li>Reliable delivery support</li>
          <li>Responsive customer service</li>
          <li>Transparent business practices</li>
        </ul>
        <p>
          Thousands of satisfied customers trust JC for their daily
          refreshment needs.
        </p>

        <h2>Why Choose JC?</h2>
        <p>
          JC stands out as a trusted name in the{" "}
          <strong>Indian soft drink</strong> market by combining authentic
          flavors, consistent quality, and customer-focused value. We are
          committed to delivering beverages that not only refresh but also
          create a memorable drinking experience for every customer.
        </p>
        <h3>1. Wide Variety of Soft Drinks in India</h3>
        <p>
          We offer an extensive range of beverages, from classic carbonated
          drinks to traditional desi flavors and fruit-based options,
          ensuring there's something for every taste and preference.
        </p>
        <h3>2. Authentic Desi Flavors with Modern Appeal</h3>
        <p>
          Our drinks are inspired by India's rich beverage culture,
          blending traditional flavors like jeera and masala with modern
          formulations to suit today's consumers.
        </p>
        <h3>3. Affordable and Value-Driven Pricing</h3>
        <p>
          We believe great taste should be accessible to everyone. Our
          pricing strategy ensures you get high-quality drinks at
          competitive rates, making us ideal for both individuals and
          businesses.
        </p>
        <h3>4. Easy Online Ordering Experience</h3>
        <p>
          With a user-friendly platform, you can easily browse and{" "}
          <strong>buy soft drinks online</strong> with quick checkout and
          reliable delivery, saving time and effort.
        </p>
        <h3>5. Suitable for Both Personal and Business Needs</h3>
        <p>
          Whether you're purchasing for home use, events, restaurants, or
          retail distribution, JC offers flexible solutions to meet all
          requirements.
        </p>

        <h2>Experience the Best Soft Drinks in India</h2>
        <p>
          At JC, we believe every sip should be refreshing, enjoyable, and
          full of flavor. With our growing range of beverages, including{" "}
          <strong>
            desi drinks, cold drinks, and energy drink options in India
          </strong>
          , we are committed to becoming your preferred choice for
          refreshment.
        </p>
        <p>
          Explore our collection today and{" "}
          <a href="/product">buy soft drinks online</a> to enjoy quality
          beverages delivered straight to your doorstep.
        </p>
      </>
    ),
  },
  {
    question: "Frequently Asked Questions",
    answer: (
      <>
        <h3>1. How can I order soft drinks from JC?</h3>
        <p>
          You can place your order by filling out the inquiry form on our
          website. Our team will contact you to process your request.
        </p>

        <h3>2. Can I buy soft drinks online directly from the website?</h3>
        <p>
          Currently, we do not offer direct checkout. Customers can submit
          an inquiry, and our team will assist with the order.
        </p>

        <h3>3. What happens after I submit the inquiry form?</h3>
        <p>
          Once you submit the form, our team will get in touch with you to
          discuss product details, pricing, and delivery.
        </p>

        <h3>4. Do you accept bulk orders?</h3>
        <p>
          Yes, we specialize in bulk orders for retailers, wholesalers,
          events, and businesses.
        </p>

        <h3>5. What types of soft drinks do you offer?</h3>
        <p>
          We offer carbonated drinks; desi-flavored beverages like jeera
          soda and masala soda; fruit-based drinks; and more.
        </p>

        <h3>6. Do you provide energy drink options in India?</h3>
        <p>
          Yes, we offer refreshing beverage options suitable for consumers
          looking for energy drink alternatives in India.
        </p>

        <h3>7. Are your drinks suitable for daily consumption?</h3>
        <p>
          Yes, our beverages are designed for everyday refreshment with
          consistent quality and taste.
        </p>

        <h3>8. What packaging options are available?</h3>
        <p>
          We provide multiple bottle sizes, including small, medium, and
          bulk packaging options.
        </p>

        <h3>9. Do you supply to restaurants and cafes?</h3>
        <p>
          Yes, our products are ideal for restaurants, cafes, and food
          service businesses.
        </p>

        <h3>10. Can I order for events or parties?</h3>
        <p>
          Yes, you can place bulk inquiries for parties, events, and large
          gatherings.
        </p>

        <h3>11. Are your drinks affordable?</h3>
        <p>
          Yes, we offer value-driven pricing suitable for both individual
          buyers and businesses.
        </p>

        <h3>12. Are your beverages hygienically produced?</h3>
        <p>
          Yes, all our drinks are manufactured and packaged following
          strict quality and hygiene standards.
        </p>

        <h3>13. Do you offer distribution opportunities?</h3>
        <p>
          Yes, we welcome distributors, wholesalers, and retailers to
          partner with us.
        </p>

        <h3>14. How long does it take to get a response after an inquiry?</h3>
        <p>
          Our team typically responds within a short time to assist you
          with your order requirements.
        </p>

        <h3>15. Do you deliver across India?</h3>
        <p>
          We are expanding our network and aim to serve customers across
          multiple regions in India.
        </p>

        <h3>16. What flavors are available in your drinks?</h3>
        <p>
          We offer a variety of flavors, including spicy, tangy, fruity,
          and traditional Indian blends.
        </p>

        <h3>17. Can small businesses order from JC?</h3>
        <p>
          Yes, we support small retailers and businesses with flexible
          order quantities.
        </p>

        <h3>18. Is there a minimum order quantity?</h3>
        <p>
          Minimum order quantity may vary depending on the product and
          location. Our team will guide you after the inquiry.
        </p>

        <h3>19. Why should I choose JC?</h3>
        <p>
          JC offers authentic desi flavors, consistent quality, affordable
          pricing, and strong business support.
        </p>

        <h3>20. How do I contact JC for business inquiries?</h3>
        <p>
          You can fill out the inquiry form on our website, and our team
          will get in touch with you shortly.
        </p>
      </>
    ),
  },
];

export default function ProductClient() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/products`);

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];
      setProducts(arr.filter((p) => p?.slug));
    } catch (err) {
      console.error("fetchProducts error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* ── Products Section ── */}
      <div className={styles.productContainer}>
        <div className={styles.productContainerContent}>
          <h1 className={styles.aboutHeading}>Our Products</h1>
          <div className={styles.productContainerContentDes}>
            Browse our collection of amazing products.
          </div>
        </div>

        <div className={styles.productsContainer}>
          {/* ── Loading ── */}
          {loading && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  margin: "0 auto 16px",
                  border: "4px solid #ffd93d33",
                  borderTop: "4px solid #ffd93d",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <p style={{ color: "#888" }}>Loading products...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* ── Error ── */}
          {!loading && error && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ color: "#e53e3e", marginBottom: 16 }}>
                ⚠️ Failed to load products: {error}
              </p>
              <button
                onClick={fetchProducts}
                style={{
                  padding: "10px 24px",
                  background: "#ffd93d",
                  color: "#000",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* ── Empty ── */}
          {!loading && !error && products.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ color: "#888" }}>No products found.</p>
            </div>
          )}

          {/* ── Products Grid ── */}
          {!loading && !error && products.length > 0 && (
            <div className={styles.productsGrid}>
              {products.map((product) => {
                const productId = product._id || product.id || product.slug;
                return (
                  <Link
                    key={productId}
                    href={`/product/${product.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className={styles.productCard}>
                      <div className={styles.productImageContainer}>
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.title || "Product"}
                          className={styles.productImage}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x300?text=Image+Error";
                          }}
                        />
                      </div>
                      <div className={styles.productInfo}>
                        <div className={styles.productContainerCategory}>
                          {product.category || "Uncategorized"}
                        </div>
                        <h3 className={styles.productContainerTitle}>
                          {product.title || "Untitled Product"}
                        </h3>
                        <div className={styles.productBottom}>
                          <span className={styles.price}>
                            {getPriceRange(product)}
                          </span>
                          {product.priceVariations?.length > 0 && (
                            <div className={styles.sizesAvailable}>
                              {product.priceVariations.length} size
                              {product.priceVariations.length !== 1
                                ? "s"
                                : ""}{" "}
                              available
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── FAQ Accordion Section ── */}
      <div className={accordionStyles.wrapper}>
        {faqItems.map((item, index) => (
          <div key={index} className={accordionStyles.item}>
            <button
              className={accordionStyles.header}
              onClick={() => toggle(index)}
            >
              <span>{item.question}</span>
              <span className={accordionStyles.arrow}>
                {openIndex === index ? "▲" : "▼"}
              </span>
            </button>
            {openIndex === index && (
              <div className={accordionStyles.body}>{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}