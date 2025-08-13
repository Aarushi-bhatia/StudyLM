import { useState } from "react";

const SunMoonToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const handleToggle = (e) => {
    setIsDark(!isDark);
    
    // Enhanced click sparkle effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // for(let i = 0; i < 6; i++) {
    //   const sparkle = document.createElement('div');
    //   sparkle.style.position = 'absolute';
    //   sparkle.style.left = (x + Math.random() * 20 - 10) + 'px';
    //   sparkle.style.top = (y + Math.random() * 20 - 10) + 'px';
    //   sparkle.style.width = '6px';
    //   sparkle.style.height = '6px';
    //   sparkle.style.background = isDark ? 
    //     `radial-gradient(circle, #ffd700, #ff8c00)` : 
    //     `radial-gradient(circle, #e6e6fa, #d8bfd8)`;
    //   sparkle.style.borderRadius = '50%';
    //   sparkle.style.pointerEvents = 'none';
    //   sparkle.style.zIndex = '1000';
      
    //   const angle = (i / 6) * Math.PI * 2;
    //   const distance = 30 + Math.random() * 20;
    //   const endX = x + Math.cos(angle) * distance;
    //   const endY = y + Math.sin(angle) * distance;
      
    //   sparkle.style.animation = `sparkleOut 0.8s ease-out forwards`;
    //   sparkle.style.setProperty('--endX', endX + 'px');
    //   sparkle.style.setProperty('--endY', endY + 'px');
      
    //   e.currentTarget.appendChild(sparkle);
      
    //   setTimeout(() => sparkle.remove(), 800);
    // }
  };

  return (
    <div className="flex items-center justify-center font-sans transition-all duration-500">
      
      {/* Floating particles */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30 animate-bounce" 
             style={{ top: '20%', left: '10%', animationDelay: '0s', animationDuration: '6s' }} />
        <div className="absolute w-1.5 h-1.5 bg-pink-300 rounded-full opacity-30 animate-bounce" 
             style={{ top: '60%', left: '80%', animationDelay: '2s', animationDuration: '6s' }} />
        <div className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-bounce" 
             style={{ top: '30%', left: '70%', animationDelay: '4s', animationDuration: '6s' }} />
      </div> */}

      <div className="relative p-5">
        <button
          onClick={handleToggle}
          className={`relative w-24 h-10 rounded-full border cursor-pointer overflow-visible transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl active:translate-y-0 ${
            isDark
              ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-purple-400/30 shadow-2xl'
              : 'bg-gradient-to-br from-white/90 to-purple-50/80 border-white/20 shadow-xl'
          }`}
          style={{
            backdropFilter: 'blur(20px)',
            boxShadow: isDark 
              ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 8px 32px rgba(31,38,135,0.15), inset 0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          {/* Background stars for dark mode */}
          <div className={`absolute inset-0 transition-opacity duration-600 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white animate-pulse"
                style={{
                  width: `${3 + Math.random() * 3}px`,
                  height: `${3 + Math.random() * 3}px`,
                  top: `${15 + Math.random() * 50}%`,
                  left: `${20 + Math.random() * 60}%`,
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>

          {/* Toggle slider */}
          <div className={`absolute top-1 left-1 w-8 h-8 rounded-full transition-all duration-600 flex items-center justify-center ${
            isDark ? 'translate-x-12' : 'translate-x-0'
          }`} style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            
            {/* Sun container */}
            <div className={`relative w-full h-full flex items-center justify-center transition-all duration-400 ${
              isDark ? 'opacity-0 scale-[0.3] rotate-180' : 'opacity-100 scale-100 rotate-0'
            }`}>
              <div 
                className="relative w-6 h-6 rounded-full animate-pulse"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #fff700, #ffed4a 40%, #ff8c00 70%, #ff6b35 100%)',
                  boxShadow: '0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.4), 0 0 60px rgba(255,140,0,0.2), inset 2px 2px 4px rgba(255,255,255,0.3)',
                  animationDuration: '3s'
                }}
              >
               
                
                {/* Sun glow */}
                <div 
                  className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    animationDuration: '2s'
                  }}
                />
              </div>
            </div>

            {/* Moon container */}
            <div className={`absolute w-full h-full flex items-center justify-center transition-all duration-400 ${
              isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-[0.3] -rotate-180'
            }`}>
              <div 
                className="relative w-6 h-6 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 25% 25%, #f8f8ff, #e6e6fa 50%, #d8bfd8 100%)',
                  boxShadow: '0 0 20px rgba(230,230,250,0.6), 0 0 40px rgba(230,230,250,0.3), inset 2px 2px 4px rgba(255,255,255,0.4), inset -3px -3px 6px rgba(160,160,190,0.3)'
                }}
              >
                {/* Moon craters */}
                <div 
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: 'rgba(200,200,220,0.4)',
                    boxShadow: 'inset 1px 1px 2px rgba(160,160,190,0.5)',
                    top: '12px',
                    left: '10px'
                  }}
                />
                <div 
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: 'rgba(200,200,220,0.4)',
                    boxShadow: 'inset 1px 1px 2px rgba(160,160,190,0.5)',
                    top: '22px',
                    left: '22px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Magical glow ring on hover */}
          {/* <div 
            className="absolute -inset-1 rounded-full opacity-0 hover:opacity-60 transition-opacity duration-300 -z-10"
            style={{
              background: 'conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #ff6b6b)',
              animation: 'spin 3s linear infinite'
            }}
          /> */}
        </button> 
      </div>

      {/* Custom styles for animations */}
      {/* <style jsx>{`
        @keyframes sparkleOut {
          0% { 
            transform: scale(0) rotate(0deg); 
            opacity: 1; 
          }
          70% {
            opacity: 1;
          }
          100% { 
            transform: scale(1.5) rotate(180deg) translate(var(--endX, 0), var(--endY, 0)); 
            opacity: 0; 
          }
        }
      `}</style> */}
    </div>
  );
};

export default SunMoonToggle;