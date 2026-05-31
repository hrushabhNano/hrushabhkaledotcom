export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://hrushabhkale.com/#person",
    name: "Hrushabh Kale",
    url: "https://hrushabhkale.com",
    image: "https://hrushabhkale.com/avatar.png",
    jobTitle: "Tech Lead & Solutions Architect",
    description:
      "Full Stack Engineer and Tech Lead at Nanostuffs Technologies in Pune, " +
      "building AI-first enterprise systems including LangGraph AI assistants, " +
      "WhatsApp automation platforms, and multi-country React Native applications.",
    worksFor: {
      "@type": "Organization",
      name: "Nanostuffs Technologies",
      url: "https://nanostuffs.com",
    },
    alumniOf: [
      {
        "@type": "Organization",
        name: "Government College of Engineering, Aurangabad",
      },
      {
        "@type": "Organization",
        name: "Fountain9",
        url: "https://fountain9.com",
      },
    ],
    knowsAbout: [
      "React",
      "React Native",
      "Node.js",
      "Next.js",
      "LangGraph",
      "LLM tooling",
      "Salesforce",
      "Heroku",
      "WhatsApp Business API",
      "PostgreSQL",
      "GCP",
      "Snowflake",
      "Full Stack Development",
      "Solutions Architecture",
      "Technical Leadership",
      "AI Engineering",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    email: "hrushabhkale25@gmail.com",
    sameAs: [
      "https://linkedin.com/in/hrushabh-kale",
      "https://twitter.com/hrushabh__k",
      "https://x.com/hrushabh__k",
      "https://hrushabhkale.com",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
