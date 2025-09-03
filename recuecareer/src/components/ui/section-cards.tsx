import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Jobs Applied</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            0 {/* Input data */}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              
              0 {/* Input data */}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending -- {/* Input data */} this month 
          </div>
          <div className="text-muted-foreground">
            -- {/* Input data */}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Matches Available</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            0 {/* Input data */}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              
              0 {/* Input data */}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            -- {/* Input data */} this period 
          </div>
          <div className="text-muted-foreground">
            -- {/* Input data */}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Jobs Rejected</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            0 {/* Input data */}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              
              0 {/* Input data */}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            -- this period {/* Input data */} 
          </div>
          <div className="text-muted-foreground">--</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Jobs Accepted</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            0 {/* Input data */}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              
              0 {/* Input data */}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            -- this period {/* Input data */} 
          </div>
          <div className="text-muted-foreground">--</div>
        </CardFooter>
      </Card>
    </div>
  )
}
