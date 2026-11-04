export const site = {
  name: "Revora Solutions",
  legalName: "[[Revora Solutions Pvt. Ltd.]]",
  tagline: "Connecting Talent with Opportunity",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://[[revorasolutions.com]]",
  email: { general: "[[hello@revorasolutions.com]]", careers: "[[careers@revorasolutions.com]]" },
  phone: { display: "+91 83672 51896", tel: "+918367251896" },
  whatsapp: "[[+919876543210]]",            // optional; renders a WhatsApp link in contact + footer if set
  address: { line1: "[[Office line 1]]", line2: "[[Area]]", city: "[[Hyderabad]]", state: "[[Telangana]]", pin: "[[500081]]", country: "India" },
  hours: "Mon–Sat, 9:30 am – 6:30 pm IST",
  mapsEmbedUrl: "",                          // Google Maps embed URL; empty hides the map
  socials: { linkedin: "[[https://www.linkedin.com/company/...]]", instagram: "", x: "" },
  forms: { web3formsKeyEnv: "NEXT_PUBLIC_WEB3FORMS_KEY", resumeUpload: false },
  flags: { showStats: false, showTeam: false },
  analytics: { vercel: true },
} as const;
