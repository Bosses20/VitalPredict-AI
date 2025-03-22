import { Metadata } from "next";
import { generateCanonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Thank You | VitalPredict AI",
  description: "Thank you for your purchase of VitalPredict AI. Your journey to better diabetes management starts now.",
  alternates: {
    canonical: generateCanonicalUrl({ path: '/thank-you' }),
  },
  robots: {
    index: false,
    follow: true,
  },
};
