"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Sparkles, PartyPopper, Star } from "lucide-react"

interface OnboardingTutorialProps {
  onComplete: () => void
  onSkip: () => void
}

interface TutorialStep {
  id: string
  title: string
  description: string
  targetSelector: string | null
  mobileTargetSelector?: string | null // Alternative target for mobile
  position: "top" | "bottom" | "left" | "right"
  mobilePosition?: "top" | "bottom" | "left" | "right" // Alternative position for mobile
  tip?: string
  showIcon?: "star" | "sparkles" | "party"
  hideOnMobile?: boolean // Skip this step entirely on mobile
  hideOnDesktop?: boolean // Skip this step entirely on desktop
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "Welcome to Global Search UI!",
    description: "Your centralized hub for discovering and managing all your data assets. Let us show you around in just a few quick steps.",
    targetSelector: null,
    position: "bottom",
    showIcon: "sparkles",
  },
  {
    id: "mode-tabs",
    title: "Navigation Modes",
    description: "Switch between Overview mode to browse all resources at a glance, or Search mode to find specific items quickly with powerful filters.",
    targetSelector: "#tutorial-mode-tabs",
    position: "bottom",
    tip: "Use Cmd/Ctrl + K to quickly access search",
    hideOnMobile: true, // Mode tabs are hidden on mobile
  },
  {
    id: "search-bar",
    title: "Search Bar",
    description: "Type here to search across all your data assets instantly. Supports searching by name, description, tags, and more.",
    targetSelector: "#tutorial-search-bar",
    position: "bottom",
  },
  {
    id: "category-tabs",
    title: "Filter by Category",
    description: "Quickly filter results by asset type. Tap any category to see only those items. The count shows how many items match each category.",
    targetSelector: "#tutorial-category-tabs",
    position: "top",
    mobilePosition: "top",
  },
  {
    id: "mobile-filters",
    title: "Filters & Favorites",
    description: "Tap this button to access filters and your starred favorites. You can filter by Asset Type, Status, Owner, and Tags to find exactly what you need.",
    targetSelector: "#tutorial-mobile-filters",
    position: "bottom",
    showIcon: "star",
    hideOnDesktop: true, // Only show this step on mobile
  },
  {
    id: "starred-filter",
    title: "Your Favorites",
    description: "Quickly access your starred items from here. Click to filter and show only your favorite assets. The count shows how many items you've starred.",
    targetSelector: "#tutorial-starred-filter",
    mobileTargetSelector: "#tutorial-mobile-filters",
    position: "right",
    mobilePosition: "bottom",
    showIcon: "star",
    hideOnMobile: true, // Sidebar is hidden on mobile, use mobile-filters step instead
  },
  {
    id: "filters-section",
    title: "Refine Your Results",
    description: "Use these filters to narrow down results by Asset Type, Status, Owner, and Tags. Each filter shows the count of matching items to help you find what you need.",
    targetSelector: "#tutorial-filters-section",
    position: "right",
    hideOnMobile: true, // Sidebar is hidden on mobile, use mobile-filters step instead
  },
  {
    id: "star-button",
    title: "Star Your Favorites",
    description: "Click the star icon on any item to mark it as a favorite. Starred items are saved across sessions for quick access later.",
    targetSelector: '[id^="tutorial-star-button-"]',
    position: "left",
    mobilePosition: "top",
    showIcon: "star",
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "You're ready to explore your data catalog. Click the help button in the top bar anytime to restart this tutorial. Happy searching!",
    targetSelector: null,
    position: "bottom",
    showIcon: "party",
  },
]

