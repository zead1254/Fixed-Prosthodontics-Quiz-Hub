
import React from 'react';
import type { Quiz } from '../types';

interface QuizCardProps {
  quiz: Quiz;
  onStartInternal: (quiz: Quiz) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onStartInternal }) => {
  const isInternal = !!quiz.questions;

  const handleAction = () => {
    if (isInternal) {
      onStartInternal(quiz);
    } else if (quiz.link) {
      window.open(quiz.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="group glass-card rounded-2xl p-6 flex flex-col h-full relative overflow-hidden">
      {/* Decorative Gradient Background on Hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
      
      <div className="flex items-center mb-5 z-10">
        <div className="w-14 h-14 flex items-center justify-center bg-blue-500/10 rounded-xl text-3xl mr-4 group-hover:bg-blue-500/20 transition-colors">
          {quiz.icon}
        </div>
        <h2 className="text-lg md:text-xl font-bold text-left text-gray-100 group-hover:text-blue-400 transition-colors leading-tight">
          {quiz.title}
        </h2>
      </div>
      
      <p className="flex-grow text-left text-gray-400 group-hover:text-gray-300 mb-8 z-10 leading-relaxed">
        {quiz.description}
      </p>
      
      <button
        onClick={handleAction}
        className="z-10 w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 bg-white/5 border border-white/10 hover:bg-blue-600 hover:text-white hover:border-transparent group-hover:shadow-lg group-hover:shadow-blue-500/20"
      >
        <span>{isInternal ? 'Take Internal Quiz' : 'Go to Quiz Page'}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </button>
      
      {isInternal && (
        <div className="absolute top-4 right-4">
          <span className="bg-cyan-500/10 text-cyan-400 text-[10px] px-2 py-1 rounded-md border border-cyan-500/20 font-bold uppercase tracking-widest">
            Internal
          </span>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
