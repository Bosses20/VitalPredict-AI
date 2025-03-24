import { Metadata } from "next";
import { generateCanonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | VitalPredict AI",
  description: "Get answers to common questions about VitalPredict AI, our hypoglycemia prediction technology, and how it works for diabetics.",
  alternates: {
    canonical: generateCanonicalUrl({ path: '/faqs' }),
  },
};
