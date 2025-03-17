import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
    axes: ["opsz"],
});

export const metadata: Metadata = {
    title: "VitalPredict AI | Predicting Hypoglycemia Before It Happens",
    description: "Advanced AI technology that helps diabetic patients anticipate and prevent dangerous hypoglycemic events with personalized predictive alerts based on voice biomarkers and real-time data.",
    keywords: [
      "diabetes", 
      "hypoglycemia prediction", 
      "AI health", 
      "glucose monitoring", 
      "diabetes management", 
      "voice biomarkers",
      "blood glucose prediction",
      "hypoglycemia alerts",
      "CGM integration",
      "diabetic health tech",
      "medical AI",
      "predictive healthcare"
    ],
    authors: [{ name: "VitalPredict AI Team" }],
    creator: "VitalPredict AI",
    publisher: "VitalPredict AI",
    metadataBase: new URL('https://vitalpredict.ai'),
    openGraph: {
        title: "VitalPredict AI | Predicting Hypoglycemia Before It Happens",
        description: "AI-powered glucose prediction for diabetic patients. Prevent hypoglycemic events before they happen with voice biomarker technology.",
        images: [
          {
            url: '/images/og-image.png',
            width: 1200,
            height: 630,
            alt: 'VitalPredict AI - Hypoglycemia Prediction'
          }
        ],
        locale: 'en_US',
        type: 'website',
        siteName: 'VitalPredict AI',
    },
    twitter: {
        card: 'summary_large_image',
        title: "VitalPredict AI | Glucose Prediction",
        description: "AI-powered glucose prediction for diabetic patients using voice biomarkers",
        images: ['/images/twitter-image.png'],
        creator: '@VitalPredictAI',
        site: '@VitalPredictAI'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' },
        ],
    },
    manifest: '/manifest.json',
    category: 'Health & Wellness',
    verification: {
      google: 'google-site-verification-code', // Replace with actual verification code when available
    },
    alternates: {
      canonical: 'https://vitalpredict.ai',
    },
    applicationName: 'VitalPredict AI',
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <meta name="theme-color" content="#000000" />
                <link rel="canonical" href="https://vitalpredict.ai" />
            </head>
            <body
                className={`${inter.variable} font-sans antialiased bg-neutral-950 text-white`}
            >
                <AnalyticsProvider>
                    {children}
                </AnalyticsProvider>
            </body>
        </html>
    );
}
