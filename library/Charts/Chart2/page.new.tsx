"use client"

import { useState } from "react"
import { TrendingUp, PieChart as PieChartIcon, GraduationCap, School } from "lucide-react"
import { Pie, PieChart, Label, Cell, ResponsiveContainer } from "recharts"

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

// Premier niveau (cercle intérieur)
const innerCircleData = [
  { departement: "Sciences de l'Ingénieur", etudiants: 150, fill: "#22c55e" },   // vert
  { departement: "Sciences de l'Eau", etudiants: 93, fill: "#14b8a6" },          // teal
  { departement: "Sciences de l'Energie", etudiants: 83, fill: "#10b981" },      // emeraude
]

// Deuxième niveau (cercle extérieur)
const outerCircleData = [
  { departement: "Génie Civil", etudiants: 60, fill: "#22c55e" },       // vert
  { departement: "Hydraulique", etudiants: 53, fill: "#14b8a6" },       // teal
  { departement: "Électrique", etudiants: 37, fill: "#10b981" },        // emeraude
  { departement: "Environnement", etudiants: 40, fill: "#06b6d4" },     // cyan
  { departement: "Énergétique", etudiants: 44, fill: "#0ea5e9" },       // bleu ciel
  { departement: "Informatique", etudiants: 42, fill: "#0284c7" },      // bleu
]

const chartConfig = {
  etudiants: {
    label: "Étudiants",
  },
  // Inner circle config
  "Sciences de l'Ingénieur": {
    label: "Sciences de l'Ingénieur",
    color: "hsl(142, 71%, 45%)",
  },
  "Sciences de l'Eau": {
    label: "Sciences de l'Eau",
    color: "hsl(168, 84%, 39%)",
  },
  "Sciences de l'Energie": {
    label: "Sciences de l'Energie",
    color: "hsl(152, 82%, 39%)",
  },
  // Outer circle config
  "Génie Civil": {
    label: "Génie Civil",
    color: "hsl(142, 71%, 45%)",
  },
  "Hydraulique": {
    label: "Hydraulique",
    color: "hsl(168, 84%, 39%)",
  },
  "Électrique": {
    label: "Électrique",
    color: "hsl(152, 82%, 39%)",
  },
  "Environnement": {
    label: "Environnement",
    color: "hsl(186, 94%, 43%)",
  },
  "Énergétique": {
    label: "Énergétique",
    color: "hsl(198, 93%, 48%)",
  },
  "Informatique": {
    label: "Informatique",
    color: "hsl(201, 98%, 41%)",
  },
} satisfies ChartConfig

export default function DepartementsStatsChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Calculer le total des étudiants (from outer circle for more detail)
  const totalEtudiants = outerCircleData.reduce((total, item) => total + item.etudiants, 0);
  
  // Calculer le pourcentage par rapport à l'objectif
  const objectifEtudiants = 300;
  const pourcentageObjectif = Math.round((totalEtudiants / objectifEtudiants) * 100);

  const handlePieEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(null);
  };
  
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 relative">
        <div className="absolute top-2 right-2 opacity-20">
          <School size={40} />
        </div>
        <CardTitle className="flex items-center text-xl font-bold">
          <PieChartIcon className="mr-2 h-5 w-5" /> Répartition par Filière
        </CardTitle>
        <CardDescription className="text-green-50">
          Année académique 2023-2024
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-6 bg-gradient-to-b from-white to-green-50">
        <div className="relative">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent 
                      formatter={(value) => `${value} étudiants`}
                    />
                  }
                />
                {/* Inner circle - Domaines */}
                <Pie 
                  data={innerCircleData} 
                  dataKey="etudiants"
                  nameKey="departement"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  onMouseEnter={(_, index) => handlePieEnter(index)}
                  onMouseLeave={handlePieLeave}
                >
                  {innerCircleData.map((entry, index) => (
                    <Cell 
                      key={`cell-inner-${index}`} 
                      fill={entry.fill}
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                    />
                  ))}
                  <Label
                    value="Domaines"
                    position="center"
                    className="fill-gray-500 font-medium"
                    fontSize={12}
                  />
                </Pie>
                
                {/* Outer circle - Départements */}
                <Pie 
                  data={outerCircleData} 
                  dataKey="etudiants"
                  nameKey="departement"
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={90}
                  paddingAngle={2}
                  onMouseEnter={(_, index) => handlePieEnter(index + innerCircleData.length)}
                  onMouseLeave={handlePieLeave}
                >
                  {outerCircleData.map((entry, index) => (
                    <Cell 
                      key={`cell-outer-${index}`} 
                      fill={entry.fill}
                      opacity={activeIndex === null || activeIndex === index + innerCircleData.length ? 1 : 0.6}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        {/* Légende interactive */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h4 className="text-sm font-semibold mb-2 text-gray-600">Domaines</h4>
            <div className="space-y-2">
              {innerCircleData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center text-sm hover:bg-gray-50 p-1 rounded-lg transition-colors cursor-pointer"
                  onMouseEnter={() => handlePieEnter(index)}
                  onMouseLeave={handlePieLeave}
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-2 transition-transform" 
                    style={{ 
                      backgroundColor: item.fill,
                      transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)'
                    }}
                  />
                  <span className="font-medium">{item.departement}:</span>
                  <span className="ml-1 text-gray-600">{item.etudiants}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2 text-gray-600">Départements</h4>
            <div className="space-y-2">
              {outerCircleData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center text-sm hover:bg-gray-50 p-1 rounded-lg transition-colors cursor-pointer"
                  onMouseEnter={() => handlePieEnter(index + innerCircleData.length)}
                  onMouseLeave={handlePieLeave}
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-2 transition-transform" 
                    style={{ 
                      backgroundColor: item.fill,
                      transform: activeIndex === index + innerCircleData.length ? 'scale(1.2)' : 'scale(1)'
                    }}
                  />
                  <span className="font-medium">{item.departement}:</span>
                  <span className="ml-1 text-gray-600">{item.etudiants}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm p-6 bg-white border-t border-green-100">
        <div className="flex justify-between w-full">
          <div className="flex gap-2 font-medium text-green-700 items-center">
            <TrendingUp className="h-4 w-4" />
            {pourcentageObjectif}% de l&apos;objectif atteint
          </div>
          <div className="flex items-center">
            <GraduationCap className="h-4 w-4 mr-1 text-teal-600" />
            <span className="font-bold text-teal-600">{totalEtudiants}/{objectifEtudiants}</span>
          </div>
        </div>
        <div className="w-full mt-2">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-teal-600 rounded-full transition-all duration-1000"
              style={{ width: `${pourcentageObjectif}%` }}
            />
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Objectif: {objectifEtudiants} étudiants pour l&apos;année académique
        </div>
      </CardFooter>
    </Card>
  )
}
