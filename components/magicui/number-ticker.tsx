"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface NumberTickerProps {
  value: number
  className?: string
  duration?: number
}

export const NumberTicker: React.FC<NumberTickerProps> = ({ value, className = "", duration = 1 }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const animationDuration = duration * 1000
    const frameDuration = 17
    const totalFrames = Math.round(animationDuration / frameDuration)
    const increment = (value - displayValue) / totalFrames

    let currentFrame = 0
    const intervalId = setInterval(() => {
      currentFrame++
      const nextValue = displayValue + increment

      if (
        (increment > 0 && nextValue >= value) ||
        (increment < 0 && nextValue <= value) ||
        currentFrame >= totalFrames
      ) {
        setDisplayValue(value)
        clearInterval(intervalId)
      } else {
        setDisplayValue(nextValue)
      }
    }, frameDuration)

    return () => clearInterval(intervalId)
  }, [value, displayValue, duration])

  return <motion.span className={className}>{Math.round(displayValue)}</motion.span>
}

