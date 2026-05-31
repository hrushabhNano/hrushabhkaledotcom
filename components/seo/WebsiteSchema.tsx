export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://hrushabhkale.com/#website",
    name: "Hrushabh Kale",
    url: "https://hrushabhkale.com",
    description:
      "Tech Lead & Solutions Architect at Nanostuffs Technologies, Pune. " +
      "Writing about AI-first development and technical leadership in India.",
    author: {
      "@id": "https://hrushabhkale.com/#person",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
