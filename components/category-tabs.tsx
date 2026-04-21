"use client"

import { Database, Workflow, Brain, GitBranch, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  label: string
  icon: React.ReactNode
  count: number
}

const categories: Category[] = [
  { id: "all", label: "All Assets", icon: <Layers className="h-4 w-4" />, count: 262 },
  { id: "dataset", label: "Datasets", icon: <Database className="h-4 w-4" />, count: 128 },
  { id: "workflow", label: "Workflows", icon: <Workflow className="h-4 w-4" />, count: 64 },
  { id: "ai-model", label: "AI Models", icon: <Brain className="h-4 w-4" />, count: 47 },
  { id: "pipeline", label: "Pipelines", icon: <GitBranch className="h-4 w-4" />, count: 23 },
]

interface CategoryTabsProps {
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div id="tutorial-category-tabs" className="border-b border-border bg-background">
      <div className="flex items-center px-4 sm:px-6 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-px",
              activeCategory === category.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
            )}
          >
            <span className={cn(activeCategory === category.id ? "text-primary" : "text-muted-foreground")}>{category.icon}</span>
            <span>{category.label}</span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs tabular-nums",
                activeCategory === category.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
