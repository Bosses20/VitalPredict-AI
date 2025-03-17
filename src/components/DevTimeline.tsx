"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function DevTimeline() {
  const stages = [
    { 
      id: 'research', 
      name: 'Research', 
      description: 'Voice biomarker analysis and AI model development',
      status: 'completed',
      date: 'Q3 2024'
    },
    { 
      id: 'development', 
      name: 'Development', 
      description: 'Building core application and integration with glucose monitors',
      status: 'active',
      date: 'Present'
    },
    { 
      id: 'beta', 
      name: 'Beta Testing', 
      description: 'Limited release to waitlist members for testing and feedback',
      status: 'upcoming',
      date: 'Q2 2025'
    },
    { 
      id: 'launch', 
      name: 'Public Launch', 
      description: 'Full release with all features and integrations',
      status: 'upcoming',
      date: 'Q4 2025'
    }
  ];

  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1A1A1A] text-lime-400 text-xs font-medium mb-2">
            DEVELOPMENT STATUS
          </div>
          <h3 className="text-xl font-bold">Where We Are Now</h3>
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-lime-400/10 text-lime-400 text-sm">
          <span className="inline-block w-2 h-2 bg-lime-400 rounded-full mr-2 animate-pulse"></span>
          Currently in Active Development
        </div>
      </div>
      
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[19px] md:left-1/2 top-0 h-full w-[2px] bg-zinc-800 transform md:-translate-x-px"></div>
        
        {/* Timeline stages */}
        {stages.map((stage, index) => (
          <div key={stage.id} className={`relative flex flex-col md:flex-row gap-4 mb-8 items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            {/* Circle */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 mt-1.5 z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                stage.status === 'completed' 
                  ? 'border-lime-400 bg-lime-400/20' 
                  : stage.status === 'active'
                    ? 'border-lime-400 bg-black animate-pulse'
                    : 'border-zinc-700 bg-black'
              }`}>
                {stage.status === 'completed' ? (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-lime-400"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : stage.status === 'active' ? (
                  <span className="w-3 h-3 rounded-full bg-lime-400"></span>
                ) : (
                  <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className={`md:w-[calc(50%-2rem)] ml-16 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:mr-8' : 'md:ml-8'}`}>
              <motion.div 
                className={`bg-[#111111] rounded-xl border p-4 ${
                  stage.status === 'active' 
                    ? 'border-lime-400/50' 
                    : 'border-[#222222]'
                }`}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">{stage.name}</h4>
                  <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${
                    stage.status === 'completed' 
                      ? 'bg-lime-400/20 text-lime-400' 
                      : stage.status === 'active'
                        ? 'bg-blue-400/20 text-blue-400 animate-pulse'
                        : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {stage.date}
                  </span>
                </div>
                <p className="text-white/60 text-sm">{stage.description}</p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