export function OnboardingTutorial({ onComplete, onSkip }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [highlightBox, setHighlightBox] = useState<{ top: number; left: number; width: number; height: number } | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Filter steps based on viewport - skip steps that should be hidden
  const activeSteps = useMemo(() => {
    if (isMobile) {
      return tutorialSteps.filter(s => !s.hideOnMobile)
    }
    return tutorialSteps.filter(s => !s.hideOnDesktop)
  }, [isMobile])

  const step = activeSteps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === activeSteps.length - 1
  const isCenteredModal = step?.targetSelector === null
  
  // Get the appropriate target selector and position for current viewport
  const currentTargetSelector = isMobile && step?.mobileTargetSelector !== undefined 
    ? step.mobileTargetSelector 
    : step?.targetSelector
  const currentPosition = isMobile && step?.mobilePosition 
    ? step.mobilePosition 
    : step?.position

  // Find target element and update highlight position
  const updateHighlight = useCallback(() => {
    // Reset previous element's z-index
    if (targetElement) {
      targetElement.style.removeProperty("position")
      targetElement.style.removeProperty("z-index")
      targetElement.style.removeProperty("pointer-events")
    }

    if (!currentTargetSelector) {
      setTargetElement(null)
      setHighlightBox(null)
      setIsReady(true)
      return
    }

    // Find the element
    const element = document.querySelector(currentTargetSelector) as HTMLElement | null
    
    if (!element) {
      setTargetElement(null)
      setHighlightBox(null)
      setIsReady(true)
      return
    }

    // Store reference to element
    setTargetElement(element)

    // Scroll element into view first
    element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })

    // Wait for scroll, then position
    setTimeout(() => {
      const rect = element.getBoundingClientRect()
      
      // IMPORTANT: Bring the element above the overlay and highlight box
      const computedStyle = window.getComputedStyle(element)
      if (computedStyle.position === "static") {
        element.style.position = "relative"
      }
      element.style.zIndex = "10003" // Higher than highlight box (10001)
      element.style.pointerEvents = "none" // Prevent interaction during tutorial
      element.style.background = "hsl(var(--card))" // Add light background to element
      element.style.borderRadius = "12px"
      element.style.padding = "4px"
      
      setHighlightBox({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      })
      setIsReady(true)
    }, 400)
  }, [currentTargetSelector, targetElement])

  // Update highlight when step changes
  useEffect(() => {
    setIsReady(false)
    const timer = setTimeout(() => {
      updateHighlight()
    }, 100)
    return () => clearTimeout(timer)
  }, [currentStep, updateHighlight])

  // Handle resize/scroll
  useEffect(() => {
    const handleUpdate = () => {
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect()
        setHighlightBox({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        })
      }
    }

    window.addEventListener("resize", handleUpdate)
    window.addEventListener("scroll", handleUpdate, true)
    return () => {
      window.removeEventListener("resize", handleUpdate)
      window.removeEventListener("scroll", handleUpdate, true)
    }
  }, [targetElement])

  // Cleanup when tutorial ends
  useEffect(() => {
    return () => {
      if (targetElement) {
        targetElement.style.removeProperty("position")
        targetElement.style.removeProperty("z-index")
        targetElement.style.removeProperty("pointer-events")
      }
    }
  }, [targetElement])

  const handleNext = useCallback(() => {
    if (isLastStep) {
      // Cleanup before completing
      if (targetElement) {
        targetElement.style.removeProperty("position")
        targetElement.style.removeProperty("z-index")
        targetElement.style.removeProperty("pointer-events")
      }
      onComplete()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }, [isLastStep, onComplete, targetElement])

  const handlePrev = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [isFirstStep])

  const handleSkip = useCallback(() => {
    // Cleanup before skipping
    if (targetElement) {
      targetElement.style.removeProperty("position")
      targetElement.style.removeProperty("z-index")
      targetElement.style.removeProperty("pointer-events")
    }
    onSkip()
  }, [onSkip, targetElement])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") {
        handleNext()
      } else if (e.key === "ArrowLeft") {
        handlePrev()
      } else if (e.key === "Escape") {
        handleSkip()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrev, handleSkip])

  // Calculate tooltip position
  const getTooltipPosition = (): React.CSSProperties => {
    if (isCenteredModal || !highlightBox) {
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }
    }

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    // Responsive tooltip dimensions
    const tooltipWidth = isMobile ? Math.min(320, viewportWidth - 32) : 380
    const tooltipHeight = 280
    const gap = isMobile ? 12 : 20
    const padding = 16

    let top = 0
    let left = 0

    // On mobile, prefer top/bottom positioning for better UX
    const effectivePosition = isMobile 
      ? (currentPosition === "left" || currentPosition === "right" ? "bottom" : currentPosition)
      : currentPosition

    switch (effectivePosition) {
      case "bottom":
        top = highlightBox.top + highlightBox.height + gap
        left = highlightBox.left + highlightBox.width / 2 - tooltipWidth / 2
        break
      case "top":
        top = highlightBox.top - tooltipHeight - gap
        left = highlightBox.left + highlightBox.width / 2 - tooltipWidth / 2
        break
      case "right":
        top = highlightBox.top + highlightBox.height / 2 - tooltipHeight / 2
        left = highlightBox.left + highlightBox.width + gap
        break
      case "left":
        top = highlightBox.top + highlightBox.height / 2 - tooltipHeight / 2
        left = highlightBox.left - tooltipWidth - gap
        break
    }

    // Keep within viewport with responsive padding
    if (left < padding) left = padding
    if (left + tooltipWidth > viewportWidth - padding) left = viewportWidth - tooltipWidth - padding
    if (top < padding) top = padding
    if (top + tooltipHeight > viewportHeight - padding) top = viewportHeight - tooltipHeight - padding

    // On mobile, if tooltip would overlap with highlight, move it below
    if (isMobile && highlightBox) {
      const tooltipBottom = top + tooltipHeight
      const highlightTop = highlightBox.top - 12 // Account for padding
      const highlightBottom = highlightBox.top + highlightBox.height + 12
      
      // If overlapping, position below the highlight
      if (top < highlightBottom && tooltipBottom > highlightTop) {
        top = highlightBottom + gap
        // If still not enough space, position above
        if (top + tooltipHeight > viewportHeight - padding) {
          top = highlightTop - tooltipHeight - gap
        }
      }
    }

    return {
      position: "fixed",
      top: `${top}px`,
      left: `${left}px`,
    }
  }

  if (!isReady || !step) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
        <div className="text-white/70 text-sm">Loading...</div>
      </div>
    )
  }

  const highlightPadding = 12

  return (
    <>
      {/* Dark overlay */}
      <div 
        className="fixed inset-0 bg-black/80"
        style={{ zIndex: 9998 }}
        onClick={handleSkip}
      />

      {/* Highlight border around the target element */}
      {highlightBox && (
        <div
          className="fixed pointer-events-none rounded-xl border-2 border-primary"
          style={{
            top: highlightBox.top - highlightPadding,
            left: highlightBox.left - highlightPadding,
            width: highlightBox.width + highlightPadding * 2,
            height: highlightBox.height + highlightPadding * 2,
            zIndex: 10001,
            background: "hsl(var(--card) / 0.95)",
            boxShadow: `
              0 0 0 4px hsl(var(--primary) / 0.3),
              0 0 30px hsl(var(--primary) / 0.5),
              inset 0 0 20px hsl(var(--primary) / 0.1)
            `,
            animation: "tutorial-glow 2s ease-in-out infinite",
          }}
        />
      )}

      {/* Tooltip Card */}
      <div
        className="bg-card border border-border rounded-2xl shadow-2xl w-[320px] sm:w-[380px] max-w-[calc(100vw-32px)] pointer-events-auto"
        style={{ ...getTooltipPosition(), zIndex: 10002 }}
      >
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          aria-label="Close tutorial"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          {/* Icon for welcome/complete/star steps */}
          {step.showIcon && (
            <div className="flex justify-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                step.showIcon === "star" 
                  ? "bg-amber-500/20 border border-amber-500/30" 
                  : "bg-primary/10 border border-primary/20"
              }`}>
                {step.showIcon === "star" ? (
                  <Star className="h-8 w-8 text-amber-400 fill-amber-400" />
                ) : step.showIcon === "sparkles" ? (
                  <Sparkles className="h-8 w-8 text-primary" />
                ) : (
                  <PartyPopper className="h-8 w-8 text-primary" />
                )}
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className={`text-lg font-semibold text-foreground ${step.showIcon ? "text-center" : ""}`}>
            {step.title}
          </h3>

          {/* Description */}
          <p className={`mt-2 text-sm text-muted-foreground leading-relaxed ${step.showIcon ? "text-center" : ""}`}>
            {step.description}
          </p>

          {/* Tip */}
          {step.tip && (
            <div className="mt-3 px-3 py-2 bg-primary/5 border border-primary/10 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-primary">Tip:</span> {step.tip}
              </p>
            </div>
          )}

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {activeSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "w-6 bg-primary"
                    : index < currentStep
                      ? "w-2 bg-primary/60"
                      : "w-2 bg-muted-foreground/30"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-5">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip tour
            </Button>

            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleNext}
                className="gap-1"
              >
                {isLastStep ? "Get Started!" : "Next"}
                {!isLastStep && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Global styles for animation */}
      <style jsx global>{`
        @keyframes tutorial-glow {
          0%, 100% {
            box-shadow: 
              0 0 0 4px hsl(var(--primary) / 0.3),
              0 0 30px hsl(var(--primary) / 0.5),
              inset 0 0 20px hsl(var(--primary) / 0.1);
          }
          50% {
            box-shadow: 
              0 0 0 6px hsl(var(--primary) / 0.4),
              0 0 50px hsl(var(--primary) / 0.6),
              inset 0 0 30px hsl(var(--primary) / 0.15);
          }
        }
      `}</style>
    </>
  )
}
