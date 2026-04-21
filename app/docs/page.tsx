'use client'

import { useState } from 'react'
import { ChevronDown, Search, Filter, Zap, Moon, Sun, Smartphone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function DocsPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']))

  const toggleSection = (section: string) => {
    const newSections = new Set(expandedSections)
    if (newSections.has(section)) {
      newSections.delete(section)
    } else {
      newSections.add(section)
    }
    setExpandedSections(newSections)
  }

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'features', title: 'Features' },
    { id: 'search', title: 'Smart Search' },
    { id: 'filtering', title: 'Filtering' },
    { id: 'theme', title: 'Themes' },
    { id: 'responsive', title: 'Responsive Design' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 sm:h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Search className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-semibold">Nexus Docs</span>
          </div>
          <Link href="/" className="ml-auto">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              Back to App
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-12 max-w-7xl mx-auto">
        {/* Sidebar Navigation - Mobile Collapsible */}
        <aside className="lg:w-64 lg:sticky lg:top-20 lg:h-fit">
          {/* Mobile Navigation Tabs */}
          <div className="lg:hidden mb-4 sm:mb-6 overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4">
            <div className="flex gap-2 min-w-min pb-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    expandedSections.has(section.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Sidebar */}
          <div className="hidden lg:block lg:border lg:border-border lg:rounded-lg lg:bg-card/50 lg:p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Documentation</h3>
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    expandedSections.has(section.id)
                      ? 'text-primary font-medium bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Hero Section */}
          <section className="mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-4 text-balance">
              Nexus Documentation
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground text-pretty">
              Learn how to use the Global Search UI to discover and manage your platform assets
            </p>
          </section>

          {/* Abstract/Overview Card */}
          <Card className="mb-6 sm:mb-8 lg:mb-12 border-border bg-card/50">
            <CardHeader className="pb-2 sm:pb-3 lg:pb-4">
              <CardTitle className="text-base sm:text-lg lg:text-xl">What is Nexus?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed text-pretty">
                Global Search UI for Platform Assets is a unified, enterprise-grade search interface designed to streamline access to organizational data assets across multiple resource types including datasets, workflows, AI models, and pipelines. The interface features an intelligent autocomplete search bar with real-time suggestions that display completed text in bold while showing remaining recommendations in muted colors, enabling users to quickly discover and navigate assets. It provides comprehensive filtering capabilities through a responsive sidebar supporting asset type, status, owner, and tag-based queries, alongside category-based navigation with result counters for precise asset discovery. The platform supports both light and dark theme modes with a sophisticated color palette inspired by modern data platforms, utilizing teal accents for primary actions and coral accents for secondary highlights. Built with responsive mobile-first design principles, the interface adapts seamlessly across all device sizes with optimized layouts, typography scaling, and touch-friendly controls, while maintaining a professional dark theme as the default with smooth theme switching capabilities.
              </p>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Overview Section */}
            <Card className="border-border">
              <button
                onClick={() => toggleSection('overview')}
                className="w-full text-left"
              >
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors p-3 sm:p-4 lg:p-6">
                  <div className="flex items-center justify-between gap-2 sm:gap-3">
                    <CardTitle className="text-base sm:text-lg lg:text-xl">Overview</CardTitle>
                    <ChevronDown
                      className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform shrink-0 ${expandedSections.has('overview') ? 'rotate-180' : ''}`}
                    />
                  </div>
                </CardHeader>
              </button>
              {expandedSections.has('overview') && (
                <CardContent className="space-y-3 sm:space-y-4 text-xs sm:text-sm lg:text-base text-muted-foreground p-3 sm:p-4 lg:p-6">
                  <p>
                    Nexus is a modern search interface built for teams that manage large volumes of data assets. Whether you&apos;re searching for datasets, workflows, AI models, or pipelines, Nexus provides a fast, intuitive way to discover and access what you need.
                  </p>
                  <div className="bg-secondary/30 rounded-lg p-3 sm:p-4 border border-border">
                    <h4 className="font-semibold text-sm text-foreground mb-2">Key Highlights:</h4>
                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Lightning-fast search with intelligent autocomplete</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Advanced filtering across multiple asset types</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Light and dark theme support</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Fully responsive across all devices</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Features Section */}
            <Card className="border-border">
              <button
                onClick={() => toggleSection('features')}
                className="w-full text-left"
              >
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors pb-2 sm:pb-3 lg:pb-4">
                  <div className="flex items-center justify-between gap-2 sm:gap-3">
                    <CardTitle className="text-base sm:text-lg lg:text-xl">Features</CardTitle>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform shrink-0 ${expandedSections.has('features') ? 'rotate-180' : ''}`}
                    />
                  </div>
                </CardHeader>
              </button>
              {expandedSections.has('features') && (
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="bg-primary/10 rounded-lg p-1.5 sm:p-2 mt-1 shrink-0">
                          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm text-foreground">Smart Autocomplete</h4>
                          <p className="text-xs text-muted-foreground mt-1">Real-time suggestions with visual completion indicators</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-lg p-2 mt-1">
                          <Filter className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Advanced Filters</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Filter by type, status, owner, and tags</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-lg p-2 mt-1">
                          <Sun className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Theme Support</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Beautiful light and dark modes</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-lg p-2 mt-1">
                          <Smartphone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Mobile Ready</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Responsive design for all screen sizes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Smart Search Section */}
            <Card className="border-border">
              <button
                onClick={() => toggleSection('search')}
                className="w-full text-left"
              >
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors pb-3 sm:pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Smart Search Bar</CardTitle>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform shrink-0 ${expandedSections.has('search') ? 'rotate-180' : ''}`}
                    />
                  </div>
                </CardHeader>
              </button>
              {expandedSections.has('search') && (
                <CardContent className="space-y-4 text-sm sm:text-base text-muted-foreground">
                  <p>
                    The search bar is the heart of Nexus. As you type, it provides intelligent suggestions that adapt to your input.
                  </p>
                  <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-foreground">Features:</h4>
                    <ul className="space-y-2 text-xs sm:text-sm">
                      <li className="flex gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Autocomplete Suggestions</strong> - See what you&apos;ve typed in bold</span>
                      </li>
                      <li className="flex gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Recent Searches</strong> - Quick access to your search history</span>
                      </li>
                      <li className="flex gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Trending Queries</strong> - See what&apos;s popular in your organization</span>
                      </li>
                      <li className="flex gap-2">
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span><strong>Quick Filters</strong> - Pre-built filter badges for common searches</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-xs sm:text-sm">
                    <p><strong>Tip:</strong> Use keyboard shortcuts for faster navigation. Press Tab to autocomplete, Enter to search, and Esc to close suggestions.</p>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Filtering Section */}
            <Card className="border-border">
              <button
                onClick={() => toggleSection('filtering')}
                className="w-full text-left"
              >
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors pb-3 sm:pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Filtering & Navigation</CardTitle>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform shrink-0 ${expandedSections.has('filtering') ? 'rotate-180' : ''}`}
                    />
                  </div>
                </CardHeader>
              </button>
              {expandedSections.has('filtering') && (
                <CardContent className="space-y-4 text-sm sm:text-base text-muted-foreground">
                  <p>
                    Refine your results using comprehensive filtering options designed for power users and quick searches alike.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-secondary/30 border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Asset Type</h4>
                      <p className="text-xs sm:text-sm">Filter by Datasets, Workflows, AI Models, or Pipelines</p>
                    </div>
                    <div className="bg-secondary/30 border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Status</h4>
                      <p className="text-xs sm:text-sm">Show Active, Processing, Archived, or Draft assets</p>
                    </div>
                    <div className="bg-secondary/30 border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Owner</h4>
                      <p className="text-xs sm:text-sm">Filter by asset ownership and team</p>
                    </div>
                    <div className="bg-secondary/30 border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Tags</h4>
                      <p className="text-xs sm:text-sm">Search by custom tags and categories</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Theme Section */}
            <Card className="border-border">
              <button
                onClick={() => toggleSection('theme')}
                className="w-full text-left"
              >
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors pb-3 sm:pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Themes & Appearance</CardTitle>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform shrink-0 ${expandedSections.has('theme') ? 'rotate-180' : ''}`}
                    />
                  </div>
                </CardHeader>
              </button>
              {expandedSections.has('theme') && (
                <CardContent className="space-y-4 text-sm sm:text-base text-muted-foreground">
                  <p>
                    Nexus offers beautiful light and dark themes, inspired by modern data platforms with teal and coral accents.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-b from-slate-100 to-slate-50 h-32 flex items-center justify-center">
                        <div className="text-center">
                          <Sun className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                          <span className="text-sm font-semibold text-slate-900">Light Mode</span>
                        </div>
                      </div>
                      <div className="p-3 bg-background text-xs sm:text-sm text-muted-foreground">
                        Clean, bright interface perfect for daytime use
                      </div>
                    </div>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-b from-slate-900 to-slate-800 h-32 flex items-center justify-center">
                        <div className="text-center">
                          <Moon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                          <span className="text-sm font-semibold text-slate-100">Dark Mode</span>
                        </div>
                      </div>
                      <div className="p-3 bg-background text-xs sm:text-sm text-muted-foreground">
                        Easy on the eyes for extended sessions
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-xs sm:text-sm">
                    <p><strong>Theme Toggle:</strong> Click the sun/moon icon in the top-right corner to switch themes or let the system choose based on your preferences.</p>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Responsive Design Section */}
            <Card className="border-border">
              <button
                onClick={() => toggleSection('responsive')}
                className="w-full text-left"
              >
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors pb-3 sm:pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Responsive Design</CardTitle>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform shrink-0 ${expandedSections.has('responsive') ? 'rotate-180' : ''}`}
                    />
                  </div>
                </CardHeader>
              </button>
              {expandedSections.has('responsive') && (
                <CardContent className="space-y-4 text-sm sm:text-base text-muted-foreground">
                  <p>
                    Nexus is built with mobile-first design principles, ensuring a seamless experience across all devices.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-secondary/30 border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Mobile (0-640px)</h4>
                      <p className="text-xs sm:text-sm">Optimized touch targets, stacked layout, and essential features front and center</p>
                    </div>
                    <div className="bg-secondary/30 border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Tablet (641-1024px)</h4>
                      <p className="text-xs sm:text-sm">Enhanced spacing, larger text, and balanced two-column layouts</p>
                    </div>
                    <div className="bg-secondary/30 border border-border rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Desktop (1025px+)</h4>
                      <p className="text-xs sm:text-sm">Full sidebar navigation, advanced filters, and grid layouts</p>
                    </div>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-xs sm:text-sm">
                    <p><strong>Responsive Features:</strong></p>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• Filter sidebar hides on mobile, accessible via collapsible menu</li>
                      <li>• Text scales appropriately for readability</li>
                      <li>• Touch-friendly button sizes (minimum 44px)</li>
                      <li>• Optimized card layouts for each screen size</li>
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Footer */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Get Started</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                    Start searching your platform assets today with Nexus.
                  </p>
                  <Link href="/">
                    <Button className="w-full gap-2 text-xs sm:text-sm">
                      Go to Search <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                    Check the documentation sections above or contact support.
                  </p>
                  <Button variant="outline" className="w-full text-xs sm:text-sm">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 text-center text-xs sm:text-sm text-muted-foreground">
              <p>© 2024 Nexus. Global Search UI for Platform Assets. Built with modern web technologies.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
