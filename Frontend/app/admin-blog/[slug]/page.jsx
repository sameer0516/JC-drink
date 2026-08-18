import EditBlogPageClient from "./EditBlogPage";

export async function generateStaticParams() {
  return [{ slug: "placeholder" }];
}

export default async function EditBlogPage() {
  return <EditBlogPageClient />;
}