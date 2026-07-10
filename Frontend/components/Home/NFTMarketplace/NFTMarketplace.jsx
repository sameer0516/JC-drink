"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./NFTMarketplace.css";

export default function NFTMarketplace() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <div className={`nft-marketplace ${isLoaded ? "loaded" : ""}`}>
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="container"
        id="NFTMarketplace"
      >
        {/* Left Content */}
        <div className="Refreshing-content">
          {/* Next.js Image — width/height zaroori hain */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
            <Image
              src="/Refreshing.webp"
              alt="Refreshing JC Drink"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          <div className="Refreshing-text">
            JC Drink isn't just a drink — it's full-on desi swag in every sip!
            From college adda to road trips and gully hangouts — JC Drink brings
            the ultimate refreshment wala vibe!
          </div>

          <div id="Refreshing-prag" className="Refreshing-text">
            Tangy Orange – Full On Masti, Full On Swag!
          </div>

          <div id="Refreshing-prag" className="Refreshing-text">
            Sweet Lemon – Thandak with a Desi Twist!
          </div>

          <div id="Refreshing-prag" className="Refreshing-text">
            Two Flavours. One Desi Revolution.
          </div>

          <div id="Refreshing-prag" className="Refreshing-text">
            Dhamakedaar fizz, chatpata flavour, aur fun ka full blast!
          </div>

          <div id="Refreshing-prag" className="Refreshing-text">
            Ek sip lo, aur mehsoos karo woh classic refreshment wala sukoon!
          </div>
        </div>

        {/* Right Content */}
        <div className="content-right">
          <div className="image-container">
            <Image
              src="/Main-Banner-2.webp"
              alt="JC Drink Banner"
              width={600}
              height={700}
              className="nft-image image-loaded"
              style={{ objectFit: "cover", borderRadius: "16px", width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}