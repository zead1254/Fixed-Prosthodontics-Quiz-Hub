
import React from 'react';

const DentalToolIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a2.25 2.25 0 01-2.244-2.4 3 3 0 00-1.128-5.78m-1.62.024a15.998 15.998 0 01-3.385 1.62m6.66 0a2.25 2.25 0 002.4-2.244 3 3 0 00-5.78-1.128 2.25 2.25 0 01-2.245-2.4 4.5 4.5 0 00-2.245 8.4 2.25 2.25 0 012.245 2.4m-1.62-.024a15.998 15.998 0 001.622 3.385m-5.043-.025a15.998 15.998 0 013.388-1.622" />
  </svg>
);

const CrownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
    </svg>
);

const ToothIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
  </svg>
);


const icons = [
  { Icon: DentalToolIcon, size: 'w-16 h-16', top: '10%', left: '15%', delay: '0s', duration: '8s' },
  { Icon: CrownIcon, size: 'w-12 h-12', top: '20%', left: '80%', delay: '1s', duration: '6s' },
  { Icon: ToothIcon, size: 'w-20 h-20', top: '60%', left: '5%', delay: '2s', duration: '10s' },
  { Icon: DentalToolIcon, size: 'w-10 h-10', top: '80%', left: '30%', delay: '3s', duration: '7s' },
  { Icon: CrownIcon, size: 'w-24 h-24', top: '75%', left: '90%', delay: '0.5s', duration: '12s' },
  { Icon: ToothIcon, size: 'w-14 h-14', top: '40%', left: '50%', delay: '1.5s', duration: '5s' },
];

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {icons.map((item, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{
            top: item.top,
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          <item.Icon className={`${item.size} text-blue-500/10`} />
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
