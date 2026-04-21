"use client"

import { Star, Database, GitBranch, Bot, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type SearchResult } from "@/components/search-result-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface StarredItemsProps {
  items: SearchResult[]
  onToggleStar: (id: string) => void
}

const typeIcons: Record<string, React.ReactNode> = {
  dataset: <Database className="h-4 w-4" />,
  workflow: <GitBranch className="h-4 w-4" />,
  "ai-model": <Bot className="h-4 w-4" />,
  pipeline: <Workflow className="h-4 w-4" />,
}

const typeColors: Record<string, string> = {
  dataset: "bg-primary/10 text-primary border-primary/20",
  workflow: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "ai-model": "bg-violet-500/10 text-violet-500 border-violet-500/20",
  pipeline: "bg-amber-500/10 text-amber-500 border-amber-500/20",
}

export function StarredItems({ items, onToggleStar }: StarredItemsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
        <h3 className="font-medium text-sm">Starred Items</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full tabular-nums">{items.length}</span>
      </div>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 pb-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-72 bg-muted/50 border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-muted/70 transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className={`p-2 rounded-lg ${typeColors[item.type]}`}>
                  {typeIcons[item.type]}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-60 group-hover:opacity-100 hover:bg-background"
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleStar(item.id)
                  }}
                >
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                </Button>
              </div>
              <h4 className="font-medium text-sm mt-3 truncate">{item.name}</h4>
              <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 whitespace-normal leading-relaxed">{item.description}</p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground capitalize">{item.type.replace("-", " ")}</span>
                {item.metrics?.[0] && (
                  <span className="text-xs text-primary font-medium">
                    {item.metrics[0].value} {item.metrics[0].label}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
