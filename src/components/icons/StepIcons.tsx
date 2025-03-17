import React from 'react';

// Icon components using emoji with styled backgrounds
export const StepOneIcon: React.FC = () => (
  <div className="bg-zinc-800 w-16 h-16 rounded-xl flex items-center justify-center">
    <span className="text-2xl md:text-3xl" role="img" aria-label="Person at computer">👩‍💻</span>
  </div>
);

export const StepTwoIcon: React.FC = () => (
  <div className="bg-zinc-800 w-16 h-16 rounded-xl flex items-center justify-center">
    <span className="text-2xl md:text-3xl" role="img" aria-label="Robot">🤖</span>
  </div>
);

export const StepThreeIcon: React.FC = () => (
  <div className="bg-zinc-800 w-16 h-16 rounded-xl flex items-center justify-center">
    <span className="text-2xl md:text-3xl" role="img" aria-label="Alert">🚨</span>
  </div>
);
