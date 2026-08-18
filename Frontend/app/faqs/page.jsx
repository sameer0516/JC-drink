import FaqsClient from "./FaqsClient";

const PAGE_URL = "https://jcdrink.com/faqs/";
const TITLE = "Frequently Asked Questions | JC Drink";
const DESCRIPTION =
    "Find answers to common questions about JC Drink's soft drinks, energy drinks, bulk orders, distribution, and more.";

export const metadata = {
    title: TITLE,
    description: DESCRIPTION,

    alternates: {
        canonical: PAGE_URL,
    },

    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: PAGE_URL,
        siteName: "JC",
        type: "website",
        locale: "en_IN",
    },

    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        site: "@Jcdrink0",
        creator: "@Jcdrink0",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

export default function Page() {
    return <FaqsClient />;
}