"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/assets/images/logo.svg";

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Simple Header */}
      <header className="py-6 border-b border-white/10">
        <div className="container max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="transition-transform hover:scale-105">
            <Image 
              src={logoImage} 
              alt="VitalPredict AI logo" 
              className="h-8 w-auto" 
              height={32}
            />
          </Link>
          <Link 
            href="/" 
            className="text-sm font-medium text-white/70 hover:text-lime-400 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>
      
      <main className="container max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-lime-400 to-emerald-600 bg-clip-text text-transparent">Privacy Policy</h1>
          
          <div className="prose prose-lg prose-invert prose-headings:text-lime-50 prose-a:text-lime-400 prose-strong:text-lime-200 max-w-none">
            <p className="text-white/70 text-sm">Last Updated: {currentYear}-03-01</p>
            
            <h2>1. Introduction</h2>
            <p>
              VitalPredict AI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application and services.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We collect the following types of information:
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, and demographic information.</li>
              <li><strong>Health Data:</strong> Blood glucose readings, insulin doses, carbohydrate intake, and other diabetes-related health metrics.</li>
              <li><strong>Device Information:</strong> Information about your mobile device, including device type, operating system, and unique device identifiers.</li>
              <li><strong>Usage Data:</strong> How you interact with our application, features you use, and time spent on the app.</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>To provide, maintain, and improve our services</li>
              <li>To detect patterns that may indicate hypoglycemic events</li>
              <li>To contact your emergency contacts in case of emergency</li>
              <li>To communicate with you about our services</li>
              <li>To comply with applicable laws and regulations</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data. All health information is encrypted in transit and at rest. We maintain regular security assessments and compliance checks.
            </p>
            
            <h2>5. Data Sharing</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Your designated emergency contacts (in emergency situations only)</li>
              <li>Service providers who assist in delivering our services</li>
              <li>Law enforcement or regulatory bodies when required by law</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>
            
            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to:
            </p>
            <ul>
              <li>Access the personal information we have about you</li>
              <li>Correct inaccurate information</li>
              <li>Delete your information</li>
              <li>Restrict or object to certain processing activities</li>
              <li>Request a copy of your information in a portable format</li>
            </ul>
            
            <h2>7. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
            
            <h2>8. Children's Privacy</h2>
            <p>
              Our Service is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
            </p>
            
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: privacy@vitalpredict.ai<br />
              Address: 123 Health Tech Boulevard, San Francisco, CA 94107
            </p>
            
            <h2>11. Third-Party Links</h2>
            <p>
              Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
            </p>
          </div>
          <div className="mt-16 p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur">
            <h3 className="text-xl font-semibold mb-4 text-lime-300">Questions or Concerns?</h3>
            <p className="text-white/80">
              If you have any questions about our Privacy Policy, please don't hesitate to contact our data protection team at{' '}
              <a href="mailto:privacy@vitalpredict.ai" className="text-lime-400 hover:underline">privacy@vitalpredict.ai</a>
            </p>
          </div>
        </motion.div>
      </main>
      
      <footer className="border-t border-white/10 py-6">
        <div className="container max-w-5xl mx-auto px-4 text-center text-sm text-white/50">
          &copy; {currentYear} VitalPredict AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
