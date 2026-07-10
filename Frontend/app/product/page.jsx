import ProductClient from "./ProductClient";

export const metadata = {
  title: "Buy Soft Drinks & Energy Drinks Online in India | JC Drink",
  description:
    "Buy soft drinks online in India from JC Drink. Explore refreshing beverages and energy drinks at affordable prices.",
  alternates: {
    canonical: "https://jcdrink.com/product",
  },
};

export default function Page() {
  return <ProductClient />;
}