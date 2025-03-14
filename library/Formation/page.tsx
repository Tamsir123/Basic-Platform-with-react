import { cn } from "@/lib/utils";
import React from "react";

/**
 * Composant OrbitingCircles qui crée une animation d'icônes orbitant autour d'un point central
 */
export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-blue-300/40 stroke-2 dark:stroke-blue-400/30"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            className={cn(
              `absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full bg-white/90 shadow-md dark:bg-slate-800/90`,
              { "[animation-direction:reverse]": reverse },
              className,
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}

/**
 * Icônes thématiques pour une plateforme de gestion d'étudiants
 */
const EducationIcons = {
  // Icône de calendrier pour la planification
  calendar: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke="#4F46E5"
        strokeWidth="2"
        fill="#EEF2FF"
      />
      <line
        x1="3"
        y1="10"
        x2="21"
        y2="10"
        stroke="#4F46E5"
        strokeWidth="2"
      />
      <line
        x1="8"
        y1="2"
        x2="8"
        y2="6"
        stroke="#4F46E5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="2"
        x2="16"
        y2="6"
        stroke="#4F46E5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="7" cy="15" r="1.5" fill="#4F46E5" />
      <circle cx="12" cy="15" r="1.5" fill="#4F46E5" />
      <circle cx="17" cy="15" r="1.5" fill="#4F46E5" />
    </svg>
  ),
  
  // Icône de diplôme/graduation
  graduation: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 16V9"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  
  // Icône de cours/livre
  courses: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 19.5V4.5C4 4.22386 4.22386 4 4.5 4H19.5C19.7761 4 20 4.22386 20 4.5V19.5C20 19.7761 19.7761 20 19.5 20H4.5C4.22386 20 4 19.7761 4 19.5Z"
        fill="#DCFCE7"
        stroke="#16A34A"
        strokeWidth="2"
      />
      <path
        d="M8 7H16"
        stroke="#16A34A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 11H16"
        stroke="#16A34A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 15H12"
        stroke="#16A34A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  
  // Icône de statistiques/résultats
  stats: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        fill="#F0F9FF"
        stroke="#0284C7"
        strokeWidth="2"
      />
      <path
        d="M8 13V17"
        stroke="#0284C7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 9V17"
        stroke="#0284C7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 6V17"
        stroke="#0284C7"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  
  // Icône de profil étudiant
  student: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="8" r="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
      <path
        d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20"
        stroke="#DC2626"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  
  // Icône de notification
  notification: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        fill="#FEF3C7"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="4" r="3" fill="#EF4444" />
    </svg>
  ),
  
  // Icône de tâches/assignments
  assignments: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
        fill="#EDE9FE"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
};

/**
 * Composant démonstratif des orbites avec les icônes éducatives
 */
export function Formation() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      {/* Groupe d'orbite externe */}
      <OrbitingCircles iconSize={48} radius={180}>
        <EducationIcons.student />
        <EducationIcons.graduation />
        <EducationIcons.courses />
        <EducationIcons.assignments />
        <EducationIcons.stats />
        <EducationIcons.notification />
      </OrbitingCircles>
      
      {/* Groupe d'orbite interne (en sens inverse) */}
      <OrbitingCircles iconSize={36} radius={100} reverse speed={1.5}>
        <EducationIcons.calendar />
        <EducationIcons.student />
        <EducationIcons.courses />
        <EducationIcons.stats />
      </OrbitingCircles>
      
      {/* Élément central (optionnel) */}
      <div className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3L20 7.5L12 12L4 7.5L12 3Z"
            fill="white"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 7.5V16.5L12 21L4 16.5V7.5"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="12"
            y1="12"
            x2="12"
            y2="21"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

// Exportation par défaut pour faciliter l'importation
export default Formation;