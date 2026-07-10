import DistributorClient from "./DistributorClient";
import "./distributor.css";

export const metadata = {
  title: "Become a JC Cold Drink Distributor – Partner with Us in India",
  description:
    "Partner with JC Drink as a distributor in India. Expand your business with our refreshing beverages. Apply online today and start your journey!",

  alternates: {
    canonical: "https://jcdrink.com/distributor",
  },
};

export default function Page() {
  return <DistributorClient />;
}