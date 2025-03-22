import { Metadata } from "next";
import { generateCanonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Privacy Policy | VitalPredict AI",
  description: "VitalPredict AI's privacy policy explains how we collect, use, and protect your personal information.",
  alternates: {
    canonical: generateCanonicalUrl({ path: '/privacy' }),
  },
};
