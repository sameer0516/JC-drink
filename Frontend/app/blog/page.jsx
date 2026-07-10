// NO "use client" here — server component
import BlogListPage from "./BlogListPage";

export const metadata = {
  title: " Blog | JC Drink",
  description:
    "Explore our latest blogs on cold drinks, fruit drinks, desi beverages, and refreshing summer drinks in India.",
};

export default function Page() {
  return <BlogListPage />;
}