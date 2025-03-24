import { Metadata } from "next";
import { generateCanonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Detailed Guide | How VitalPredict AI Works",
  description: "A comprehensive guide on how VitalPredict AI technology predicts hypoglycemic events for diabetics using advanced machine learning algorithms.",
  alternates: {
    canonical: generateCanonicalUrl({ path: '/how-it-works/guide' }),
  },
};
