
import React, { useState, useEffect } from 'react';

interface MotivationalQuoteProps {
  quote: string;
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ quote }) => {
  const [visible, setVisible] = useState(true);

  // This effect triggers when the quote prop changes, creating a fade effect.
  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [quote]);

  return (
    <div className="my-8 min-h-[5rem] flex items-center justify-center px-4">
      <p
        className={`text-lg md:text-xl text-center text-gray-300 italic transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ direction: 'rtl' }} // Ensure Arabic text is displayed correctly
      >
        "{quote}"
      </p>
    </div>
  );
};

export default MotivationalQuote;
