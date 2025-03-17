"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Collapsible from './Collapsible';

export default function TechnicalSpecs() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Icons for different sections
  const IconAI = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lime-400">
      <path d="M12 2a9 9 0 0 1 6.36 15.36A9 9 0 0 1 5.64 5.64 9 9 0 0 1 12 2z"></path>
      <path d="M12 22a9 9 0 0 0 6.36-15.36A9 9 0 0 0 5.64 18.36 9 9 0 0 0 12 22z"></path>
    </svg>
  );

  const IconVoice = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lime-400">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="22"></line>
    </svg>
  );

  const IconDevice = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lime-400">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
      <line x1="12" y1="18" x2="12" y2="18"></line>
    </svg>
  );

  const IconAlert = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lime-400">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  );

  const IconSecurity = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lime-400">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  return (
    <motion.div 
      id="tech-specs"
      className="mb-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Technical 
        <span className="text-lime-400 ml-2">Specifications</span>
      </h2>

      <p className="text-white/60 text-center mb-8 max-w-3xl mx-auto">
        These are the planned specifications for our product currently in development
      </p>

      <div className="bg-[#111111] rounded-3xl border border-[#222222] p-6 md:p-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-4 mb-8">
          {/* AI Model Collapsible */}
          <Collapsible 
            title="Planned AI Model Architecture" 
            defaultOpen={true}
            titleClass="text-lg font-medium"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1"><IconAI /></div>
                <div>
                  <span className="font-medium block mb-1">Base Algorithm</span>
                  <p className="text-white/70 text-sm">
                    Our hybrid approach combines a Long Short-Term Memory (LSTM) neural network for temporal voice pattern analysis with a Random Forest ensemble for glucose data correlation. This dual architecture enables both short-term voice changes and long-term pattern recognition.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1"><IconAI /></div>
                <div>
                  <span className="font-medium block mb-1">Prediction Window</span>
                  <p className="text-white/70 text-sm">
                    The system is designed to provide a 30-minute advance warning before hypoglycemic events, giving users crucial time to consume glucose and prevent dangerous crashes. The prediction confidence increases as the time window narrows.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1"><IconAI /></div>
                <div>
                  <span className="font-medium block mb-1">Data Processing</span>
                  <p className="text-white/70 text-sm">
                    Voice preprocessing happens on-device to maintain privacy, extracting only essential biomarkers. The encrypted data is then sent to secure cloud servers for inference using our proprietary AI models, with results returned in under 3 seconds.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1"><IconAI /></div>
                <div>
                  <span className="font-medium block mb-1">Training Dataset</span>
                  <p className="text-white/70 text-sm">
                    Our models are being trained on a diverse dataset of 14,500+ voice samples, ensuring representation across different accents, ages, and diabetes types. This comprehensive approach aims to provide accurate predictions for all users.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1"><IconAI /></div>
                <div>
                  <span className="font-medium block mb-1">Target Accuracy</span>
                  <p className="text-white/70 text-sm">
                    Our ongoing clinical validation aims to achieve 85% predictive accuracy, significantly outperforming current reactive glucose monitoring systems. The AI continually improves with each user interaction through federated learning.
                  </p>
                </div>
              </div>
            </div>
          </Collapsible>
          
          {/* Voice Biomarker Analysis */}
          <Collapsible 
            title="Voice Biomarker Analysis" 
            titleClass="text-lg font-medium"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1"><IconVoice /></div>
                <div>
                  <span className="font-medium block mb-1">Acoustic Features</span>
                  <p className="text-white/70 text-sm">
                    We analyze microscopic voice tremors, jitter (frequency variations), shimmer (amplitude variations), harmonics-to-noise ratio, and formant frequencies that change subtly during hypoglycemia, often imperceptible to human ears.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1"><IconVoice /></div>
                <div>
                  <span className="font-medium block mb-1">Baseline Calibration</span>
                  <p className="text-white/70 text-sm">
                    During the first week, the system will create your individual acoustic profile by analyzing daily voice samples alongside your glucose readings. This personalized approach accounts for your unique vocal characteristics.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1"><IconVoice /></div>
                <div>
                  <span className="font-medium block mb-1">Biomarker Set</span>
                  <p className="text-white/70 text-sm">
                    Our proprietary analysis identifies 37 distinct vocal biomarkers that correlate with low blood sugar, including specific changes in vowel resonance, speech rhythm alterations, and microscopic vocal cord tension patterns.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1"><IconVoice /></div>
                <div>
                  <span className="font-medium block mb-1">Recording Design</span>
                  <p className="text-white/70 text-sm">
                    The app will prompt you for a simple 10-second morning voice recording reading a standardized phrase. Additional on-demand recordings can be made anytime you feel symptoms or want to check your status.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1"><IconVoice /></div>
                <div>
                  <span className="font-medium block mb-1">Research Basis</span>
                  <p className="text-white/70 text-sm">
                    Our approach builds on peer-reviewed research from Johns Hopkins and Mayo Clinic that demonstrated voice analysis can detect hypoglycemia with similar accuracy to traditional CGM devices in controlled settings.
                  </p>
                </div>
              </div>
            </div>
          </Collapsible>
        </div>

        {/* Integration and Alert System */}
        <h3 className="text-xl font-bold text-lime-400 mb-4">Planned Integration & Alert System</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <IconDevice />
              <h4 className="font-medium">CGM Compatibility</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                Dexcom G6 & G7
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                FreeStyle Libre 2 & 3
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                Medtronic Guardian
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                Eversense
              </li>
            </ul>
          </div>
          
          <div className="bg-zinc-900/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <IconAlert />
              <h4 className="font-medium">Alert System Design</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                Tier 1: User-only alert (30-min)
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                Tier 2: Emergency contacts (10-min)
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                Tier 3: Auto-EMS alert with GPS
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                Sleep Safety Mode with pillow vibration
              </li>
            </ul>
          </div>
          
          <div className="bg-zinc-900/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <IconSecurity />
              <h4 className="font-medium">Data Security Framework</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                HIPAA & GDPR Compliant
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                AES-256 encryption
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                User-owned data policy
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block"></span>
                Zero-knowledge voice storage
              </li>
            </ul>
          </div>
        </div>

        {/* Citation */}
        <div className="mt-4 pt-4 border-t border-zinc-800 text-center">
          <p className="text-white/40 text-xs">
            * Technical specifications are based on our research and planned features.
            The final product may vary as we continue development and testing.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
