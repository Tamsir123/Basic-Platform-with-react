'use client';

import { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
};

export default function Toast({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Styles basés sur le type
  const styles = {
    success: {
      bg: 'bg-green-100',
      border: 'border-green-500',
      text: 'text-green-700',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      )
    },
    error: {
      bg: 'bg-red-100',
      border: 'border-red-500',
      text: 'text-red-700',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      )
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-500',
      text: 'text-yellow-700',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      )
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-500',
      text: 'text-blue-700',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    }
  };

  const style = styles[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // Attendez la fin de l'animation avant d'appeler onClose
      }
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed top-4 right-4 ${style.bg} border-l-4 ${style.border} ${style.text} p-4 rounded shadow-lg z-50 animate-fade-in`}
      style={{
        animation: isVisible ? 'fadeIn 0.3s ease-in' : 'fadeOut 0.3s ease-out',
      }}
    >
      <div className="flex items-center">
        <div className="mr-2">
          {style.icon}
        </div>
        <p>{message}</p>
        <button 
          onClick={() => {
            setIsVisible(false);
            if (onClose) {
              setTimeout(onClose, 300);
            }
          }} 
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

// Styles CSS pour les animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in;
  }
`;
document.head.appendChild(styleSheet);
