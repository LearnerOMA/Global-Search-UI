"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Search, Command, X, Sparkles, Database, Workflow, Brain, Layers, Clock, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Kbd } from "@/components/ui/kbd"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

interface Suggestion {
  id: string
  text: string
  type: "dataset" | "workflow" | "ai-model" | "pipeline" | "recent" | "trending"
  category?: string
}

const allSuggestions: Suggestion[] = [
  { id: "1", text: "Customer Transaction Dataset 2024", type: "dataset", category: "Datasets" },
  { id: "2", text: "Customer Behavior Analytics", type: "dataset", category: "Datasets" },
  { id: "3", text: "Customer Segmentation Model", type: "ai-model", category: "AI Models" },
  { id: "4", text: "Sentiment Analysis Pipeline", type: "workflow", category: "Workflows" },
  { id: "5", text: "Sales Forecasting Pipeline", type: "pipeline", category: "Pipelines" },
  { id: "6", text: "Sales Performance Dataset", type: "dataset", category: "Datasets" },
  { id: "7", text: "GPT-4 Fine-tuned Classifier", type: "ai-model", category: "AI Models" },
  { id: "8", text: "GPT Document Summarizer", type: "ai-model", category: "AI Models" },
  { id: "9", text: "User Behavior Analytics Dataset", type: "dataset", category: "Datasets" },
  { id: "10", text: "User Engagement Workflow", type: "workflow", category: "Workflows" },
  { id: "11", text: "RAG Document Retrieval Model", type: "ai-model", category: "AI Models" },
  { id: "12", text: "Real-time Fraud Detection Pipeline", type: "pipeline", category: "Pipelines" },
  { id: "13", text: "Real-time Analytics Dashboard", type: "workflow", category: "Workflows" },
  { id: "14", text: "Feature Engineering Workflow", type: "workflow", category: "Workflows" },
  { id: "15", text: "Feature Store Dataset", type: "dataset", category: "Datasets" },
  { id: "16", text: "ETL Data Quality Pipeline", type: "pipeline", category: "Pipelines" },
  { id: "17", text: "Machine Learning Training Pipeline", type: "pipeline", category: "Pipelines" },
  { id: "18", text: "Natural Language Processing Model", type: "ai-model", category: "AI Models" },
]

const recentSearches: Suggestion[] = [
  { id: "r1", text: "customer transaction", type: "recent" },
  { id: "r2", text: "sentiment analysis", type: "recent" },
  { id: "r3", text: "fraud detection", type: "recent" },
]

const trendingSearches: Suggestion[] = [
  { id: "t1", text: "GPT-4 models", type: "trending" },
  { id: "t2", text: "real-time pipelines", type: "trending" },
  { id: "t3", text: "customer analytics", type: "trending" },
]

const typeIcons: Record<Suggestion["type"], React.ReactNode> = {
  dataset: <Database className="h-4 w-4" />,
  workflow: <Workflow className="h-4 w-4" />,
  "ai-model": <Brain className="h-4 w-4" />,
  pipeline: <Layers className="h-4 w-4" />,
  recent: <Clock className="h-4 w-4" />,
  trending: <TrendingUp className="h-4 w-4" />,
}

