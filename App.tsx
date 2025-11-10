
import React, { useState, useEffect } from 'react';
import { QUIZZES, QUOTES } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import QuizCard from './components/QuizCard';
import AnimatedBackground from './components/AnimatedBackground';
import MotivationalQuote from './components/MotivationalQuote';

const App: React.FC = () => {
  const [mainTitle, setMainTitle] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const fullTitle = "Welcome to the Fixed Prosthodontics Quiz Hub";

  useEffect(() => {
    const timer = setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
        if (i <= fullTitle.length) {
            setMainTitle(fullTitle.substring(0, i));
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => setShowSubtitle(true), 300);
            setTimeout(() => setShowGrid(true), 600);
        }
        }, 80);
        return () => clearInterval(interval);
    }, 500); // Initial delay before starting the animation
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex(prevIndex => (prevIndex + 1) % QUOTES.length);
    }, 7000); // Change quote every 7 seconds

    return () => clearInterval(quoteInterval);
  }, []);


  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#0a101f] via-[#0c1427] to-[#1a233b] text-white overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 text-center">
          <div className="max-w-4xl w-full">
            <div className="typewriter mb-4 min-h-[4rem] md:min-h-[5rem]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
                {mainTitle}
              </h1>
            </div>
            
            <p className={`text-base md:text-lg text-gray-300 mb-2 transition-opacity duration-1000 ${showSubtitle ? 'opacity-100' : 'opacity-0'}`}>
              Select your quiz below and test your knowledge in restorative dentistry.
            </p>

            <div className={`transition-opacity duration-1000 ${showSubtitle ? 'opacity-100' : 'opacity-0'}`}>
              <MotivationalQuote quote={QUOTES[quoteIndex]} />
            </div>
            
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 transition-all duration-1000 ${showGrid ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {QUIZZES.map((quiz, index) => (
                <QuizCard key={index} quiz={quiz} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
