"use client"

import { useState, useMemo, useEffect } from "react"
import { SearchHeader } from "@/components/search-header"
import { SearchBar } from "@/components/search-bar"
import { FilterSidebar, defaultFilters } from "@/components/filter-sidebar"
import { MobileFilterDrawer } from "@/components/mobile-filter-drawer"
import { SearchResults } from "@/components/search-results"
import { CategoryTabs } from "@/components/category-tabs"
import { type SearchResult } from "@/components/search-result-card"
import { OnboardingTutorial } from "@/components/onboarding-tutorial"

const mockResults: SearchResult[] = [
  {
    id: "1",
    name: "Customer Transaction Dataset 2024",
    description: "Comprehensive dataset containing all customer transactions from Q1-Q3 2024. Includes payment methods, purchase categories, and anonymized customer segments for analytics.",
    type: "dataset",
    status: "active",
    owner: "Data Engineering",
    updatedAt: "2 hours ago",
    tags: ["Production", "Finance", "Analytics"],
    starred: true,
    metrics: [{ label: "rows", value: "2.4M" }],
  },
  {
    id: "2",
    name: "Sentiment Analysis Pipeline",
    description: "End-to-end ML pipeline for real-time sentiment analysis on customer reviews. Includes data preprocessing, model inference, and result aggregation stages.",
    type: "workflow",
    status: "active",
    owner: "ML Platform",
    updatedAt: "1 day ago",
    tags: ["ML/AI", "NLP", "Production"],
    starred: false,
    metrics: [{ label: "runs/day", value: "156" }],
  },
  {
    id: "3",
    name: "GPT-4 Fine-tuned Classifier",
    description: "Custom fine-tuned GPT-4 model for document classification tasks. Trained on internal document corpus with 98.5% accuracy on validation set.",
    type: "ai-model",
    status: "active",
    owner: "AI Research",
    updatedAt: "3 days ago",
    tags: ["LLM", "Classification", "Production"],
    starred: true,
    metrics: [{ label: "accuracy", value: "98.5%" }],
  },
  {
    id: "4",
    name: "ETL Data Quality Pipeline",
    description: "Automated data quality checks and validation pipeline running on all incoming data streams. Monitors completeness, accuracy, and consistency metrics.",
    type: "pipeline",
    status: "processing",
    owner: "Data Quality",
    updatedAt: "5 hours ago",
    tags: ["ETL", "Quality", "Monitoring"],
    starred: false,
    metrics: [{ label: "checks", value: "47" }],
  },
  {
    id: "5",
    name: "User Behavior Analytics Dataset",
    description: "Aggregated user interaction data from web and mobile platforms. Contains session data, click streams, and feature usage patterns.",
    type: "dataset",
    status: "active",
    owner: "Product Analytics",
    updatedAt: "6 hours ago",
    tags: ["Analytics", "Product", "User Data"],
    starred: false,
    metrics: [{ label: "events", value: "8.2B" }],
  },
  {
    id: "6",
    name: "RAG Document Retrieval Model",
    description: "Retrieval-Augmented Generation model trained for internal knowledge base search. Optimized for semantic similarity and contextual relevance.",
    type: "ai-model",
    status: "active",
    owner: "AI Research",
    updatedAt: "1 week ago",
    tags: ["RAG", "Search", "Knowledge Base"],
    starred: true,
    metrics: [{ label: "MRR", value: "0.89" }],
  },
  {
    id: "7",
    name: "Feature Engineering Workflow",
    description: "Automated feature engineering workflow that transforms raw data into ML-ready features. Includes encoding, normalization, and feature selection.",
    type: "workflow",
    status: "draft",
    owner: "ML Platform",
    updatedAt: "2 days ago",
    tags: ["ML/AI", "Features", "Development"],
    starred: false,
  },
  {
    id: "8",
    name: "Real-time Fraud Detection Pipeline",
    description: "Streaming pipeline for real-time transaction fraud detection. Processes events with sub-second latency and integrates with alert systems.",
    type: "pipeline",
    status: "active",
    owner: "Security Team",
    updatedAt: "4 hours ago",
    tags: ["Security", "Real-time", "Production"],
    starred: true,
    metrics: [{ label: "latency", value: "45ms" }],
  },
]

