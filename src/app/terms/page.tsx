"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/assets/images/logo.svg";

// Moved metadata to layout.tsx or directly in app/page.tsx to avoid conflicts with "use client"

export default function TermsOfService() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-lime-400 to-emerald-600 bg-clip-text text-transparent">Terms of Service</h1>
          
          <div className="prose prose-lg prose-invert prose-headings:text-lime-50 prose-a:text-lime-400 prose-strong:text-lime-200 max-w-none">
            <p className="text-white/70 text-sm">Last Updated: {currentYear}-03-01</p>
            
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using VitalPredict AI's application and services ("Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.
            </p>
            
            <h2>2. Description of Services</h2>
            <p>
              VitalPredict AI provides a predictive health monitoring platform that uses voice analysis and glucose data to predict potential hypoglycemic events. Our Services include voice recording analysis, glucose trend monitoring, emergency notifications, and related features.
            </p>
            
            <h2>3. Health Disclaimer</h2>
            <div className="p-5 border border-yellow-500/30 rounded-lg bg-yellow-500/10 my-6">
              <p className="!text-yellow-300 font-medium">
                <strong className="!text-yellow-300">IMPORTANT:</strong> VitalPredict AI is not a replacement for medical care or emergency services. Our predictive capabilities are designed as an additional tool to help you manage your health, not as a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p className="!text-yellow-200/90">
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay seeking it because of information provided by VitalPredict AI.
              </p>
              <p className="!text-yellow-200/90">
                In case of a medical emergency, call your doctor or emergency services immediately.
              </p>
            </div>
            
            <h2>4. Account Registration</h2>
            <p>
              To use certain features of our Services, you may need to create an account. You are responsible for:
            </p>
            <ul>
              <li>Providing accurate and complete information</li>
              <li>Maintaining the security of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
            
            <h2>5. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Use our Services only for lawful purposes</li>
              <li>Provide accurate information about your health status</li>
              <li>Understand the limitations of our predictive technology</li>
              <li>Not attempt to reverse-engineer our technology</li>
              <li>Not use our Services to harm others or impersonate any person or entity</li>
            </ul>
            
            <h2>6. Subscription and Payments</h2>
            <p>
              Certain features of our Services require a paid subscription. By subscribing, you agree to pay the specified fees. We may change our fees upon reasonable notice. All fees are non-refundable except as required by law or as specifically outlined in these terms.
            </p>
            
            <h2>7. Intellectual Property</h2>
            <p>
              All content and technology associated with our Services are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Services without our permission.
            </p>
            
            <h2>8. Privacy</h2>
            <p>
              Your use of our Services is also governed by our Privacy Policy, which is incorporated by reference into these Terms.
            </p>
            
            <h2>9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, VITALPREDICT AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul>
              <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES</li>
              <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES</li>
              <li>ANY CONTENT OBTAINED FROM THE SERVICES</li>
              <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT</li>
            </ul>
            
            <h2>10. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. If we make material changes, we will notify you through the Services or by email. Your continued use of the Services after such notification constitutes your acceptance of the updated Terms.
            </p>
            
            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Services will immediately cease.
            </p>
            
            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the State of California, without regard to its conflict of law provisions. Any disputes relating to these Terms shall be subject to the exclusive jurisdiction of the courts of San Francisco County, California.
            </p>
            
            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: legal@vitalpredict.ai<br />
              Address: 123 Health Tech Boulevard, San Francisco, CA 94107
            </p>
          </div>
        </motion.div>
        
        <div className="mt-16 p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur">
          <h3 className="text-xl font-semibold mb-4 text-lime-300">Need Assistance?</h3>
          <p className="text-white/80">
            If you have any questions about these Terms of Service, please don't hesitate to contact our legal team at{' '}
            <a href="mailto:legal@vitalpredict.ai" className="text-lime-400 hover:underline">legal@vitalpredict.ai</a>
          </p>
        </div>
      </main>
      
      <footer className="border-t border-white/10 py-6">
        <div className="container max-w-5xl mx-auto px-4 text-center text-sm text-white/50">
          &copy; {currentYear} VitalPredict AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
