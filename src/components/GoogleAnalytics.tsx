'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-6K59GJ6KTC"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6K59GJ6KTC');
        `}
      </Script>
    </>
  );
}