const typeColors: Record<Suggestion["type"], string> = {
  dataset: "text-primary",
  workflow: "text-emerald-400",
  "ai-model": "text-accent",
  pipeline: "text-fuchsia-400",
  recent: "text-muted-foreground",
  trending: "text-primary",
}

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const getSuggestions = useCallback((): Suggestion[] => {
    if (!value.trim()) {
      return [...recentSearches, ...trendingSearches]
    }
    
    const query = value.toLowerCase()
    return allSuggestions
      .filter((s) => s.text.toLowerCase().includes(query))
      .slice(0, 8)
  }, [value])

  const suggestions = getSuggestions()

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) {
      return <span>{text}</span>
    }

    const lowerText = text.toLowerCase()
    const lowerQuery = query.toLowerCase()
    const startIndex = lowerText.indexOf(lowerQuery)

    if (startIndex === -1) {
      return <span>{text}</span>
    }

    const beforeMatch = text.slice(0, startIndex)
    const match = text.slice(startIndex, startIndex + query.length)
    const afterMatch = text.slice(startIndex + query.length)

    return (
      <>
        <span className="text-muted-foreground">{beforeMatch}</span>
        <span className="text-foreground font-semibold">{match}</span>
        <span className="text-muted-foreground">{afterMatch}</span>
      </>
    )
  }

  const handleSelect = (suggestion: Suggestion) => {
    onChange(suggestion.text)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    onSearch()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "Enter") {
        onSearch()
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex])
        } else {
          onSearch()
          setShowSuggestions(false)
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
      case "Tab":
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          e.preventDefault()
          const suggestion = suggestions[selectedIndex]
          onChange(suggestion.text)
        }
        break
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isFocused) {
      setShowSuggestions(true)
      setSelectedIndex(-1)
    }
  }, [isFocused, value])

  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      selectedElement?.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex])

  return (
    <div className="w-full relative">
      <div
        id="tutorial-search-bar"
        className={`relative flex items-center rounded-lg sm:rounded-xl border transition-all duration-200 ${
          isFocused
            ? "border-ring bg-card shadow-lg shadow-ring/10"
            : "border-border bg-card hover:border-muted-foreground/30"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-4">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search assets..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className="flex-1 border-0 bg-transparent px-2 sm:px-3 py-3 sm:py-6 text-sm sm:text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          autoComplete="off"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 mr-1 sm:mr-2 text-muted-foreground hover:text-foreground shrink-0"
            onClick={() => {
              onChange("")
              inputRef.current?.focus()
            }}
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        )}
        <div className="flex items-center gap-1 sm:gap-2 pr-2 sm:pr-4">
          <Button
            size="sm"
            className="gap-1 sm:gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm"
            onClick={onSearch}
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Search</span>
          </Button>
          <div className="hidden lg:flex items-center gap-1 text-muted-foreground">
            <Kbd>
              <Command className="h-3 w-3" />
            </Kbd>
            <Kbd>K</Kbd>
          </div>
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg sm:rounded-xl shadow-xl shadow-background/50 overflow-hidden z-50 max-h-96"
        >
          {!value.trim() && (
            <>
              <div className="px-4 py-2 border-b border-border">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Recent Searches
                </span>
              </div>
              {recentSearches.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  data-index={index}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    selectedIndex === index
                      ? "bg-secondary"
                      : "hover:bg-secondary/50"
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSelect(suggestion)
                  }}
                >
                  <span className={typeColors[suggestion.type]}>
                    {typeIcons[suggestion.type]}
                  </span>
                  <span className="flex-1 text-foreground">{suggestion.text}</span>
                </button>
              ))}
              <div className="px-4 py-2 border-t border-b border-border">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Trending
                </span>
              </div>
              {trendingSearches.map((suggestion, index) => {
                const actualIndex = index + recentSearches.length
                return (
                  <button
                    key={suggestion.id}
                    data-index={actualIndex}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      selectedIndex === actualIndex
                        ? "bg-secondary"
                        : "hover:bg-secondary/50"
                    }`}
                    onMouseEnter={() => setSelectedIndex(actualIndex)}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      handleSelect(suggestion)
                    }}
                  >
                    <span className={typeColors[suggestion.type]}>
                      {typeIcons[suggestion.type]}
                    </span>
                    <span className="flex-1 text-foreground">{suggestion.text}</span>
                  </button>
                )
              })}
            </>
          )}

          {value.trim() && (
            <>
              <div className="px-4 py-2 border-b border-border">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Suggestions
                </span>
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  data-index={index}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    selectedIndex === index
                      ? "bg-secondary"
                      : "hover:bg-secondary/50"
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSelect(suggestion)
                  }}
                >
                  <span className={typeColors[suggestion.type]}>
                    {typeIcons[suggestion.type]}
                  </span>
                  <span className="flex-1">{highlightMatch(suggestion.text, value)}</span>
                  {suggestion.category && (
                    <Badge variant="outline" className="text-xs">
                      {suggestion.category}
                    </Badge>
                  )}
                </button>
              ))}
              {suggestions.length === 0 && (
                <div className="px-4 py-6 text-center text-muted-foreground">
                  No suggestions found
                </div>
              )}
            </>
          )}

          <div className="px-4 py-2 border-t border-border bg-secondary/30 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Kbd className="text-xs px-1.5 py-0.5">↑</Kbd>
                <Kbd className="text-xs px-1.5 py-0.5">↓</Kbd>
                <span>navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <Kbd className="text-xs px-1.5 py-0.5">Tab</Kbd>
                <span>complete</span>
              </span>
              <span className="flex items-center gap-1">
                <Kbd className="text-xs px-1.5 py-0.5">Enter</Kbd>
                <span>search</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Kbd className="text-xs px-1.5 py-0.5">Esc</Kbd>
              <span>close</span>
            </span>
          </div>
        </div>
      )}

      <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs sm:text-sm text-muted-foreground">Quick filters:</span>
        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-secondary transition-colors">
          type:dataset
        </Badge>
        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-secondary transition-colors">
          status:active
        </Badge>
        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-secondary transition-colors">
          owner:me
        </Badge>
        <Badge variant="outline" className="text-xs cursor-pointer hover:bg-secondary transition-colors">
          updated:7d
        </Badge>
      </div>
    </div>
  )
}
