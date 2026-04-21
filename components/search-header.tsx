"use client"

import { Search, Bell, Settings, User, LayoutDashboard, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

interface SearchHeaderProps {
  activeMode: "overview" | "search"
  onModeChange: (mode: "overview" | "search") => void
  onShowTutorial?: () => void
}

export function SearchHeader({ activeMode, onModeChange, onShowTutorial }: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
              <Search className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-semibold tracking-tight hidden sm:inline">Global Search UI</span>
          </div>
          <nav id="tutorial-mode-tabs" className="hidden lg:flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
            <Button 
              id="tutorial-overview-tab"
              variant="ghost" 
              size="sm" 
              className={`text-xs sm:text-sm px-3 ${activeMode === "overview" ? "text-foreground bg-background shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-background/50"}`}
              onClick={() => onModeChange("overview")}
            >
              <LayoutDashboard className="h-4 w-4 mr-1.5" />
              Overview
            </Button>
            <Button 
              id="tutorial-search-tab"
              variant="ghost" 
              size="sm" 
              className={`text-xs sm:text-sm px-3 ${activeMode === "search" ? "text-foreground bg-background shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-background/50"}`}
              onClick={() => onModeChange("search")}
            >
              <Search className="h-4 w-4 mr-1.5" />
              Search
            </Button>
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {onShowTutorial && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-foreground"
              onClick={onShowTutorial}
              title="Show tutorial"
            >
              <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback className="bg-accent text-accent-foreground">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
