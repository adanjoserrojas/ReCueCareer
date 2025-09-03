"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive line chart"

const chartData = [
  { date: "2024-04-01", Accepted: 2, Rejected: 1 },
  { date: "2024-04-02", Accepted: 3, Rejected: 1 },
  { date: "2024-04-03", Accepted: 7, Rejected: 1 },
  { date: "2024-04-04", Accepted: 2, Rejected: 2 },
  { date: "2024-04-05", Accepted: 3, Rejected: 2 },
  { date: "2024-04-06", Accepted: 0, Rejected: 3 },
  { date: "2024-04-07", Accepted: 1, Rejected: 1 },
  { date: "2024-04-08", Accepted: 4, Rejected: 3 },
  { date: "2024-04-09", Accepted: 9, Rejected: 1 },
  { date: "2024-04-10", Accepted: 2, Rejected: 1 },
  { date: "2024-04-11", Accepted: 6, Rejected: 3 },
  { date: "2024-04-12", Accepted: 2, Rejected: 2 },
  { date: "2024-04-13", Accepted: 0, Rejected: 3 },
  { date: "2024-04-14", Accepted: 0, Rejected: 2 },
  { date: "2024-04-15", Accepted: 0, Rejected: 1 },
  { date: "2024-04-16", Accepted: 0, Rejected: 1 },
  { date: "2024-04-17", Accepted: 0, Rejected: 3 },
  { date: "2024-04-18", Accepted: 3, Rejected: 4 },
  { date: "2024-04-19", Accepted: 2, Rejected: 1 },
  { date: "2024-04-20", Accepted: 8, Rejected: 1 },
  { date: "2024-04-21", Accepted: 1, Rejected: 2 },
  { date: "2024-04-22", Accepted: 2, Rejected: 1 },
  { date: "2024-04-23", Accepted: 6, Rejected: 2 },
  { date: "2024-04-24", Accepted: 3, Rejected: 2 },
  { date: "2024-04-25", Accepted: 2, Rejected: 2 },
  { date: "2024-04-26", Accepted: 7, Rejected: 1 },
  { date: "2024-04-27", Accepted: 3, Rejected: 4 },
  { date: "2024-04-28", Accepted: 2, Rejected: 1 },
  { date: "2024-04-29", Accepted: 3, Rejected: 2 },
  { date: "2024-04-30", Accepted: 4, Rejected: 3 },
  { date: "2024-05-01", Accepted: 1, Rejected: 2 },
  { date: "2024-05-02", Accepted: 2, Rejected: 3 },
  { date: "2024-05-03", Accepted: 2, Rejected: 1 },
  { date: "2024-05-04", Accepted: 3, Rejected: 4 },
  { date: "2024-05-05", Accepted: 4, Rejected: 3 },
  { date: "2024-05-06", Accepted: 4, Rejected: 5 },
  { date: "2024-05-07", Accepted: 3, Rejected: 3 },
  { date: "2024-05-08", Accepted: 1, Rejected: 2 },
  { date: "2024-05-09", Accepted: 2, Rejected: 1 },
  { date: "2024-05-10", Accepted: 2, Rejected: 3 },
  { date: "2024-05-11", Accepted: 3, Rejected: 2 },
  { date: "2024-05-12", Accepted: 1, Rejected: 2 },
  { date: "2024-05-13", Accepted: 1, Rejected: 1 },
  { date: "2024-05-14", Accepted: 4, Rejected: 4 },
  { date: "2024-05-15", Accepted: 4, Rejected: 3 },
  { date: "2024-05-16", Accepted: 3, Rejected: 4 },
  { date: "2024-05-17", Accepted: 4, Rejected: 4 },
  { date: "2024-05-18", Accepted: 3, Rejected: 3 },
  { date: "2024-05-19", Accepted: 2, Rejected: 1 },
  { date: "2024-05-20", Accepted: 1, Rejected: 2 },
  { date: "2024-05-21", Accepted: 8, Rejected: 1 },
  { date: "2024-05-22", Accepted: 8, Rejected: 1 },
  { date: "2024-05-23", Accepted: 2, Rejected: 2 },
  { date: "2024-05-24", Accepted: 2, Rejected: 2 },
  { date: "2024-05-25", Accepted: 2, Rejected: 2 },
  { date: "2024-05-26", Accepted: 2, Rejected: 1 },
  { date: "2024-05-27", Accepted: 4, Rejected: 4 },
  { date: "2024-05-28", Accepted: 2, Rejected: 1 },
  { date: "2024-05-29", Accepted: 7, Rejected: 1 },
  { date: "2024-05-30", Accepted: 3, Rejected: 2 },
  { date: "2024-05-31", Accepted: 1, Rejected: 3 },
  { date: "2024-06-01", Accepted: 1, Rejected: 2 },
  { date: "2024-06-02", Accepted: 4, Rejected: 4 },
  { date: "2024-06-03", Accepted: 1, Rejected: 1 },
  { date: "2024-06-04", Accepted: 4, Rejected: 3 },
  { date: "2024-06-05", Accepted: 8, Rejected: 1 },
  { date: "2024-06-06", Accepted: 2, Rejected: 2 },
  { date: "2024-06-07", Accepted: 3, Rejected: 3 },
  { date: "2024-06-08", Accepted: 3, Rejected: 3 },
  { date: "2024-06-09", Accepted: 4, Rejected: 4 },
  { date: "2024-06-10", Accepted: 1, Rejected: 2 },
  { date: "2024-06-11", Accepted: 9, Rejected: 1 },
  { date: "2024-06-12", Accepted: 4, Rejected: 4 },
  { date: "2024-06-13", Accepted: 8, Rejected: 1 },
  { date: "2024-06-14", Accepted: 4, Rejected: 3 },
  { date: "2024-06-15", Accepted: 3, Rejected: 3 },
  { date: "2024-06-16", Accepted: 3, Rejected: 3 },
  { date: "2024-06-17", Accepted: 4, Rejected: 5 },
  { date: "2024-06-18", Accepted: 1, Rejected: 1 },
  { date: "2024-06-19", Accepted: 3, Rejected: 2 },
  { date: "2024-06-20", Accepted: 4, Rejected: 4 },
  { date: "2024-06-21", Accepted: 1, Rejected: 2 },
  { date: "2024-06-22", Accepted: 3, Rejected: 2 },
  { date: "2024-06-23", Accepted: 4, Rejected: 5 },
  { date: "2024-06-24", Accepted: 1, Rejected: 1 },
  { date: "2024-06-25", Accepted: 1, Rejected: 1 },
  { date: "2024-06-26", Accepted: 4, Rejected: 3 },
  { date: "2024-06-27", Accepted: 4, Rejected: 4 },
  { date: "2024-06-28", Accepted: 1, Rejected: 2 },
  { date: "2024-06-29", Accepted: 1, Rejected: 1 },
  { date: "2024-06-30", Accepted: 4, Rejected: 4 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
 Accepted: {
    label:  "Accepted",
    color: "var(--primary)",
  },
  Rejected: {
    label: "Rejected",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartLineInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>( "Accepted")

  const total = React.useMemo(
    () => ({
     Accepted: chartData.reduce((acc, curr) => acc + curr.Accepted, 0),
      Rejected: chartData.reduce((acc, curr) => acc + curr.Rejected, 0),
    }),
    []
  )

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0 text-BackgroundNavyBlue">
          <CardTitle>Applications Scrapped Accepted vs Rejected</CardTitle>
          <CardDescription>
            Showing total applications for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {[ "Accepted", "Rejected"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl  text-BackgroundNavyBlue">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
