import Link from "next/link";
import "./sitemap.css";

const sitemapData = [
  {
    heading: "HOME",
    links: [
      { label: "Home", href: "/" },
      { label: "About US", href: "/about/" },
      { label: "Products", href: "/product/" },
      { label: "Distributor", href: "/distributor/" },
      { label: "Blog", href: "/blog/" },
      { label: "Contact Us", href: "/contact/" },
    ],
  },
  {
    heading: "SHOP",
    links: [
      { label: "Energy Drink", href: "/product/energy-drink/" },
      { label: "Desi Jeera", href: "/product/desi-jeera/" },
      { label: "Clear Lemon", href: "/product/clear-lemon/" },
      { label: "Cola Drink", href: "/product/cola-drink/" },
      { label: "Apple Fiizi", href: "/product/apple-fiizi/" },
      { label: "Sweet Lemon", href: "/product/sweet-lemon/" },
      { label: "Tangy Orange", href: "/product/tangy-orange/" },

    ],
  },
];

export default function SitemapList() {
  return (
    <>
      <div className="sitemap-page">
        <div className="sitemap-hero">
          <div className="sitemap-hero-overlay">
            <h1>SITEMAP</h1>
          </div>
        </div>

        <div className="sitemap-content">
          {sitemapData.map((section) => (
            <div className="sitemap-column" key={section.heading}>
              <h2 className="sitemap-heading">{section.heading}</h2>
              <ul>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}