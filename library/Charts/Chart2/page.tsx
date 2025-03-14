"use client"

import { TrendingUp, PieChart as PieChartIcon, GraduationCap, School } from "lucide-react"
import { LabelList, Pie, PieChart, Cell, ResponsiveContainer } from "recharts"

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

const chartData = [
  { departement: "Génie Civil", etudiants: 60, fill: "#22c55e" },   // vert (green-500)
  { departement: "Hydraulique", etudiants: 53, fill: "#14b8a6" },   // teal (teal-500)
  { departement: "Électrique", etudiants: 37, fill: "#10b981" },    // emeraude (emerald-500)
  { departement: "Environnement", etudiants: 40, fill: "#06b6d4" }, // cyan (cyan-500)
  { departement: "Énergétique", etudiants: 44, fill: "#0ea5e9" },   // bleu ciel (sky-500)
  { departement: "Informatique", etudiants: 42, fill: "#0284c7" },  // bleu (blue-500)
]

const chartConfig = {
  etudiants: {
    label: "Étudiants",
  },
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

export default function DepartementsPieChart() {
  // Calculer le total des étudiants
  const totalEtudiants = chartData.reduce((total, item) => total + item.etudiants, 0);
  
  // Calculer le pourcentage par rapport à l'objectif
  const objectifEtudiants = 300;
  const pourcentageObjectif = Math.round((totalEtudiants / objectifEtudiants) * 100);
  
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 relative">
        <div className="absolute top-2 right-2 opacity-20">
          <School size={40} />
        </div>
        <CardTitle className="flex items-center text-xl font-bold">
          <PieChartIcon className="mr-2 h-5 w-5" /> Répartition par Département
        </CardTitle>
        <CardDescription className="text-green-50">
          Année académique 2023-2024
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-6 bg-gradient-to-b from-white to-green-50">
        <div className="relative">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent 
                      nameKey="etudiants" 
                      hideLabel 
                      formatter={(value:string) => `${value} étudiants`}
                    />
                  }
                />
                <Pie 
                  data={chartData} 
                  dataKey="etudiants"
                  nameKey="departement"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={30}
                  paddingAngle={2}
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList
                    dataKey="departement"
                    position="outside"
                    className="fill-gray-700"
                    stroke="none"
                    fontSize={11}
                    fontWeight="500"
                    formatter={(value: keyof typeof chartConfig) => 
                      chartConfig[value]?.label
                    }
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        {/* Légende */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center text-sm">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: item.fill }}
              />
              <span className="font-medium">{item.departement}:</span>
              <span className="ml-1 text-gray-600">{item.etudiants}</span>
            </div>
          ))}
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
  )
}