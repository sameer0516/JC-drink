import { Check } from "lucide-react";
import "./Team.css";

const managers = [
    {
        id: 1,
        name: "Mukul",
        position: "General Manager",
        image: "/Mukul.webp",
        description: "General Manager",
        bgColor: "blue",
    },
    {
        id: 3,
        name: "Manish Sharma",
        position: "Human Resources Manager",
        image: "/Manish-sharma.webp",
        description: "Human Resources Manager",
        bgColor: "green",
    },
];

const salesTeam = [
    {
        id: 5,
        name: "Pankaj Kumar Sharma",
        position: "Sales Head North Zone",
        image: "/Pankaj-sharma.webp",
        description: "Sales Head North Zone",
        bgColor: "pink",
    },
    {
        id: 4,
        name: "Ashraf Khan",
        position: "Sales Head South Zone",
        image: "/Ashraf-khan.webp",
        description: "Sales Head South Zone",
        bgColor: "blue",
    },
    {
        id: 6,
        name: "Naresh Jurani",
        position: "Sales Head Centre Zone",
        image: "/Naresh-Jurani.webp",
        description: "Sales Head Centre Zone",
        bgColor: "green",
    },
];

const ceoPoints = [
    "Strategic planning and innovation have continually strengthened the brand.",
    "The team is inspired by his work ethic, perseverance, and passion.",
    "Customer satisfaction and product excellence remain at the heart of every decision.",
    "The company has grown to serve diverse markets while maintaining consistent quality.",
];

export default function Team() {
    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="team-container">
                    <div className="main-content">

                        {/* Meet Our Team Section */}
                        <div className="section-header">
                            <h1 className="Team-heading">Our Team</h1>
                            <p className="Team-section-description">
                                Meet The Minds Behind Our Innovation And Success.
                            </p>
                        </div>

                        {/* CEO Section */}
                        <div data-aos="fade-zoom-in" className="ceo-section">
                            <div className="ceo-image-container">
                                <img
                                    src="/Screenshot-2025.png"
                                    alt="Rajeyssh Saddhwani - CEO & Founder"
                                    className="ceo-image"
                                />
                            </div>
                            <div className="ceo-content">
                                <div className="ceo-position">CEO & Founder</div>
                                <h2 className="ceo-name">Shree Balaji Foods</h2>
                                <p className="ceo-description">
                                    Since establishing the company in 2012, Mr. Rajeyssh Saddhwani, our CEO & Founder,
                                    has demonstrated unwavering dedication and vision in building a brand that stands for
                                    quality, innovation, and excellence. His relentless commitment to growth, attention to
                                    detail, and entrepreneurial spirit have been the driving forces behind the company's
                                    expansion across urban and rural markets in PAN India.
                                </p>

                                <div className="experience-section">
                                    <h3>Mr. Rajeyssh Saddhwani</h3>
                                    <div className="experience-section-subtitle">Under his leadership:</div>
                                    <div className="experience-points">
                                        {ceoPoints.map((point, index) => (
                                            <div key={index} className="experience-point">
                                                <div className="check-icon">
                                                    <Check size={14} />
                                                </div>
                                                <span className="experience-text">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Board of Directors Section */}
                        <div className="board-section">
                            <div className="board-header">
                                <h2 className="board-title">Board of Directors</h2>
                                <p className="board-description">
                                    Experienced Minds, Strategic Decisions, Strong Leadership.
                                </p>
                            </div>

                            {/* Managers Section */}
                            <div className="department-section">
                                <h3 className="department-heading">Managers Team</h3>
                                <div className="managers-grid">
                                    {managers.map((member) => (
                                        <div key={member.id} data-aos="fade-zoom-in" className="team-card">
                                            <div className={`team-image-container ${member.bgColor}`}>
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="team-image"
                                                />
                                            </div>
                                            <div className="team-info">
                                                <h3 className="team-name">{member.name}</h3>
                                                <p className="team-description">{member.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sales Team Section */}
                            <div className="department-section">
                                <h3 className="department-heading">Sales Team</h3>
                                <div className="team-grid">
                                    {salesTeam.map((member) => (
                                        <div key={member.id} data-aos="fade-zoom-in" className="team-card">
                                            <div className={`team-image-container ${member.bgColor}`}>
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="team-image"
                                                />
                                            </div>
                                            <div className="team-info">
                                                <h3 className="team-name">{member.name}</h3>
                                                <p className="team-description">{member.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}