"use client";
import React from "react";
import "./aboutUs.css";

const AboutUs = () => {
    return (
        <>
            <section className="au-about-section">
                <h2 className="au-about-title">About JC</h2>

                <div className="au-about-container">
                    <div className="au-about-image-wrapper">
                        <img
                            src="/New-About-us.png"
                            alt="About Us"
                            className="au-about-image"
                        />
                    </div>

                    <div className="au-about-content">
                        <p>
                            At JC, we are committed to crafting refreshing beverages that deliver the perfect balance of taste, quality, and affordability. Built on the strong foundation of Shree Balaji Foods, established in 2012, JC has steadily grown into a trusted and recognized name in the Indian beverage industry.
                        </p>

                        <p>
                            From our advanced manufacturing facility in Ajmer, Rajasthan, we produce a wide range of beverages inspired by traditional Indian flavors while embracing modern production standards. Our processes are driven by strict quality control, hygiene, and consistency, ensuring that every bottle meets the highest standards before it reaches our consumers.
                        </p>

                        <p>
                            What truly defines JC is our deep understanding of Indian taste preferences. By blending innovation with tradition, we create beverages that connect with people across diverse regions — from fast-paced urban lifestyles to the simplicity of rural India.
                        </p>

                        <p>
                            With a strong focus on customer satisfaction, continuous innovation, and reliable quality, JC is dedicated to delivering beverages that not only refresh but also build lasting trust with every sip.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;