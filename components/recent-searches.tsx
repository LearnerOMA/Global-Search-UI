"use client"

import { Clock, ArrowRight, TrendingUp, Database, Workflow, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RecentSearch {
  query: string
  timestamp: string
}

interface TrendingSearch {
  query: string
  growth: number
  icon: React.ReactNode
}

const recentSearches: RecentSearch[] = [
  { query: "customer-transactions-2024", timestamp: "2 hours ago" },
  { query: "sentiment-analysis-pipeline", timestamp: "Yesterday" },
  { query: "user-behavior-model", timestamp: "2 days ago" },
  { query: "data-quality-workflow", timestamp: "3 days ago" },
]

const trendingSearches: TrendingSearch[] = [
  { query: "RAG pipelines", growth: 156, icon: <Brain className="h-4 w-4" /> },
  { query: "Vector embeddings", growth: 89, icon: <Database className="h-4 w-4" /> },
  { query: "LLM evaluation", growth: 67, icon: <Workflow className="h-4 w-4" /> },
]

interface RecentSearchesProps {
  onSearch: (query: string) => void
}

export function RecentSearches({ onSearch }: RecentSearchesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
      <Card className="bg-card border-border">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Recent Searches
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0.5 sm:space-y-1">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onSearch(search.query)}
              className="flex items-center justify-between w-full px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-secondary transition-colors group"
            >
              <span className="text-foreground truncate">{search.query}</span>
              <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-2">
                <span className="text-xs text-muted-foreground hidden sm:inline">{search.timestamp}</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Trending in Platform
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0.5 sm:space-y-1">
          {trendingSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onSearch(search.query)}
              className="flex items-center justify-between w-full px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm hover:bg-secondary transition-colors group"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                <span className="text-primary text-xs sm:text-sm shrink-0">{search.icon}</span>
                <span className="text-foreground truncate">{search.query}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-1 sm:ml-2">
                <span className="text-xs text-primary">+{search.growth}%</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
