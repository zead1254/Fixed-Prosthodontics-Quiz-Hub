
import React, { useState, useEffect, useRef } from 'react';
import type { Quiz, Question } from '../types';

interface InternalQuizViewProps {
  quiz: Quiz;
  onClose: () => void;
}

const InternalQuizView: React.FC<InternalQuizViewProps> = ({ quiz, onClose }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [hasCheckedProgress, setHasCheckedProgress] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll completely when quiz is open
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  // Initialize and check LocalStorage for persistent progress
  useEffect(() => {
    if (quiz.questions) {
      const savedKey = `zead_quiz_progress_${quiz.id}`;
      const savedProgress = localStorage.getItem(savedKey);
      
      let baseQuestions = [...quiz.questions];
      // Keep options shuffled every time for variety
      const processed = baseQuestions.map(q => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5)
      }));

      setShuffledQuestions(processed);

      if (savedProgress && !hasCheckedProgress) {
        try {
          const { index, savedScore } = JSON.parse(savedProgress);
          if (index > 0 && index < processed.length) {
            // Arabic/English mixed confirmation
            if (window.confirm("Continue from question " + (index + 1) + "?\nهل تريد الإكمال من حيث توقفت؟")) {
              setCurrentIndex(index);
              setScore(savedScore);
            }
          }
        } catch (e) {
          console.error("Failed to parse progress", e);
        }
        setHasCheckedProgress(true);
      }
    }
  }, [quiz, hasCheckedProgress]);

  // Save progress automatically whenever it changes
  useEffect(() => {
    if (currentIndex > 0 || score > 0) {
      const savedKey = `zead_quiz_progress_${quiz.id}`;
      localStorage.setItem(savedKey, JSON.stringify({
        index: currentIndex,
        savedScore: score
      }));
    }
  }, [currentIndex, score, quiz.id]);

  const handleOptionClick = (option: string) => {
    if (isAnswered || !shuffledQuestions.length) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === shuffledQuestions[currentIndex].answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      // Ensure the question card scrolls back to top for the next question
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Clear progress on completion
      localStorage.removeItem(`zead_quiz_progress_${quiz.id}`);
      setShowResult(true);
    }
  };

  if (!shuffledQuestions.length) return null;

  const currentQuestion = shuffledQuestions[currentIndex];

  if (showResult) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4">
        <div className="bg-[#0f172a] border border-blue-500/30 rounded-[2.5rem] p-10 max-w-md w-full text-center shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
            <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">Quiz Finished!</h2>
          <p className="text-gray-400 mb-6">Excellent Work, Doctor.</p>
          <div className="text-7xl font-bold text-blue-400 my-8 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">{percentage}%</div>
          <p className="text-gray-300 mb-10 font-medium text-lg">Score: {score} / {shuffledQuestions.length}</p>
          <button 
            onClick={onClose}
            className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95"
          >
            Return to Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/90 backdrop-blur-2xl p-3 sm:p-6 overflow-hidden">
      <div 
        ref={scrollContainerRef}
        className="bg-[#0f172a] border border-white/10 rounded-[2rem] sm:rounded-[3rem] w-full max-w-4xl max-h-full sm:max-h-[85vh] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] relative overflow-y-auto custom-scroll"
      >
        {/* Progress Header Sticky */}
        <div className="sticky top-0 left-0 w-full z-30">
          <div className="w-full h-2 bg-gray-900">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 transition-all duration-700 ease-out" 
              style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }}
            ></div>
          </div>
          <div className="bg-[#0f172a]/95 backdrop-blur-xl px-6 sm:px-10 py-5 flex justify-between items-center border-b border-white/5 shadow-sm">
             <div className="flex items-center space-x-4">
               <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                  <span className="text-xl">{quiz.icon}</span>
               </div>
               <div className="hidden sm:block">
                  <h5 className="text-xs font-bold text-blue-400 uppercase tracking-widest">{quiz.title}</h5>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Prosthodontics Hub</p>
               </div>
             </div>
             <div className="flex items-center space-x-6">
                <div className="text-right">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Progress</p>
                    <p className="text-sm font-bold text-white">{currentIndex + 1} / {shuffledQuestions.length}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-all p-2.5 hover:bg-white/5 rounded-full border border-transparent hover:border-white/10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
             </div>
          </div>
        </div>

        <div className="p-6 sm:p-12 md:p-16">
          <div className="mb-12">
            <h3 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
              {currentQuestion.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-12">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "w-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 text-left transition-all duration-300 flex justify-between items-center group relative overflow-hidden ";
              if (!isAnswered) {
                btnClass += "border-white/5 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 text-gray-300 hover:translate-x-2";
              } else {
                if (option === currentQuestion.answer) {
                  btnClass += "border-green-500/50 bg-green-500/10 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]";
                } else if (option === selectedOption) {
                  btnClass += "border-red-500/50 bg-red-500/10 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]";
                } else {
                  btnClass += "border-white/5 bg-transparent text-gray-600 opacity-60";
                }
              }

              return (
                <button 
                  key={idx} 
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered}
                  className={btnClass}
                >
                  <div className="flex items-center space-x-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${!isAnswered ? 'border-white/10 bg-white/5 text-gray-500' : (option === currentQuestion.answer ? 'border-green-500/30 bg-green-500/20 text-green-400' : 'border-white/5 bg-transparent text-gray-700')}`}>
                        {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-lg sm:text-xl font-medium pr-8">{option}</span>
                  </div>
                  
                  {isAnswered && option === currentQuestion.answer && (
                    <div className="bg-green-500/20 p-1.5 rounded-full flex-shrink-0 animate-in fade-in zoom-in duration-300">
                        <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="sticky bottom-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a] to-transparent pt-10 pb-4">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`w-full py-5 sm:py-6 rounded-2xl sm:rounded-[2rem] font-bold text-xl transition-all shadow-2xl flex items-center justify-center space-x-3 active:scale-95 ${
                isAnswered 
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/40" 
                  : "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5"
              }`}
            >
              <span>{currentIndex === shuffledQuestions.length - 1 ? 'Finish & See Results' : 'Continue to Next Question'}</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
            <p className="text-center text-[10px] text-gray-600 mt-4 uppercase font-bold tracking-[0.3em]">Progress is automatically saved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalQuizView;
