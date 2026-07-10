import Header from "./Header/Header";
import Main from "./Main/Main";
import ContactSection from "./ContactSection/ContactSection";
import Energizing from "./Energizing/Energizing";
import OurExpertise from "./OurExpertise/OurExpertise";
import NFTMarketplace from "./NFTMarketplace/NFTMarketplace";
import Nutrition from "./Nutrition/Nutrition";
import FAQS from "./FAQS/page"

export default function Home() {
    return (
        <>
            <Header />
            <NFTMarketplace />
            <OurExpertise />
            <Energizing />
            <Main />
            <ContactSection />
            <Nutrition />
            <FAQS/>
        </>
    );
}