export default function GlobalSearchPage() {
  const [results, setResults] = useState<SearchResult[]>(mockResults)
  const [activeMode, setActiveMode] = useState<"overview" | "search">("overview")
  const [showTutorial, setShowTutorial] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Overview mode state (independent)
  const [overviewCategory, setOverviewCategory] = useState("all")
  const [overviewFilters, setOverviewFilters] = useState(defaultFilters)
  const [overviewStarredOnly, setOverviewStarredOnly] = useState(false)

  // Search mode state (independent)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchCategory, setSearchCategory] = useState("all")
  const [searchFilters, setSearchFilters] = useState(defaultFilters)
  const [searchStarredOnly, setSearchStarredOnly] = useState(false)

  // Get current mode's state
  const activeCategory = activeMode === "overview" ? overviewCategory : searchCategory
  const setActiveCategory = activeMode === "overview" ? setOverviewCategory : setSearchCategory
  const filters = activeMode === "overview" ? overviewFilters : searchFilters
  const showStarredOnly = activeMode === "overview" ? overviewStarredOnly : searchStarredOnly
  const setShowStarredOnly = activeMode === "overview" ? setOverviewStarredOnly : setSearchStarredOnly

  const handleFilterChange = (categoryName: string, optionLabel: string, checked: boolean) => {
    const setFilters = activeMode === "overview" ? setOverviewFilters : setSearchFilters
    setFilters((prev) =>
      prev.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              options: category.options.map((option) =>
                option.label === optionLabel ? { ...option, checked } : option
              ),
            }
          : category
      )
    )
  }

  // Check if user has seen the tutorial before
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial")
    if (!hasSeenTutorial) {
      setActiveMode("search")
      setShowTutorial(true)
    }
  }, [])

  const handleTutorialComplete = () => {
    localStorage.setItem("hasSeenTutorial", "true")
    setShowTutorial(false)
  }

  const handleTutorialSkip = () => {
    localStorage.setItem("hasSeenTutorial", "true")
    setShowTutorial(false)
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const handleToggleStar = (id: string) => {
    setResults((prev) =>
      prev.map((result) =>
        result.id === id ? { ...result, starred: !result.starred } : result
      )
    )
  }

  const starredItems = useMemo(() => {
    return results.filter((r) => r.starred)
  }, [results])

  const filteredResults = useMemo(() => {
    let filtered = results

    // Apply starred filter first (mode-specific)
    if (showStarredOnly) {
      filtered = filtered.filter((r) => r.starred)
    }

    // Apply category filter (mode-specific)
    if (activeCategory !== "all") {
      filtered = filtered.filter((r) => r.type === activeCategory)
    }

    // Apply search query filter ONLY in search mode
    if (activeMode === "search" && searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.tags.some((t) => t.toLowerCase().includes(query))
      )
    }

    // Apply sidebar filters - Asset Type (mode-specific)
    const assetTypeFilter = filters.find(f => f.name === "Asset Type")
    const selectedAssetTypes = assetTypeFilter?.options.filter(o => o.checked).map(o => o.label) || []
    if (selectedAssetTypes.length > 0) {
      // Map filter labels to data types
      const typeMapping: Record<string, string> = {
        'Datasets': 'dataset',
        'Workflows': 'workflow', 
        'AI Models': 'ai-model',
        'Pipelines': 'pipeline'
      }
      const mappedTypes = selectedAssetTypes.map(label => typeMapping[label])
      filtered = filtered.filter((r) => mappedTypes.includes(r.type))
    }

    // Apply status filter (mode-specific)
    const statusFilter = filters.find(f => f.name === "Status")
    const activeStatuses = statusFilter?.options.filter(o => o.checked).map(o => o.label.toLowerCase()) || []
    if (activeStatuses.length > 0) {
      filtered = filtered.filter((r) => activeStatuses.includes(r.status))
    }

    // Apply owner filter (mode-specific)
    const ownerFilter = filters.find(f => f.name === "Owner")
    const activeOwners = ownerFilter?.options.filter(o => o.checked) || []
    if (activeOwners.length > 0) {
      // For demo, "My Assets" shows starred, "Public" shows all
      const showMyAssets = activeOwners.some(o => o.label === "My Assets")
      const showPublic = activeOwners.some(o => o.label === "Public")
      if (showMyAssets && !showPublic) {
        filtered = filtered.filter((r) => r.starred)
      }
    }

    // Apply tags filter (mode-specific)
    const tagsFilter = filters.find(f => f.name === "Tags")
    const activeTags = tagsFilter?.options.filter(o => o.checked).map(o => o.label) || []
    if (activeTags.length > 0) {
      filtered = filtered.filter((r) => r.tags.some(tag => activeTags.includes(tag)))
    }

    return filtered
  }, [results, activeCategory, searchQuery, filters, showStarredOnly, activeMode])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showTutorial && (
        <OnboardingTutorial
          onComplete={handleTutorialComplete}
          onSkip={handleTutorialSkip}
        />
      )}
      <SearchHeader 
        activeMode={activeMode} 
        onModeChange={setActiveMode} 
        onShowTutorial={() => {
          setActiveMode("search")
          setShowTutorial(true)
        }} 
      />
      
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <FilterSidebar 
          filters={filters} 
          onFilterChange={handleFilterChange}
          starredCount={starredItems.length}
          showStarredOnly={showStarredOnly}
          onToggleStarred={() => setShowStarredOnly(!showStarredOnly)}
          results={results}
        />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {activeMode === "overview" ? (
            <>
              {/* Overview Mode Header with Stats */}
              <div className="px-4 sm:px-6 py-5 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-semibold">Data Overview</h1>
                      <p className="text-muted-foreground text-sm mt-1">Browse all your datasets, workflows, pipelines, and AI models</p>
                    </div>
                    <MobileFilterDrawer
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      starredCount={starredItems.length}
                      showStarredOnly={showStarredOnly}
                      onToggleStarred={() => setShowStarredOnly(!showStarredOnly)}
                      results={results}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{results.filter(r => r.type === "dataset").length} Datasets</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-muted-foreground">{results.filter(r => r.type === "workflow").length} Workflows</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-violet-500" />
                        <span className="text-muted-foreground">{results.filter(r => r.type === "ai-model").length} Models</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        <span className="text-muted-foreground">{results.filter(r => r.type === "pipeline").length} Pipelines</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
              
              <SearchResults
                results={filteredResults}
                totalCount={filteredResults.length}
                isLoading={isLoading}
                onToggleStar={handleToggleStar}
              />
            </>
          ) : (
            <>
              {/* Search Mode Header */}
              <div className="px-4 sm:px-6 py-5 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-semibold">Search Resources</h1>
                  <MobileFilterDrawer
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    starredCount={starredItems.length}
                    showStarredOnly={showStarredOnly}
                    onToggleStarred={() => setShowStarredOnly(!showStarredOnly)}
                    results={results}
                  />
                </div>
                <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
              </div>
              
              <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
              
              <SearchResults
                results={filteredResults}
                totalCount={filteredResults.length}
                isLoading={isLoading}
                onToggleStar={handleToggleStar}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
