import { Metadata } from "next";
import { generateCanonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "How It Works | VitalPredict AI",
  description: "Learn how VitalPredict AI's technology predicts hypoglycemic events before they happen using voice biomarkers and advanced algorithms.",
  alternates: {
    canonical: generateCanonicalUrl({ path: '/how-it-works' }),
  },
};
