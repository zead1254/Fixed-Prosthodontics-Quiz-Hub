
import React, { useState, useEffect, useRef } from 'react';
import { QUIZZES } from './data';
import { QuizData, ViewState, Question } from './types';
import { 
  ChevronRight, 
  Trophy,
  ArrowLeft,
  Stethoscope,
  Sparkles,
  Award,
  BookOpen,
  Zap,
  Flame,
  Shield,
  Clock,
  Skull,
  Star,
  Brain,
  Ghost,
  Volume2
} from 'lucide-react';

declare const confetti: any;

const App: React.FC = () => {
  // Navigation & Content
  const [view, setView] = useState<ViewState>('home');
  const [activeQuiz, setActiveQuiz] = useState<QuizData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Stats & Progress
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(() => {
    try {
      return Number(localStorage.getItem('dental_xp')) || 0;
    } catch {
      return 0;
    }
  });
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  
  // Power-ups
  const [powerUps, setPowerUps] = useState({
    hints: 3,
    freezes: 2
  });
  const [isFrozen, setIsFrozen] = useState(false);
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);

  // Timer
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<number | null>(null);

  // Feedback UI
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [xpGain, setXpGain] = useState<number | null>(null);
  const [typedMessage, setTypedMessage] = useState('');
  const [messageToast, setMessageToast] = useState<string | null>(null);
  const [showBoss, setShowBoss] = useState(false);
  
  const welcomeText = "جميع الاسئله تم انشائها بواسطه الذكاء الاصطناعي... ماتنسوش تدعوا ل ";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedMessage(welcomeText.slice(0, i));
      i++;
      if (i > welcomeText.length) {
        clearInterval(interval);
        setShowBoss(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('dental_xp', xp.toString());
    } catch (e) {}
  }, [xp]);

  useEffect(() => {
    if (view === 'quiz' && !isFrozen && feedback === null) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeOut();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [view, currentIndex, isFrozen, feedback]);

  const handleTimeOut = () => {
    setFeedback('wrong');
    setStreak(0);
    setMessageToast("Time's up! ⏳");
    setTimeout(() => {
      setMessageToast(null);
      setFeedback(null);
      nextQuestion();
    }, 1500);
  };

  const handleStartQuiz = (quiz: QuizData) => {
    if (quiz.isExternal) {
      window.open(quiz.link, '_blank');
      return;
    }
    setActiveQuiz(quiz);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setFeedback(null);
    setEliminatedIndices([]);
    setView('quiz');
  };

  const handleSelectAnswer = (optionLetter: string) => {
    if (feedback) return;
    const correct = activeQuiz?.questions?.[currentIndex].answer === optionLetter;

    if (correct) {
      setFeedback('correct');
      setScore((s) => s + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(Math.max(maxStreak, newStreak));
      
      const gain = 20 + (newStreak * 5);
      setXpGain(gain);
      setXp((prev) => prev + gain);

      if (newStreak >= 3) {
        setMessageToast(`🔥 Streak ${newStreak}! UNSTOPPABLE!`);
      } else {
        setMessageToast("Bravo! Keep going! 💪");
      }

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#22c55e', '#3b82f6', '#ffffff']
      });
    } else {
      setFeedback('wrong');
      setStreak(0);
      setMessageToast("Wrong choice, but don't give up! 😉");
    }

    setTimeout(() => {
      setFeedback(null);
      setXpGain(null);
      setMessageToast(null);
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    if (!activeQuiz?.questions) return;
    if (currentIndex < activeQuiz.questions.length - 1) {
      setCurrentIndex((c) => c + 1);
      setTimeLeft(30);
      setIsFrozen(false);
      setEliminatedIndices([]);
    } else {
      setView('result');
    }
  };

  const use5050 = () => {
    if (powerUps.hints <= 0 || feedback || eliminatedIndices.length > 0) return;
    const currentQ = activeQuiz?.questions?.[currentIndex];
    if (!currentQ) return;
    
    const correctLetter = currentQ.answer;
    const options = ['A', 'B', 'C', 'D'];
    const wrongOnes = options.filter(o => o !== correctLetter);
    const toEliminate = wrongOnes.sort(() => 0.5 - Math.random()).slice(0, 2);
    
    setEliminatedIndices(toEliminate.map(letter => options.indexOf(letter)));
    setPowerUps(p => ({ ...p, hints: p.hints - 1 }));
  };

  const useFreeze = () => {
    if (powerUps.freezes <= 0 || feedback || isFrozen) return;
    setIsFrozen(true);
    setPowerUps(p => ({ ...p, freezes: p.freezes - 1 }));
  };

  const goHome = () => {
    setView('home');
    setActiveQuiz(null);
  };

  const currentLevel = Math.floor(xp / 1000) + 1;
  const progressToNextLevel = ((xp % 1000) / 1000) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] transition-colors duration-500 overflow-x-hidden">
      {/* HUD Header */}
      <header className="bg-white/95 backdrop-blur-md border-b-2 border-blue-100 sticky top-0 z-50 shadow-md h-20">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={goHome}>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:rotate-12 transition-all">
              <Stethoscope className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">PROSTH <span className="text-blue-600">MASTERY</span></h1>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1">Academy Rank: {currentLevel}</p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="hidden lg:flex flex-col items-end">
               <div className="flex items-center space-x-2 mb-1">
                 <Zap className="w-4 h-4 text-blue-500" />
                 <span className="text-[10px] font-black text-slate-400">XP PROGRESS</span>
               </div>
               <div className="w-40 h-3 bg-slate-100 rounded-full border border-blue-50 overflow-hidden shadow-inner">
                 <div className="h-full bg-blue-600 transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.3)]" style={{ width: `${progressToNextLevel}%` }}></div>
               </div>
            </div>
            <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
               <Flame className={`w-6 h-6 ${streak > 2 ? 'text-orange-500 animate-bounce' : 'text-slate-200'}`} />
               <span className="text-xl font-black text-slate-800">{streak}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
        {view === 'home' && (
          <div className="space-y-12 animate-in fade-in zoom-in duration-700">
            {/* Massive Hero Card */}
            <div className="relative overflow-hidden bg-white rounded-[3rem] p-8 md:p-16 border-4 border-white shadow-[0_20px_60px_-15px_rgba(30,58,138,0.15)]">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent -skew-x-12 pointer-events-none"></div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center space-x-3 px-5 py-2.5 bg-blue-950 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl">
                    <Volume2 className="w-4 h-4 animate-pulse" /> <span>Academic Simulation Engine</span>
                  </div>
                  <h2 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.85]">
                    Master the <br/>
                    <span className="text-blue-600 italic">Preparation.</span>
                  </h2>
                  <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-md">
                    Advanced clinical drills in Fixed Prosthodontics. Train your eyes, test your knowledge, and earn your Boss status.
                  </p>
                  
                  {/* Bot Section with Arabic welcome message */}
                  <div className="pt-6">
                    <div className="flex items-start space-x-5">
                      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0">
                         <Ghost className="w-7 h-7 animate-bounce" />
                      </div>
                      <div className="bg-[#F1F5F9] border-2 border-white p-6 rounded-3xl rounded-tl-none shadow-xl max-w-md">
                        <p className="arabic-text text-blue-900 font-bold text-xl md:text-2xl leading-relaxed text-right">
                          {typedMessage}
                          {showBoss && <span className="block mt-2 text-5xl font-black tracking-tighter text-blue-600 animate-in zoom-in slide-in-from-bottom duration-500 underline decoration-blue-100 underline-offset-8">Boss</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                   {[
                     { label: 'YOUR XP', val: xp, icon: Zap, color: 'text-blue-500' },
                     { label: 'RANK', val: currentLevel, icon: Star, color: 'text-yellow-500' },
                     { label: 'STREAK', val: maxStreak, icon: Flame, color: 'text-orange-500' },
                     { label: 'MODULES', val: '8/8', icon: Award, color: 'text-purple-500' }
                   ].map((stat, i) => (
                     <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-white shadow-inner flex flex-col items-center group hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500">
                        <div className="p-3 bg-white rounded-2xl shadow-sm mb-4 transition-transform group-hover:rotate-12">
                          <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <span className="text-3xl font-black text-slate-800 tracking-tight">{stat.val}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{stat.label}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {QUIZZES.map((quiz, idx) => (
                <div 
                  key={quiz.id} 
                  className="group bg-white rounded-[2.5rem] p-10 border-2 border-transparent hover:border-blue-400 hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col relative overflow-hidden transform hover:-translate-y-4"
                  onClick={() => handleStartQuiz(quiz)}
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-6">
                    {quiz.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors leading-tight">{quiz.title}</h3>
                  <p className="text-sm text-slate-400 flex-grow font-semibold leading-relaxed mb-10">{quiz.description}</p>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                    <span className="text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase">{quiz.isExternal ? 'OPEN PORTAL' : 'BEGIN DRILL'}</span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'quiz' && activeQuiz?.questions && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom duration-500">
            {/* Question Tools */}
            <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <button onClick={goHome} className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-slate-50 border-2 border-slate-100 shadow-sm transition-all flex items-center group">
                <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" /> TERMINATE
              </button>

              <div className="flex items-center space-x-4">
                 <button onClick={use5050} disabled={powerUps.hints === 0 || feedback !== null || eliminatedIndices.length > 0} className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-black text-sm border-2 transition-all shadow-sm ${powerUps.hints > 0 ? 'bg-blue-50 border-blue-200 text-blue-700 hover:scale-105 active:scale-95' : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'}`}>
                   <Brain className="w-5 h-5" /> <span>50/50 ({powerUps.hints})</span>
                 </button>
                 <button onClick={useFreeze} disabled={powerUps.freezes === 0 || feedback !== null || isFrozen} className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-black text-sm border-2 transition-all shadow-sm ${powerUps.freezes > 0 ? 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:scale-105 active:scale-95' : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'}`}>
                   <Clock className="w-5 h-5" /> <span>FREEZE ({powerUps.freezes})</span>
                 </button>
              </div>
            </div>

            {/* Question Stage */}
            <div className={`relative bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(30,58,138,0.2)] border-4 transition-all duration-300 ${feedback === 'correct' ? 'border-green-400 correct-glow' : feedback === 'wrong' ? 'border-red-400 shake' : 'border-white'}`}>
              
              {/* Message Overlay */}
              {messageToast && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-10 py-4 rounded-3xl font-black text-lg shadow-2xl z-30 animate-in slide-in-from-top-12 fade-in duration-300">
                  {messageToast}
                </div>
              )}

              {/* Fire Progress Bar */}
              <div className="h-3 w-full bg-slate-100 relative">
                <div 
                  className={`h-full transition-all duration-1000 ease-linear ${timeLeft < 10 ? 'fire-timer' : 'bg-blue-600'}`} 
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                ></div>
                {isFrozen && <div className="absolute inset-0 bg-cyan-400/30 backdrop-blur-[1px] flex items-center justify-center font-black text-white text-xs tracking-widest uppercase">System Frozen</div>}
              </div>
              
              <div className="p-10 md:p-16 relative">
                {/* Floating XP Gain */}
                {xpGain && <div className="absolute top-6 right-6 text-4xl font-black text-green-500 xp-float">+{xpGain} XP</div>}

                <div className="flex items-center space-x-4 mb-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${currentIndex >= activeQuiz.questions.length - 5 ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white'}`}>
                    {currentIndex >= activeQuiz.questions.length - 5 ? <Skull className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${currentIndex >= activeQuiz.questions.length - 5 ? 'text-red-600' : 'text-blue-600'}`}>
                      {currentIndex >= activeQuiz.questions.length - 5 ? 'BOSS BATTLE: THE FINAL 5' : 'Clinical Simulation Phase'}
                    </span>
                    <span className="text-slate-400 text-[10px] font-bold">Module: {activeQuiz.title}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-12 tracking-tight leading-tight">
                  {activeQuiz.questions[currentIndex].text}
                </h3>
                
                <div className="grid grid-cols-1 gap-5">
                  {activeQuiz.questions[currentIndex].options.map((option, idx) => {
                    const letter = option.split(')')[0].trim().toUpperCase();
                    const isEliminated = eliminatedIndices.includes(idx);
                    const isUserCorrect = feedback === 'correct' && activeQuiz.questions[currentIndex].answer === letter;
                    const isShownCorrect = feedback === 'wrong' && activeQuiz.questions[currentIndex].answer === letter;

                    return (
                      <button
                        key={idx}
                        disabled={feedback !== null || isEliminated}
                        onClick={() => handleSelectAnswer(letter)}
                        className={`w-full text-left p-8 rounded-3xl border-4 transition-all duration-300 flex items-center group relative overflow-hidden ${
                          isEliminated ? 'opacity-20 grayscale pointer-events-none scale-95' :
                          isUserCorrect ? 'border-green-500 bg-green-50 scale-[1.02] shadow-xl' :
                          isShownCorrect ? 'border-green-500 bg-green-50/50 border-dashed' :
                          'border-slate-50 bg-slate-50/50 hover:border-blue-600 hover:bg-white active:scale-[0.98]'
                        }`}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-8 font-black text-2xl transition-all duration-500 shadow-sm ${
                          isUserCorrect ? 'bg-green-500 text-white rotate-[360deg]' :
                          'bg-white text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6'
                        }`}>
                          {letter}
                        </div>
                        <span className={`text-xl font-bold ${isUserCorrect ? 'text-green-900' : 'text-slate-700'}`}>
                          {option.includes(')') ? option.split(')')[1].trim() : option}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-10 border-t border-slate-100 pt-10">
                   <div className="flex flex-col items-center md:items-start">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Simulation Status</span>
                     <div className="flex space-x-1.5">
                        {activeQuiz.questions.map((_, i) => (
                          <div key={i} className={`h-2 w-5 rounded-full transition-all duration-500 ${i < currentIndex ? 'bg-blue-600' : i === currentIndex ? 'bg-blue-300 animate-pulse w-8' : 'bg-slate-100'}`}></div>
                        ))}
                     </div>
                   </div>
                   <div className="flex items-center space-x-10">
                      <div className="text-right">
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Seconds</span>
                        <span className={`text-4xl font-black tabular-nums ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-slate-900'}`}>{timeLeft}</span>
                      </div>
                      <div className="h-12 w-px bg-slate-200"></div>
                      <div className="text-right">
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score</span>
                        <span className="text-4xl font-black text-blue-600 tabular-nums">{score}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'result' && activeQuiz && (
          <div className="max-w-4xl mx-auto animate-in zoom-in duration-700">
            <div className="bg-white rounded-[4rem] shadow-[0_50px_100px_-25px_rgba(0,0,0,0.1)] overflow-hidden border-4 border-white">
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 p-24 text-center text-white relative">
                <Trophy className="w-32 h-32 mx-auto mb-10 text-yellow-400 animate-bounce" />
                <h2 className="text-6xl font-black mb-4 tracking-tighter uppercase">Legendary Finish!</h2>
                <p className="text-blue-200 font-bold text-xl uppercase tracking-widest opacity-80">{activeQuiz.title}</p>
                <div className="mt-12 inline-flex items-center space-x-6 bg-white/10 px-10 py-5 rounded-[2.5rem] backdrop-blur-xl border border-white/20">
                   <Zap className="w-8 h-8 text-yellow-300 fill-current" />
                   <span className="text-3xl font-black tracking-tighter">+{score * 25} ACADEMY XP</span>
                </div>
              </div>
              
              <div className="p-16 text-center bg-slate-50/30">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                  {[
                    { l: 'CORRECT', v: `${score}/${activeQuiz.questions?.length}`, c: 'text-slate-900' },
                    { l: 'ACCURACY', v: `${Math.round((score / (activeQuiz.questions?.length || 1)) * 100)}%`, c: 'text-blue-600' },
                    { l: 'PEAK STREAK', v: maxStreak, c: 'text-orange-500' },
                    { l: 'ACADEMY LVL', v: currentLevel, c: 'text-purple-600' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border-2 border-white flex flex-col items-center shadow-lg shadow-blue-50/50">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{stat.l}</span>
                      <p className={`text-4xl font-black tracking-tighter ${stat.c}`}>{stat.v}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <button onClick={() => handleStartQuiz(activeQuiz)} className="w-full md:w-auto px-16 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-2xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-200">TRY AGAIN</button>
                  <button onClick={goHome} className="w-full md:w-auto px-16 py-6 bg-white text-slate-600 rounded-[2rem] font-black text-2xl hover:bg-slate-50 border-2 border-slate-200 transition-all">DASHBOARD</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Signature Footer */}
      <footer className="py-24 text-center">
        <div className="flex justify-center items-center space-x-4 mb-6 group cursor-pointer" onClick={goHome}>
          <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-white font-black text-2xl group-hover:bg-blue-600 transition-all shadow-xl">B</div>
          <span className="text-4xl font-black text-slate-900 tracking-tighter uppercase group-hover:text-blue-600 transition-colors">Boss</span>
        </div>
        <p className="text-slate-400 font-bold uppercase tracking-[0.5em] text-[12px] mb-12">Clinical Prosthodontics Mastery Platform</p>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] border-t-2 border-slate-100 pt-16 max-w-2xl mx-auto">
          <span>&copy; ACADEMY 2025</span>
          <span className="hidden md:inline w-2 h-2 bg-slate-200 rounded-full"></span>
          <span>OFFLINE READY ENGINE</span>
          <span className="hidden md:inline w-2 h-2 bg-slate-200 rounded-full"></span>
          <span>DESIGNED BY THE BOSS</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
