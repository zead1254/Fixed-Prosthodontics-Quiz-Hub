
import React from 'react';

const ToothIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-10 h-10 text-blue-500"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442a.562.562 0 01.313.988l-4.179 3.633a.563.563 0 00-.184.568l1.181 5.404a.562.562 0 01-.84.61l-4.69-2.828a.562.562 0 00-.583 0l-4.69 2.828a.562.562 0 01-.84-.61l1.181-5.404a.563.563 0 00-.184-.568L2.053 10.385a.562.562 0 01.313-.988l5.518-.442a.563.563 0 00.475-.345L10.44 3.5z" />
    <circle cx="12" cy="12" r="10" strokeOpacity="0.1" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <nav className="sticky top-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/5 py-5">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-1 bg-blue-500/10 rounded-lg">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white">PROSTHO<span className="text-blue-500">HUB</span></span>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold leading-none">by Dr. Zead</p>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-6">
           <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Courses</a>
           <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Documentation</a>
           <a href="https://zead1254.github.io/Dr_zead" target="_blank" className="text-sm font-medium px-4 py-2 bg-blue-600/10 text-blue-400 rounded-full border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all">Designer Portfolio</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
