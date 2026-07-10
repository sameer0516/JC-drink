"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Main.css";

const productData = {
  product1: {
    name: "VITAMIN BOOST",
    image: "/Cold-1.webp",
    options: {
      "1 BOTTLE": { price: "10" },
      "3 BOTTLES": { price: "30" },
    },
  },
  product2: {
    name: "ENERGY PLUS",
    image: "/Cold-2.webp",
    options: {
      "1 BOTTLE": { price: "10" },
      "3 BOTTLES": { price: "30" },
    },
  },
  product3: {
    name: "NATURAL CARE",
    image: "/Cold-3.webp",
    options: {
      "1 BOTTLE": { price: "10" },
      "3 BOTTLES": { price: "30" },
    },
  },
};

export default function Main() {
  const [selectedOptions, setSelectedOptions] = useState({
    product1: "1 BOTTLE",
    product2: "1 BOTTLE",
    product3: "1 BOTTLE",
  });

  const handleOptionSelect = (productId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: option,
    }));
  };

  const handleShopClick = (productId) => {
    const product = productData[productId];
    const selected = selectedOptions[productId];
    console.log(
      `Product: ${product.name} - Selected: ${selected} - Price: ₹${product.options[selected].price}`
    );
  };

  const renderProductCard = (productId, product) => (
    <div key={productId} className="vitamin-card">
      {/* Decorative circles */}
      <div className="decorative-elements">
        <div className="decorative-circle decorative-circle-1" />
        <div className="decorative-circle decorative-circle-2" />
        <div className="decorative-circle decorative-circle-3" />
        <div className="decorative-circle decorative-circle-4" />
      </div>

      {/* Product Title */}
      <div className="product-title">{product.name}</div>

      {/* Selection Buttons */}
      <div className="selection-buttons">
        {["1 BOTTLE", "3 BOTTLES"].map((option) => (
          <button
            key={option}
            onClick={() => handleOptionSelect(productId, option)}
            className={`selection-btn ${
              selectedOptions[productId] === option ? "active" : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Price */}
      <div className="price-section">
        <div className="price">
          ₹ {product.options[selectedOptions[productId]].price}
        </div>
      </div>

      {/* Product Image — Next.js Image */}
      <div className="product-images">
        <div className="bottle-container">
          <div className="bottle bottle-main">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={400}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      {/* Shop Button — Next.js Link instead of <a> */}
      <button
        className="shop-button"
        onClick={() => handleShopClick(productId)}
      >
        <div className="shop-button-content">
          <Link href="/Product">
            <span>GO SHOP</span>
          </Link>
          <svg className="arrow-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
    </div>
  );

  return (
    <div className="vitamin-container">
      <div className="vitamin-container-title">Dive Into Our Flavors</div>
      <div className="vitamin-container-des">
        Pick the flavor that matches your vibe.
      </div>

      <div className="cards-grid">
        {Object.entries(productData).map(([productId, product]) =>
          renderProductCard(productId, product)
        )}
      </div>
    </div>
  );
}