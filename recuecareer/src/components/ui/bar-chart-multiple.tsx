"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A multiple bar chart"

const chartData = [
  { skill: "Skill_1", Old: 186, New: 80 },
  { skill: "Skill_2", Old: 305, New: 200 },
  { skill: "Skill_3", Old: 237, New: 120 },
  { skill: "Skill_4", Old: 73, New: 190 },
  { skill: "Skill_5", Old: 209, New: 130 },
]

const chartConfig = {
  Old: {
    label: "Old",
    color: "var(--primary)",
  },
  New: {
    label: "New",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartBarMultiple() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Precent Skills in Rejected Applications Old vs New Report</CardTitle>
        <CardDescription>Report: From Jan 2025 to Jul 2025</CardDescription>
        <CardDescription>Total Number of applications: 1,049</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="skill"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Old" fill="var(--primary)" radius={4} fillOpacity={0.5}/>
            <Bar dataKey="New" fill="var(--primary)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trend in Rejected from Jobs that require C++ Expertise <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total applications for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
