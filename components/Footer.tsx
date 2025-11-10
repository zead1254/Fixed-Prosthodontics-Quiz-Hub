
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 px-6 text-center">
      <p className="text-sm text-gray-400">
        © 2025 Dr. Zead |{' '}
        <a 
          href="https://zead1254.github.io/Dr_zead" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Designer's Portfolio
        </a>
      </p>
    </footer>
  );
};

export default Footer;
