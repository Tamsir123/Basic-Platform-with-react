"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { NumberTicker } from "@/components/magicui/number-ticker"
import {
  User,
  UserRound,
  School,
  BookOpen,
  GraduationCap,
  Sparkles,
} from "lucide-react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { GlareCard } from "@/components/ui/glare-card"

// Création d'une fonction réutilisable pour les effets de lumière 3D
const useGlowEffect = (motionValue: MotionValue<number>, intensity: number = 1) => {
  return useTransform(
    motionValue,
    [0, 0.5, 1],
    [
      `0px ${6 * intensity}px ${30 * intensity}px rgba(34, 197, 94, 0.1)`,
      `0px ${12 * intensity}px ${50 * intensity}px rgba(20, 184, 166, 0.25)`,
      `0px ${6 * intensity}px ${30 * intensity}px rgba(34, 197, 94, 0.1)`,
    ]
  )
}

const BlurredCircle = ({ size, color, top, left, delay = 0, duration = 10 }: { 
  size: number,
  color: string, 
  top: string, 
  left: string, 
  delay?: number, 
  duration?: number 
}) => (
  <motion.div
    className="absolute rounded-full opacity-30 blur-3xl"
    style={{
      width: size,
      height: size,
      top,
      left,
      background: color,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.3, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
)

// Floating particles animation
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-green-500 opacity-10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            duration: 3 + Math.random() * 5,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

// Enhanced GlareCard counter component
const GlareCardCounter = ({
  label,
  value,
  icon,
  delay,
  description,
  percentage,
  percentageLabel,
  gradient,
  accentColor,
  glowColor,
  featured = false,
}: {
  label: string
  value: number
  icon: React.ReactNode
  delay: number
  description: string
  percentage: number
  percentageLabel: string
  gradient: string
  accentColor: "green" | "emerald" | "teal"
  glowColor: string
  featured?: boolean
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Enhanced animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay,
        ease: "easeOut",
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: delay + 0.3,
        type: "spring",
        stiffness: 200,
      },
    },
  }

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: `${percentage}%`,
      transition: {
        duration: 1.2,
        delay: delay + 0.8,
        ease: "easeOut",
      },
    },
  }

  const glowVariants = {
    initial: { boxShadow: "0 0 0 rgba(16, 185, 129, 0)" },
    hover: { 
      boxShadow: `0 0 30px ${glowColor}`,
      transition: { duration: 0.5 } 
    }
  }

  const accentColorMap = {
    green: {
      badge: "bg-green-400",
      textHighlight: "text-green-400",
      ring: "ring-green-500",
      iconBg: "bg-green-950",
      progressBar: "from-green-400 to-green-300",
    },
    emerald: {
      badge: "bg-emerald-400",
      textHighlight: "text-emerald-400",
      ring: "ring-emerald-500",
      iconBg: "bg-emerald-950",
      progressBar: "from-emerald-400 to-emerald-300",
    },
    teal: {
      badge: "bg-teal-400",
      textHighlight: "text-teal-400",
      ring: "ring-teal-500",
      iconBg: "bg-teal-950",
      progressBar: "from-teal-400 to-teal-300",
    },
  }

  return (
    <motion.div
      ref={counterRef}
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        variants={glowVariants}
        animate={isHovered ? "hover" : "initial"}
        className="h-full rounded-2xl overflow-hidden"
      >
        <GlareCard className={`h-full bg-gradient-to-br ${gradient}`}>
          {featured && (
            <div className={`absolute -top-1 -right-1 ${accentColorMap[accentColor].badge} text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg`}>
              Mis en avant
            </div>
          )}
          <div className="p-6 relative">
            <div className="absolute top-4 right-4 opacity-20">
              <GraduationCap size={40} className="text-white" />
            </div>
            <h3 className="text-center text-2xl font-bold text-white">{label}</h3>
          </div>

          <div className="p-8 flex flex-col items-center flex-grow">
            <motion.div
              className={`mb-6 p-4 rounded-full ${accentColorMap[accentColor].iconBg} shadow-inner ${accentColorMap[accentColor].ring} ring-1 ring-opacity-50 text-white flex items-center justify-center`}
              variants={iconVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {icon}
            </motion.div>

            <div className="text-center mb-6">
              {isVisible ? (
                <NumberTicker value={value} className={`text-5xl font-extrabold ${accentColorMap[accentColor].textHighlight}`} />
              ) : (
                <div className="text-5xl font-bold text-white">0</div>
              )}
              <p className="text-gray-200 mt-2 text-sm">{description}</p>
            </div>

            <div className="w-full mt-auto">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-200">{percentageLabel}</span>
                <span className={`font-medium ${accentColorMap[accentColor].textHighlight}`}>{percentage}%</span>
              </div>
              <div className="h-3 w-full bg-black/20 backdrop-blur-sm rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${accentColorMap[accentColor].progressBar} rounded-full`}
                  variants={progressVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                />
              </div>
            </div>
          </div>
        </GlareCard>
      </motion.div>
    </motion.div>
  )
}

type CounterSectionProps = {
  boys?: number
  girls?: number
  targetTotal?: number
  yearProgress?: number
}

const CounterSection = ({ boys = 186, girls = 90, targetTotal = 300, yearProgress = 65 }: CounterSectionProps) => {
  const total = boys + girls
  const percentageBoys = Math.round((boys / total) * 100)
  const percentageGirls = Math.round((girls / total) * 100)
  const percentageOfTarget = Math.round((total / targetTotal) * 100)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const boxShadow = useGlowEffect(scrollYProgress, 1.5)

  // Animated background patterns
  const patternVariants = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative max-w-6xl mx-auto p-8 md:p-12 rounded-3xl overflow-hidden bg-gradient-to-br from-black/5 to-black/10 backdrop-blur-sm"
      style={{ boxShadow }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5 z-0"></div>
      
      {/* Glowing background orbs */}
      <BlurredCircle size={300} color="radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(16,185,129,0.05) 70%)" top="-5%" left="15%" delay={0} />
      <BlurredCircle size={400} color="radial-gradient(circle, rgba(20,184,166,0.3) 0%, rgba(16,185,129,0.05) 70%)" top="40%" left="80%" delay={2} />
      <BlurredCircle size={200} color="radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(34,197,94,0.05) 70%)" top="80%" left="10%" delay={4} />

      {/* Decorative elements */}
      <div className="absolute top-12 left-12 opacity-3 text-green-600 transform -rotate-12">
        <BookOpen size={180} />
      </div>
      <div className="absolute bottom-12 right-12 opacity-3 text-teal-600 transform rotate-12">
        <GraduationCap size={180} />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Header with enhanced animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-16 relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-block mb-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-500/10 to-teal-500/10 backdrop-blur-md text-sm font-medium border border-green-500/20"
        >
          <Sparkles className="inline-block mr-2 h-4 w-4 text-green-400" /> 
          <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent font-semibold">
            Statistiques en temps réel
          </span>
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 tracking-tighter">
          Statistiques des Étudiants
        </h2>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Visualisation dynamique des inscriptions à 2iE pour l'année académique en cours
          </p>
        </motion.div>
      </motion.div>

      {/* Main stats cards using GlareCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10">
        <GlareCardCounter
          label="Garçons"
          value={boys}
          icon={<User className="h-10 w-10" />}
          delay={0}
          description="Élèves masculins inscrits"
          percentage={percentageBoys}
          percentageLabel="du total des étudiants"
          gradient="from-emerald-900/90 to-green-950/90"
          accentColor="emerald"
          glowColor="rgba(16, 185, 129, 0.3)"
        />

        <GlareCardCounter
          label="Filles"
          value={girls}
          icon={<UserRound className="h-10 w-10" />}
          delay={0.2}
          description="Élèves féminines inscrites"
          percentage={percentageGirls}
          percentageLabel="du total des étudiants"
          gradient="from-teal-900/90 to-teal-950/90"
          accentColor="teal"
          glowColor="rgba(20, 184, 166, 0.3)"
        />

        <GlareCardCounter
          label="Total Étudiants"
          value={total}
          icon={<School className="h-10 w-10" />}
          delay={0.4}
          description="Nombre total d'élèves"
          percentage={percentageOfTarget}
          percentageLabel={`de l'objectif (${targetTotal})`}
          gradient="from-green-900/90 via-emerald-900/90 to-teal-950/90"
          accentColor="green"
          glowColor="rgba(34, 197, 94, 0.3)"
          featured={true}
        />
      </div>
    </motion.div>
  )
}

export default CounterSection