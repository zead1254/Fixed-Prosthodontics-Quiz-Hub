
import React from 'react';
import type { Quiz } from '../types';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  return (
    <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50">
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-4">{quiz.icon}</span>
          <h2 className="text-lg md:text-xl font-bold text-left text-gray-100 group-hover:text-white transition-colors">
            {quiz.title}
          </h2>
        </div>
        <p className="flex-grow text-left text-gray-300 mb-6">{quiz.description}</p>
        <a
          href={quiz.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
        >
          Start Quiz
        </a>
      </div>
    </div>
  );
};

export default QuizCard;
