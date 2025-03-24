import { Metadata } from "next";
import { generateCanonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Features | VitalPredict AI",
  description: "Discover VitalPredict AI's revolutionary features for predicting hypoglycemic events before they happen, giving diabetics peace of mind.",
  alternates: {
    canonical: generateCanonicalUrl({ path: '/features' }),
  },
};
