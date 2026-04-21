"use client"

import { useState } from "react"
import { Grid3X3, List, ArrowUpDown, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SearchResultCard, type SearchResult } from "@/components/search-result-card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SearchResultsProps {
  results: SearchResult[]
  totalCount: number
  isLoading?: boolean
  onToggleStar: (id: string) => void
}

export function SearchResults({ results, totalCount, isLoading, onToggleStar }: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [sortBy, setSortBy] = useState("relevance")

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-accent" />
          <p className="text-sm text-muted-foreground">Searching across all assets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between px-6 py-3 bg-muted/30">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground tabular-nums">{totalCount}</span> results
        </p>
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px] h-8 bg-background text-sm border-border">
              <ArrowUpDown className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="updated">Last Updated</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="created">Date Created</SelectItem>
            </SelectContent>
          </Select>
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => value && setViewMode(value as "list" | "grid")}
            className="bg-background border border-border rounded-md"
          >
            <ToggleGroupItem value="list" size="sm" className="h-8 w-8 p-0 data-[state=on]:bg-muted">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" size="sm" className="h-8 w-8 p-0 data-[state=on]:bg-muted">
              <Grid3X3 className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className={`p-6 ${viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "space-y-3"}`}>
          {results.length > 0 ? (
            results.map((result) => (
              <SearchResultCard key={result.id} result={result} onToggleStar={onToggleStar} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found matching your filters.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
