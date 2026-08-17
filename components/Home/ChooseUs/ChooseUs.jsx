import "./ChooseUs.css";

const features = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 6l5 12M44 6l-5 12"
          stroke="#2e7d32"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="34" r="18" fill="#eaf6ec" stroke="#2e7d32" strokeWidth="2.5" />
        <path
          d="M25 34l5 5 9-10"
          stroke="#2e7d32"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 49l-4 9 8-3 4 8 5-14M42 49l4 9-8-3-4 8-5-14"
          stroke="#2e7d32"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="#eaf6ec"
        />
      </svg>
    ),
    title: "Global Quality Standards",
    description:
      "At JC, we follow international quality and safety standards to ensure premium production, strict hygiene practices, and consistent product excellence across every batch.",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M26 8h8M28 8v10M36 8v6"
          stroke="#c98a0e"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M28 18h6l10 22a3 3 0 01-2.7 4.3H20.7A3 3 0 0118 40l10-22z"
          fill="#fef6e3"
          stroke="#c98a0e"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M22 36c3 2 6 2 10-1 4-3 7-3 10-1"
          stroke="#c98a0e"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="46" cy="48" r="8" fill="#fef6e3" stroke="#c98a0e" strokeWidth="2.3" />
        <path
          d="M46 44v4l3 2"
          stroke="#c98a0e"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Expert R&D Team",
    description:
      "Our skilled R&D professionals create innovative beverage formulations, develop unique flavors, and provide customized solutions aligned with changing market trends and consumer preferences.",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 54V30l12-8v8l12-8v8l12-8v22"
          fill="#e7f0fb"
          stroke="#1565c0"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <rect x="8" y="30" width="36" height="24" fill="#e7f0fb" stroke="#1565c0" strokeWidth="2.4" />
        <path d="M44 38h8v16h-8z" fill="#e7f0fb" stroke="#1565c0" strokeWidth="2.2" />
        <circle cx="48" cy="20" r="3" fill="#1565c0" />
        <path d="M48 23v7" stroke="#1565c0" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="14" y="38" width="6" height="8" fill="#1565c0" opacity="0.65" />
        <rect x="24" y="38" width="6" height="8" fill="#1565c0" opacity="0.65" />
        <rect x="34" y="38" width="6" height="8" fill="#1565c0" opacity="0.65" />
      </svg>
    ),
    title: "Advanced Manufacturing",
    description:
      "With modern facilities and advanced technology, JC ensures precise manufacturing processes supported by strict quality control at every stage.",
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 56V22"
          stroke="#7b1fa2"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M32 14c0 5-4 8-8 8 0-5 4-8 8-8zM32 14c0 5 4 8 8 8 0-5-4-8-8-8z"
          fill="#efd9f6"
          stroke="#7b1fa2"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M32 22c0 5-4.5 9-9.5 9C22.5 26 27 22 32 22zM32 22c0 5 4.5 9 9.5 9C41.5 26 37 22 32 22z"
          fill="#efd9f6"
          stroke="#7b1fa2"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M32 30c0 5-4.5 9-9.5 9C22.5 34 27 30 32 30zM32 30c0 5 4.5 9 9.5 9C41.5 34 37 30 32 30z"
          fill="#efd9f6"
          stroke="#7b1fa2"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Premium Raw Materials",
    description:
      "We use carefully selected, high-quality ingredients to maintain superior taste, freshness, and consistent product quality.",
  },
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25 14a5 5 0 019.8-1.5A5 5 0 0142 18v4h-4a5 5 0 01-1.5 9.8A5 5 0 0132 40h-4v-4a5 5 0 01-9.8-1.5A5 5 0 0114 26v-4h4a5 5 0 016.5-8.5z"
          fill="#fce9ea"
          stroke="#c62828"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M22 40h20v10a4 4 0 01-4 4H26a4 4 0 01-4-4V40z"
          fill="#fce9ea"
          stroke="#c62828"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M27 46h10M27 50h10" stroke="#c62828" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Complete OEM/ODM Solutions",
    description:
      "From product development and packaging to final production, JC offers end-to-end OEM/ODM beverage solutions designed to meet your brand’s unique needs.",
  },
  {
    id: 6,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 30V16h6v14M24 30V20h6v10M34 30V22h6v8"
          stroke="#00838f"
          strokeWidth="2.3"
          strokeLinejoin="round"
        />
        <path
          d="M8 30h48l-6 16H14L8 30z"
          fill="#e3f5f4"
          stroke="#00838f"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M12 52a20 20 0 0040 0"
          stroke="#00838f"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="52" r="2.6" fill="#00838f" />
        <circle cx="44" cy="52" r="2.6" fill="#00838f" />
      </svg>
    ),
    title: "Global Export Capabilities",
    description:
      "With strong export expertise, JC ensures smooth logistics, regulatory compliance, and reliable delivery to markets worldwide.",
  },
];



export default function ChooseUs() {
  return (
    <>
      <section className="choose-us-section" aria-labelledby="choose-us-heading">
        <div className="choose-us-container">
          {/* Header */}
          <div className="choose-us-header">
            <h2 id="choose-us-heading" className="choose-us-title">
              Why Choose <span className="choose-us-brand">JC?</span>
            </h2>
            <p className="choose-us-subtitle">
              Your trusted partner for high-quality beverage manufacturing, delivering excellence from concept to consumer.
            </p>
            <div className="choose-us-divider" aria-hidden="true"></div>
          </div>

          {/* Grid */}
          <div className="choose-us-grid" role="list">
            {features.map((feature) => (
              <article
                className="choose-us-card"
                key={feature.id}
                role="listitem"
              >
                <div className="choose-us-icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="choose-us-card-title">{feature.title}</h3>
                <p className="choose-us-card-desc">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}