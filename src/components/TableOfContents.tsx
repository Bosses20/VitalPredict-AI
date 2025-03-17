"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TableOfContentsProps {
  sections: {
    id: string;
    title: string;
  }[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [showContents, setShowContents] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      const scrollPosition = window.scrollY + 200; // Add some offset

      const currentSection = sections
        .map(section => {
          const element = document.getElementById(section.id);
          if (!element) return { id: section.id, position: -1 };
          return {
            id: section.id,
            position: element.offsetTop
          };
        })
        .filter(section => section.position !== -1)
        .reduce((prev, current) => {
          return (scrollPosition >= current.position && 
                  current.position > prev.position) ? current : prev;
        }, { id: '', position: -1 });

      setActiveSection(currentSection.id);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial active section

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return (
    <div className="relative">
      {/* Mobile TOC toggle */}
      <motion.div 
        className="md:hidden fixed right-4 top-24 z-30 bg-zinc-900/80 backdrop-blur-md rounded-full p-2 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowContents(!showContents)}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-lime-400"
          >
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </motion.div>

      {/* Mobile dropdown TOC */}
      {showContents && (
        <motion.div 
          className="md:hidden fixed right-4 top-36 z-30 bg-zinc-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-[90vw] w-64"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">On this page</h3>
            <button 
              onClick={() => setShowContents(false)}
              className="text-white/60 hover:text-white/90"
            >
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
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block py-1 px-2 text-sm rounded ${
                    activeSection === section.id 
                      ? 'bg-lime-400/10 text-lime-400' 
                      : 'text-white/70 hover:text-white/90'
                  }`}
                  onClick={() => setShowContents(false)}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Desktop sidebar TOC */}
      <div className="hidden md:block sticky top-24 float-right ml-8 mb-8 bg-zinc-900/80 backdrop-blur-md rounded-xl p-4 shadow-lg w-64">
        <h3 className="text-sm font-medium mb-3">On this page</h3>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`block py-1 px-2 text-sm rounded transition-all duration-200 ${
                  activeSection === section.id 
                    ? 'bg-lime-400/10 text-lime-400' 
                    : 'text-white/70 hover:text-white/90'
                }`}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
