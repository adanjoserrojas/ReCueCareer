"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { browser: "TensorFlow/Keras Expertise", visitors: 300, fill: "var(--primary)", opacity: 0.9},
  { browser: "Managing end‑to‑end pipelines", visitors: 299, fill: "var(--primary)", opacity: 0.7},
  { browser: "C++ Expertise", visitors: 187, fill: "var(--primary)", opacity: 0.5},
  { browser: "deployment scripts in Python for AWS", visitors: 173, fill: "var(--primary)", opacity: 0.3},
  { browser: "others", visitors: 90, fill: "var(--primary)", opacity: 0.1},
]

const chartConfig = {
  visitors: {
    label: "TensorFlow/Keras Expertise",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <Card className="transEffectText1 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Most Significant Technical Limitations</CardTitle>
        <CardDescription>Report: From Jan 2025 to Jul 2025</CardDescription>
        <CardDescription>Total Number of applications: 1,049</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex text-center items-center gap-2 font-medium leading-none">
          TensorFlow/Keras Expertise 5.9% growth compared to last technical report
        </div>
        <div className="leading-none text-muted-foreground">
          Showing skills that featured in job rejections by volume
        </div>
      </CardFooter>
    </Card>
  )
}
