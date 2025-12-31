
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 px-6 mt-12 border-t border-white/5 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
          <span className="text-gray-500 text-sm">© 2025 Dr. Zead</span>
          <span className="hidden md:block text-gray-700">|</span>
          <span className="text-blue-400/80 text-sm font-medium tracking-wide">Dental Education Initiative</span>
        </div>
        <p className="text-xs text-gray-600 max-w-lg mx-auto leading-relaxed">
          The materials provided are for educational purposes in the field of Fixed Prosthodontics. 
          Knowledge is the foundation of excellence in restorative dentistry.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
