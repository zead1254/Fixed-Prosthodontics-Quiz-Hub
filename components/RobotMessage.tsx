
import React, { useState, useEffect } from 'react';

const RobotMessage: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after 2.5 seconds
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] max-w-[300px] w-[90vw] animate-in slide-in-from-right duration-700">
      <div className="glass-card p-5 rounded-2xl flex items-start space-x-4 border-r-4 border-r-blue-500 shadow-2xl relative overflow-hidden">
        {/* Decorative background pulse */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
        
        <button 
          onClick={() => setVisible(false)}
          className="absolute top-2 left-2 text-gray-500 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div className="bg-blue-600/20 p-2.5 rounded-xl robot-float flex-shrink-0 shadow-inner">
          <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <div className="flex-grow text-right pr-2">
          <p className="text-[10px] font-bold text-blue-400 mb-1 uppercase tracking-widest">Message from AI</p>
          <p className="text-sm text-gray-200 leading-relaxed font-semibold" style={{ direction: 'rtl' }}>
            جميع هذه الأسئلة تم إنشاؤها بواسطة الذكاء الاصطناعي.. 
            <span className="block mt-1 text-blue-300">وبعد كده ما تنسوش تدعوا للـ Boss</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RobotMessage;
