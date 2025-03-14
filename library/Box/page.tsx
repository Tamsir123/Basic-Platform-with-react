"use client";

import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { useState, useEffect } from "react";

export function BoxRevealDemo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    // Initial animation sequence
    setIsLoaded(true);
    
    // Create additional animation for background particles
    const interval = setInterval(() => {
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        (particle as HTMLElement).style.transform = `translate(${randomX}px, ${randomY}px)`;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative size-full max-w-lg mx-auto flex flex-col items-center justify-center overflow-hidden pt-12 pb-16 px-4">
      {/* Animated morphing background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 opacity-80 transition-all duration-2000 ${isLoaded ? 'opacity-80' : 'opacity-0'}`}></div>
      
      {/* Animated particle effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className={`particle absolute rounded-full bg-gradient-to-br from-teal-300 to-blue-300 opacity-20 transition-all duration-2000 ${isLoaded ? 'scale-100' : 'scale-0'}`}
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transitionDelay: `${Math.random() * 0.5}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Animated floating elements with glow effect */}
      <div className={`absolute top-10 right-10 w-16 h-16 rounded-full bg-teal-400 opacity-20 blur-md transition-all duration-1500 ${isLoaded ? 'scale-100' : 'scale-0'}`}
           style={{
             animation: 'pulse 7s infinite alternate'
           }}></div>
      <div className={`absolute bottom-20 left-10 w-12 h-12 rounded-full bg-blue-400 opacity-20 blur-md transition-all duration-1500 delay-300 ${isLoaded ? 'scale-100' : 'scale-0'}`}
           style={{
             animation: 'pulse 5s infinite alternate-reverse'
           }}></div>
      <div className={`absolute top-40 left-10 w-10 h-10 rounded-full bg-emerald-400 opacity-20 blur-md transition-all duration-1500 delay-600 ${isLoaded ? 'scale-100' : 'scale-0'}`}
           style={{
             animation: 'pulse 6s infinite alternate'
           }}></div>
      
      {/* Main content with reveal animations */}
      <div className="relative z-10 text-center">
        <BoxReveal boxColor={"#0f766e"} duration={0.6}>
          <p className="text-[3.8rem] font-bold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
            EduManager<span className="text-[#0f766e]">.</span>
          </p>
        </BoxReveal>

        <BoxReveal boxColor={"#0f766e"} duration={0.6} >
          <h2 className="mt-3 text-[1.25rem] font-medium text-gray-700">
            Plateforme innovante de{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">Gestion des Étudiants</span>
          </h2>
        </BoxReveal>

        <BoxReveal boxColor={"#0f766e"} duration={0.6}>
          <div className="mt-6 px-2">
            <p className="text-gray-600 leading-relaxed">
              <span className="inline-flex items-center">
                <span className="relative overflow-hidden">
                --&gt; Gérez efficacement les{" "}
                  <span className="font-semibold text-teal-600 mx-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600 after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">inscriptions</span>,
                  <span className="font-semibold text-teal-600 mx-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600 after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">présences</span>,
                  <span className="font-semibold text-teal-600 mx-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600 after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">notes</span>,
                  et
                  <span className="font-semibold text-teal-600 mx-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600 after:transform after:scale-x-0 after:hover:scale-x-100 after:transition-transform after:duration-300">dossiers</span>.
                </span>
              </span>
              <br />
              <span className="inline-flex items-center mt-2">
                --&gt;  Interface intuitive avec analyses avancées en temps réel.
              </span>
            </p>
          </div>
        </BoxReveal>

        <BoxReveal boxColor={"#0f766e"} duration={0.5}>
          <div className="mt-10 flex gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 px-8 py-2 rounded-full font-medium text-sm transition-all duration-300 shadow-lg shadow-teal-200/50 transform hover:scale-105"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="relative inline-block">
                Découvrir
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 origin-left" 
                      style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }}></span>
              </span>
            </Button>
            <Button 
              className="bg-white/80 backdrop-blur-sm text-teal-600 border border-teal-600/30 hover:bg-teal-50 px-8 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="relative inline-block">
                En savoir plus
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 transform scale-x-0 transition-transform duration-300 origin-left"
                      style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }}></span>
              </span>
            </Button>
          </div>
        </BoxReveal>
      </div>

      {/* Add pulsating animation to CSS */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1) translate(0px, 0px);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2) translate(10px, -10px);
            opacity: 0.3;
          }
          100% {
            transform: scale(1) translate(0px, 0px);
            opacity: 0.2;
          }
        }
        
        .particle {
          animation: float 10s infinite ease-in-out;
        }
        
        @keyframes float {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(10px, 10px); }
          100% { transform: translate(0px, 0px); }
        }
      `}</style>
    </div>
  );
}