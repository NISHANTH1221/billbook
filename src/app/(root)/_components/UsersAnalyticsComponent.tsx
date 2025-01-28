"use client"

import * as React from "react"
import { IndianRupee } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
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
import { User } from "./models"
import { getUserWiseStats } from "@/app/(server_actions)/actions"
import { useToast } from "@/hooks/use-toast"

// Define chart colors
const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export default function UserAnalyticsComponent({
  billbookId,
  users
}: {
  billbookId: string
  users: User[]
}) {
  const [userSpendData, setUserSpendData] = React.useState<{ [key: string]: number }>()
  const { toast } = useToast()

  // Fetch data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserWiseStats(billbookId);
        if (userData.success) {
          setUserSpendData(userData.data)
        } else {
          toast({
            title: "Data Fetching Failed",
            description: "Cannot Fetch to Display Analytics",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while fetching analytics",
          variant: "destructive",
        })
      }
    }

    fetchData()
  }, [billbookId, toast])

  // Transform data for the chart
  const chartData = React.useMemo(() => {
    if (!userSpendData) return []
    return Object.entries(userSpendData)
      .filter(([_, amount]) => !isNaN(amount))
      .map(([userId, amount], index) => ({
        userId,
        name: users.find((u) => u.id === userId)?.name || "Unknown",
        amount,
        fill: chartColors[index % chartColors.length],
      }))
  }, [userSpendData, users])

  // Calculate total spending
  const totalSpending = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0)
  }, [chartData])

  // Generate chart config
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      amount: { label: "Amount" },
    }
    chartData.forEach((item, index) => {
      config[item.userId] = {
        label: item.name,
        color: chartColors[index % chartColors.length],
      }
    })
    return config
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending Distribution</CardTitle>
        <CardDescription>User-wise Expenditure</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            User
                          </span>
                          <span className="font-bold">{data.name}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Amount
                          </span>
                          <span className="font-bold">
                            ₹{data.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ₹{totalSpending.toFixed(0)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Spent
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <IndianRupee className="h-4 w-4" />
          Total Spending: ₹{totalSpending.toFixed(2)}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing spending distribution across all users
        </div>
      </CardFooter>
    </Card>
  )
}