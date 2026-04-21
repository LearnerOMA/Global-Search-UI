"use client"

import { useState } from "react"
import { ChevronDown, Star, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { type SearchResult } from "@/components/search-result-card"

interface FilterCategory {
  name: string
  icon: React.ReactNode
  options: { label: string; count: number; checked: boolean }[]
}

interface MobileFilterDrawerProps {
  filters: FilterCategory[]
  onFilterChange: (categoryName: string, optionLabel: string, checked: boolean) => void
  starredCount: number
  showStarredOnly: boolean
  onToggleStarred: () => void
  results: SearchResult[]
}

export function MobileFilterDrawer({
  filters,
  onFilterChange,
  starredCount,
  showStarredOnly,
  onToggleStarred,
  results = [],
}: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false)
  const [openCategories, setOpenCategories] = useState<string[]>(filters.map((f) => f.name))

  // Calculate actual counts from results
  const getCounts = () => {
    const safeResults = results || []
    return {
      assetType: {
        Datasets: safeResults.filter((r) => r.type === "dataset").length,
        Workflows: safeResults.filter((r) => r.type === "workflow").length,
        "AI Models": safeResults.filter((r) => r.type === "ai-model").length,
        Pipelines: safeResults.filter((r) => r.type === "pipeline").length,
      },
      status: {
        Active: safeResults.filter((r) => r.status === "active").length,
        Processing: safeResults.filter((r) => r.status === "processing").length,
        Archived: safeResults.filter((r) => r.status === "archived").length,
        Draft: safeResults.filter((r) => r.status === "draft").length,
      },
      tags: {
        Production: safeResults.filter((r) => r.tags?.includes("Production")).length,
        Development: safeResults.filter((r) => r.tags?.includes("Development")).length,
        "ML/AI": safeResults.filter((r) => r.tags?.includes("ML/AI")).length,
        Analytics: safeResults.filter((r) => r.tags?.includes("Analytics")).length,
      },
    }
  }

  const counts = getCounts()

  const toggleCategory = (name: string) => {
    setOpenCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    )
  }

  const activeFilterCount = filters.reduce(
    (acc, cat) => acc + cat.options.filter((o) => o.checked).length,
    0
  )
  const hasActiveFilters = activeFilterCount > 0 || showStarredOnly

  const clearAllFilters = () => {
    filters.forEach((cat) => {
      cat.options.forEach((opt) => {
        if (opt.checked) {
          onFilterChange(cat.name, opt.label, false)
        }
      })
    })
    if (showStarredOnly) {
      onToggleStarred()
    }
  }

  return (
    <div id="tutorial-mobile-filters" className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full font-medium">
                {activeFilterCount + (showStarredOnly ? 1 : 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[340px] p-0">
        <SheetHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base">Filters</SheetTitle>
            {hasActiveFilters && (
              <button
                className="text-xs text-primary hover:underline font-medium"
                onClick={clearAllFilters}
              >
                Clear all
              </button>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Starred Section */}
          <div id="tutorial-mobile-starred-filter">
            <div className="px-1 mb-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Favorites
              </h3>
            </div>
            <button
              onClick={onToggleStarred}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                showStarredOnly
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                  : "text-foreground hover:bg-muted/50 border border-transparent"
              )}
            >
              <div className="flex items-center gap-2">
                <Star
                  className={cn(
                    "h-4 w-4",
                    showStarredOnly ? "fill-amber-500 text-amber-500" : "text-muted-foreground"
                  )}
                />
                <span>Starred</span>
              </div>
              <span
                className={cn(
                  "text-xs tabular-nums px-2 py-0.5 rounded-full",
                  showStarredOnly
                    ? "bg-amber-500/20 text-amber-500"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {starredCount}
              </span>
            </button>
          </div>

          <div className="h-px bg-border" />

          {/* Filters Section */}
          <div id="tutorial-mobile-filters-section">
            <div className="px-1 mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Refine Results
              </h3>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Filter by type, status, and tags
              </p>
            </div>

            <div className="space-y-1">
              {filters.map((category) => (
                <Collapsible
                  key={category.name}
                  open={openCategories.includes(category.name)}
                  onOpenChange={() => toggleCategory(category.name)}
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{category.icon}</span>
                      <span>{category.name}</span>
                      {category.options.some((o) => o.checked) && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform shrink-0",
                        openCategories.includes(category.name) && "rotate-180"
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 pb-2">
                    <div className="mt-2 space-y-1">
                      {category.options.map((option) => (
                        <div
                          key={option.label}
                          className={cn(
                            "flex items-center justify-between gap-2 p-2 rounded-md transition-colors cursor-pointer",
                            option.checked ? "bg-primary/10" : "hover:bg-muted/50"
                          )}
                          onClick={() =>
                            onFilterChange(category.name, option.label, !option.checked)
                          }
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Checkbox
                              id={`mobile-${category.name}-${option.label}`}
                              checked={option.checked}
                              onCheckedChange={(checked) =>
                                onFilterChange(category.name, option.label, checked as boolean)
                              }
                              className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary shrink-0"
                            />
                            <Label
                              htmlFor={`mobile-${category.name}-${option.label}`}
                              className={cn(
                                "text-sm cursor-pointer transition-colors",
                                option.checked ? "text-foreground font-medium" : "text-muted-foreground"
                              )}
                            >
                              {option.label}
                            </Label>
                          </div>
                          <span
                            className={cn(
                              "text-xs tabular-nums shrink-0",
                              option.checked ? "text-primary font-medium" : "text-muted-foreground"
                            )}
                          >
                            {category.name === "Asset Type"
                              ? counts.assetType[option.label as keyof typeof counts.assetType] || 0
                              : category.name === "Status"
                                ? counts.status[option.label as keyof typeof counts.status] || 0
                                : category.name === "Tags"
                                  ? counts.tags[option.label as keyof typeof counts.tags] || 0
                                  : option.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="p-4 border-t border-border">
          <SheetClose asChild>
            <Button className="w-full">Apply Filters</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
    </div>
  )
}
