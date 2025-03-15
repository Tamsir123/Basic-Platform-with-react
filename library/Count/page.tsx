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
  BarChartIcon as ChartBar,
  PieChart,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

type CounterSectionProps = {
  boys?: number
  girls?: number
  targetTotal?: number
  yearProgress?: number
}

  const CounterSection = ({ boys =186, girls = 90, targetTotal = boys+girls , yearProgress = 65 }: CounterSectionProps) => {
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
      className="relative max-w-6xl mx-auto p-8 md:p-12 rounded-2xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 z-0"
        style={{ opacity: backgroundOpacity }}
        variants={patternVariants}
        animate="animate"
      />

      {/* Decorative elements */}
      <div className="absolute top-12 left-12 opacity-5 text-green-600 transform -rotate-12">
        <BookOpen size={180} />
      </div>
      <div className="absolute bottom-12 right-12 opacity-5 text-teal-600 transform rotate-12">
        <GraduationCap size={180} />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Header with enhanced animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-12 relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-block mb-3 p-2 px-4 rounded-full bg-green-100 text-green-800 text-sm font-medium"
        >
          <TrendingUp className="inline-block mr-1 h-4 w-4" /> Statistiques en temps réel
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-teal-500 to-green-500">
          Statistiques des Étudiants
        </h2>

        <motion.p
          className="text-gray-600 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Visualisation dynamique des inscriptions à 2iE pour l&apos;année académique en cours
        </motion.p>
      </motion.div>

      {/* Main stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 relative z-10">
        <AnimatedCounter
          label="Garçons"
          value={boys}
          icon={<User className="h-8 w-8" />}
          color="from-green-500 to-green-600"
          delay={0}
          description="Élèves masculins inscrits"
          percentage={percentageBoys}
          percentageLabel="du total des étudiants"
        />

        <AnimatedCounter
          label="Filles"
          value={girls}
          icon={<UserRound className="h-8 w-8" />}
          color="from-teal-500 to-teal-600"
          delay={0.2}
          description="Élèves féminines inscrites"
          percentage={percentageGirls}
          percentageLabel="du total des étudiants"
        />

        <AnimatedCounter
          label="Total Étudiants"
          value={total}
          icon={<School className="h-8 w-8" />}
          color="from-green-600 to-teal-600"
          delay={0.4}
          description="Nombre total d'élèves"
          percentage={percentageOfTarget}
          percentageLabel={`de l'objectif (${targetTotal})`}
        />
      </div>

      {/* Additional stats section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gender distribution chart */}
          <Card className="overflow-hidden shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6">
              <CardTitle className="flex items-center text-xl font-bold">
                <PieChart className="mr-2 h-5 w-5" /> Répartition par Genre
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <div className="flex items-center justify-center h-64">
                <GenderDistributionChart boys={boys} girls={girls} />
              </div>
            </CardContent>
          </Card>

          {/* Year progress */}
          <Card className="overflow-hidden shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-6">
              <CardTitle className="flex items-center text-xl font-bold">
                <ChartBar className="mr-2 h-5 w-5" /> Progression Annuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <div className="space-y-8 pt-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Progression de l&apos;année académique</h4>
                    <span className="font-bold text-green-600">{yearProgress}%</span>
                  </div>
                  <YearProgressBar progress={yearProgress} />
                  <p className="text-sm text-gray-500 mt-2">L&apos;année académique est complétée à {yearProgress}%</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Objectif d&apos;inscription</h4>
                    <span className="font-bold text-teal-600">{percentageOfTarget}%</span>
                  </div>
                  <EnrollmentProgressBar progress={percentageOfTarget} />
                  <p className="text-sm text-gray-500 mt-2">
                    {total} étudiants sur un objectif de {targetTotal}
                  </p>
                </div>

                <div className="pt-4 text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full">
                    <GraduationCap className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="mt-2 text-gray-600">Année académique 2023-2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Enhanced animated counter component
const AnimatedCounter = ({
  label,
  value,
  icon,
  color,
  delay,
  description,
  percentage,
  percentageLabel,
}: {
  label: string
  value: number
  icon: React.ReactNode
  color: string
  delay: number
  description: string
  percentage: number
  percentageLabel: string
}) => {
  const [isVisible, setIsVisible] = useState(false)
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
    >
      <Card className="overflow-hidden shadow-lg border border-green-100 h-full flex flex-col">
        <CardHeader className={`bg-gradient-to-r ${color} text-white p-6 relative`}>
          <div className="absolute top-0 right-0 p-3 opacity-20">
            <GraduationCap size={40} />
          </div>
          <CardTitle className="text-center text-2xl font-bold">{label}</CardTitle>
        </CardHeader>

        <CardContent className="p-8 flex flex-col items-center bg-gradient-to-b from-white to-green-50 flex-grow">
          <motion.div
            className="mb-6 p-4 rounded-full bg-green-50 shadow-inner text-teal-600 flex items-center justify-center"
            variants={iconVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {icon}
          </motion.div>

          <div className="text-center mb-6">
            {isVisible ? (
              <NumberTicker value={value} className="text-5xl font-extrabold text-gray-800" />
            ) : (
              <div className="text-5xl font-bold">0</div>
            )}
            <p className="text-gray-600 mt-2 text-sm">{description}</p>
          </div>

          <div className="w-full mt-auto">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{percentageLabel}</span>
              <span className="font-medium text-green-700">{percentage}%</span>
            </div>
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${color} rounded-full`}
                variants={progressVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Gender distribution chart component
const GenderDistributionChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const total = boys + girls
  const boysPercentage = (boys / total) * 100
  const girlsPercentage = (girls / total) * 100

  const [isVisible, setIsVisible] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

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

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={chartRef} className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Background circle */}
          <circle cx="50" cy="50" r="40" fill="#f0f9f8" />

          {/* Boys segment */}
          <AnimatePresence>
            {isVisible && (
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#22c55e"
                strokeWidth="20"
                strokeDasharray={`${boysPercentage * 2.51} ${200 - boysPercentage * 2.51}`}
                strokeDashoffset="0"
                initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* Girls segment */}
          <AnimatePresence>
            {isVisible && (
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#14b8a6"
                strokeWidth="20"
                strokeDasharray={`${girlsPercentage * 2.51} ${200 - girlsPercentage * 2.51}`}
                strokeDashoffset={`${-boysPercentage * 2.51}`}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: `${-boysPercentage * 2.51}` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
              />
            )}
          </AnimatePresence>

          {/* Inner circle */}
          <circle cx="50" cy="50" r="30" fill="white" />

          {/* Total number */}
          <text x="50" y="45" textAnchor="middle" className="text-3xl font-bold" fill="#374151">
            {total}
          </text>
          <text x="50" y="60" textAnchor="middle" className="text-xs" fill="#6b7280">
            étudiants
          </text>
        </svg>
      </div>

      <div className="flex justify-center mt-6 space-x-8">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <div>
            <p className="font-medium">Garçons</p>
            <p className="text-sm text-gray-500">
              {boys} ({Math.round(boysPercentage)}%)
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-teal-500 mr-2"></div>
          <div>
            <p className="font-medium">Filles</p>
            <p className="text-sm text-gray-500">
              {girls} ({Math.round(girlsPercentage)}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Year progress bar with animation
const YearProgressBar = ({ progress }: { progress: number }) => {
  const [isVisible, setIsVisible] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

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

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={progressRef} className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                left: ["0%", "100%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress markers */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1">
        {[0, 25, 50, 75, 100].map((marker) => (
          <div
            key={marker}
            className={cn("h-full w-0.5 bg-gray-200", marker === 0 && "hidden")}
            style={{ left: `${marker}%` }}
          />
        ))}
      </div>
    </div>
  )
}

// Enrollment progress bar
const EnrollmentProgressBar = ({ progress }: { progress: number }) => {
  const [isVisible, setIsVisible] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

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

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={progressRef} className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                left: ["0%", "100%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Target marker */}
      <div className="absolute top-0 right-0 h-full w-0.5 bg-teal-800" />
    </div>
  )
}

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
          }}
        />
      ))}
    </div>
  )
}

export default CounterSection

