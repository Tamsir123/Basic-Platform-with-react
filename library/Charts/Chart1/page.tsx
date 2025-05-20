"use client";

import { useState, useEffect } from "react"
import { TrendingUp, BookOpen, GraduationCap } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Données adaptées pour montrer la répartition des étudiants
const studentData = [
  { program: "Génie Civil", garcons: 42, filles: 18 },
  { program: "Hydraulique", garcons: 38, filles: 15 },
  { program: "Électrique", garcons: 25, filles: 12 },
  { program: "Environnement", garcons: 18, filles: 22 },
  { program: "Énergétique", garcons: 35, filles: 9 },
  { program: "Informatique", garcons: 28, filles: 14 },
]

const chartConfig = {
  garcons: {
    label: "Garçons",
    color: "hsl(142, 71%, 45%)", // vert similaire à from-green-500
  },
  filles: {
    label: "Filles",
    color: "hsl(168, 84%, 39%)", // teal similaire à from-teal-500
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export default function StudentProgramChart() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  // Calculer le total d'étudiants
  const totalEtudiants = studentData.reduce((sum, program) => 
    sum + program.garcons + program.filles, 0);
  
  // Calculer le pourcentage d'atteinte de l'objectif
  const objectifEtudiants = 150;
  const pourcentageObjectif = Math.round((totalEtudiants / objectifEtudiants) * 100);

  return (
    <Card className="overflow-hidden shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 relative">
        <div className="absolute top-2 right-2 opacity-20">
          <GraduationCap size={40} />
        </div>
        <CardTitle className="flex items-center text-xl font-bold">
          <BookOpen className="mr-2 h-5 w-5" /> Répartition par Filière
        </CardTitle>
        <CardDescription className="text-green-50">
          Année académique 2024-2025
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-gradient-to-b from-white to-green-50">
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={studentData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
              barGap={8}
              onMouseMove={(e) => {
                if (e.activeTooltipIndex !== undefined) {
                  setHoveredBar(e.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="program" 
                tick={{ fill: '#374151', fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(value) => `${value}`}
              />
              <ChartTooltip
                cursor={{ fill: 'rgba(0, 128, 128, 0.1)' }}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="garcons"
                fill="var(--color-garcons)"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                isAnimationActive={true}
              >
                <LabelList
                  dataKey="garcons"
                  position="top"
                  fill="#22c55e"
                  fontSize={11}
                  fontWeight="bold"
                  formatter={(value) => `${value}`}
                />
              </Bar>
              <Bar
                dataKey="filles"
                fill="var(--color-filles)"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={300}
                isAnimationActive={true}
              >
                <LabelList
                  dataKey="filles"
                  position="top"
                  fill="#14b8a6"
                  fontSize={11}
                  fontWeight="bold"
                  formatter={(value) => `${value}`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm p-6 bg-white border-t border-green-100">
        <div className="flex justify-between w-full">
          <div className="flex gap-2 font-medium text-green-700 items-center">
            <TrendingUp className="h-4 w-4" />
            {pourcentageObjectif}% de l&apos;objectif atteint
          </div>
          <div className="font-bold text-teal-600">
            Total: {totalEtudiants} étudiants
          </div>
        </div>
        <div className="w-full mt-2">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-teal-600 rounded-full"
              style={{ width: `${pourcentageObjectif}%` }}
            />
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Objectif: {objectifEtudiants} étudiants pour l&apos;année académique
        </div>
      </CardFooter>
    </Card>
  );
}