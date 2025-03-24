import { Metadata } from "next";
import { generateCanonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Reviews & Testimonials | VitalPredict AI",
  description: "Read first-hand experiences from diabetics who've used VitalPredict AI to predict hypoglycemic events before they happen.",
  alternates: {
    canonical: generateCanonicalUrl({ path: '/testimonials' }),
  },
};
