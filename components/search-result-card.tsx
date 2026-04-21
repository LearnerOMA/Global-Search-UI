"use client"

import { useState } from "react"
import { Database, Workflow, Brain, GitBranch, MoreHorizontal, Star, ExternalLink, Clock, User, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export type AssetType = "dataset" | "workflow" | "ai-model" | "pipeline"

export interface SearchResult {
  id: string
  name: string
  description: string
  type: AssetType
  status: "active" | "processing" | "archived" | "draft"
  owner: string
  updatedAt: string
  tags: string[]
  starred: boolean
  metrics?: {
    label: string
    value: string
  }[]
}

const typeConfig: Record<AssetType, { icon: typeof Database; label: string; color: string }> = {
  dataset: {
    icon: Database,
    label: "Dataset",
    color: "text-primary",
  },
  workflow: {
    icon: Workflow,
    label: "Workflow",
    color: "text-emerald-400",
  },
  "ai-model": {
    icon: Brain,
    label: "AI Model",
    color: "text-accent",
  },
  pipeline: {
    icon: GitBranch,
    label: "Pipeline",
    color: "text-fuchsia-400",
  },
}

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-primary/10 text-primary border-primary/20" },
  processing: { label: "Processing", className: "bg-accent/10 text-accent border-accent/20" },
  archived: { label: "Archived", className: "bg-muted text-muted-foreground border-border" },
  draft: { label: "Draft", className: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20" },
}

interface SearchResultCardProps {
  result: SearchResult
  onToggleStar: (id: string) => void
}

export function SearchResultCard({ result, onToggleStar }: SearchResultCardProps) {
  const [tagsExpanded, setTagsExpanded] = useState(false)
  const TypeIcon = typeConfig[result.type].icon
  const visibleTags = tagsExpanded ? result.tags : result.tags.slice(0, 2)
  const hasMoreTags = result.tags.length > 2

  return (
    <Card className="group border-border bg-card hover:border-muted-foreground/30 transition-all duration-200 hover:shadow-lg hover:shadow-ring/5">
      <CardContent className="p-3 sm:p-5">
        <div className="flex items-start justify-between gap-2 sm:gap-4">
          <div className="flex items-start gap-2 sm:gap-4 flex-1 min-w-0">
            <div className={cn("mt-0.5 sm:mt-1 rounded-lg bg-secondary p-2 sm:p-2.5 shrink-0", typeConfig[result.type].color)}>
              <TypeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start sm:items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">{result.name}</h3>
                <Badge variant="outline" className={cn("text-xs shrink-0", statusConfig[result.status].className)}>
                  {statusConfig[result.status].label}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3">{result.description}</p>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <Badge variant="secondary" className="text-xs">
                  {typeConfig[result.type].label}
                </Badge>
                {visibleTags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {hasMoreTags && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 px-1.5 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setTagsExpanded(!tagsExpanded)}
                  >
                    {tagsExpanded ? (
                      <>
                        <ChevronUp className="h-3 w-3 mr-0.5" />
                        Less
                      </>
                    ) : (
                      <>
                        +{result.tags.length - 2}
                        <ChevronDown className="h-3 w-3 ml-0.5" />
                      </>
                    )}
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                  <span className="truncate">{result.owner}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                  <span className="hidden sm:inline">{result.updatedAt}</span>
                </div>
                {result.metrics?.slice(0, 1).map((metric) => (
                  <div key={metric.label} className="flex items-center gap-1">
                    <span className="text-foreground font-medium">{metric.value}</span>
                    <span className="hidden sm:inline">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            <div 
              id={`tutorial-star-button-${result.id}`}
              className="rounded-lg bg-secondary/50 p-0.5"
            >
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 sm:h-8 sm:w-8",
                  result.starred ? "text-amber-400" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => onToggleStar(result.id)}
              >
                <Star className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", result.starred && "fill-current")} />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground hidden sm:flex">
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Open in new tab</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
                <DropdownMenuItem>Add to collection</DropdownMenuItem>
                <DropdownMenuItem>View details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
