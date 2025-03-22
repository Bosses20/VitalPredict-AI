import { Metadata } from "next";
import { generateCanonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Terms of Service | VitalPredict AI",
  description: "VitalPredict AI's terms of service outline the rules, guidelines, and legal terms for using our platform and products.",
  alternates: {
    canonical: generateCanonicalUrl({ path: '/terms' }),
  },
};
