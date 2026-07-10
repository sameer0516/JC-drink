import { Merriweather } from "next/font/google";
import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata = {
  title: "Buy Affordable Cold Drinks Online – Desi Summer Drinks | JC Drink",
  description: "Shop refreshing desi drinks and affordable cold drinks online at JC Drink. Explore tasty summer beverages in convenient bottles. Order now!",
  other: {
    "p:domain_verify": "510a4669eecf2d1739fa4226018c3f18",
  },
  alternates: {
    canonical: "https://jcdrink.com/",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="p:domain_verify" content="510a4669eecf2d1739fa4226018c3f18" />
        </head>
        <body className={merriweather.className} suppressHydrationWarning>

          {/* GTM Script */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T7SSQFQJ');`,
            }}
          />

          {/* Google Analytics - gtag.js load */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-LWVKCTJ6F5"
            strategy="afterInteractive"
          />

          {/* Google Analytics - config */}
          <Script
            id="gtag-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-LWVKCTJ6F5');
              `,
            }}
          />

          <Navbar />

          {/* GTM noscript */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-T7SSQFQJ"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>

          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}