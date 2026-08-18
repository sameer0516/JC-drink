import "./BestSelling.css";

const products = [
    {
        id: 1,
        name: "Energy Drink",
        img: "/Distributor-7.png",
        link: "/product/energy-drink/"
    },
    {
        id: 2,
        name: "Tangy Orange",
        img: "/Distributor-6.png",
        link: "/product/tangy-orange/"
    },
    {
        id: 3,
        name: "Desi Jeera",
        img: "/Distributor-1.png",
        link: "/product/desi-jeera/"
    },
    {
        id: 4,
        name: "Apple Fiizi",
        img: "/Distributor-2.png",
        link: "/product/apple-fiizi/"
    },
    {
        id: 5,
        name: "Sweet Lemon",
        img: "/Distributor-3.png",
        link: "/product/sweet-lemon/"
    },
    {
        id: 6,
        name: " Cola Drink",
        img: "/Distributor-4.png",
        link: "/product/cola-drink/"
    },
    {
        id: 7,
        name: "Clear Lemon",
        img: "/Distributor-5.png",
        link: "/product/clear-lemon/"
    },
];

export default function BestSelling() {

    const loopProducts = [...products, ...products];

    return (
        <>
            <section className="bestselling-section">
                {/* Section Heading */}
                <div className="bestselling-header">
                    <h2>best-selling products. </h2>
                </div>

                <div className="bestselling-slider-viewport">
                    <div className="bestselling-track">
                        {loopProducts.map((product, idx) => (
                            <div className="product-card" key={`${product.id}-${idx}`}>
                                <div className="product-img-wrapper">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="product-img"
                                    />
                                </div>

                                {/* Info */}
                                <div className="product-info">
                                    <p className="product-name">
                                        {product.name}
                                    </p>

                                    <a href={product.link}>
                                        <button className="btn-view-more">
                                            View More
                                        </button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* View All CTA */}
                <div className="bestselling-cta">
                    <a href="/product">
                        <button className="btn-view-all">
                            View all products
                        </button>
                    </a>
                </div>
            </section>
        </>
    );
}