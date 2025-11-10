
import React from 'react';

const ToothIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 md:w-10 md:h-10 text-blue-400"
  >
    <path d="M12.75 12.75L9 15l-1.5-1.5-2.122 2.121c-.42.42-.782.91-1.088 1.458a20.25 20.25 0 0011.92 1.414 20.274 20.274 0 003.524-.43c.15-.04.29-.09.42-.145.42-.18.78-.44 1.08-.78l2.12-2.121-1.5-1.5-3.75-2.25z" />
    <path d="M12 3c-5.06 0-9.25 4.08-9.25 9.13 0 2.44.98 4.78 2.68 6.55l1.41-1.41A7.63 7.63 0 015.75 12.13c0-4.14 3.46-7.5 7.7-7.5s7.7 3.36 7.7 7.5a7.63 7.63 0 01-1.6 4.7l1.4 1.41c1.7-1.77 2.68-4.1 2.68-6.55C21.25 7.08 17.06 3 12 3z" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 md:py-6 md:px-10">
      <div className="container mx-auto flex items-center justify-center">
        <div className="animate-[spin_8s_linear_infinite] mr-3">
            <ToothIcon />
        </div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-200 tracking-wider">
          Fixed Prosthodontics Quiz Hub <span className="hidden sm:inline">by Dr. Zead</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
