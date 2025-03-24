import { Metadata } from "next";
import { generateCanonicalUrl } from "@/lib/canonical";

export const metadata: Metadata = {
  title: "Early Access | VitalPredict AI",
  description: "Get early access to VitalPredict AI's hypoglycemia prediction technology. Join our waitlist to be among the first to experience this life-changing solution.",
  alternates: {
    canonical: generateCanonicalUrl({ path: '/early-access' }),
  },
};
