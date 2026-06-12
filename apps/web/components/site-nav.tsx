"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu"
import { cn } from "@workspace/ui/lib/utils"
import { LogoDark, LogoLight } from "./logo"

const triggerItems = ["Products", "Resources", "Solutions", "Company"]

export function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrollState = () => {
      const nextIsScrolled = window.scrollY > 2

      setIsScrolled((currentIsScrolled) =>
        currentIsScrolled === nextIsScrolled
          ? currentIsScrolled
          : nextIsScrolled
      )
    }

    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateScrollState)
    }
  }, [])

  const sideControlClass = cn(
    "pointer-events-auto absolute z-20 flex size-8 items-center justify-center rounded-full transition-[top,background-color,box-shadow,backdrop-filter,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-3 focus-visible:ring-ring/30 sm:size-9",
    isScrolled ? "top-2 shadow-none" : "top-4"
  )

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        isScrolled
          ? "border-b border-border/70 bg-background/85 shadow-[0_16px_44px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:shadow-[0_16px_44px_rgba(0,0,0,0.35)]"
          : "backdrop-blur-0 border-b border-transparent bg-transparent shadow-none"
      )}
    >
      <div
        className={cn(
          "relative flex w-full justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          isScrolled ? "px-0 pt-0" : "px-3 pt-4 sm:px-6"
        )}
      >
        <Link
          href="/"
          aria-label="Chance Journey home"
          className={cn(
            sideControlClass,
            "left-3 hover:text-foreground/90 focus:text-foreground/90 sm:left-6",
            isScrolled
              ? "backdrop-blur-0 bg-transparent"
              : "bg-foreground/10 text-foreground shadow-[0_10px_28px_rgba(0,0,0,0.1)] backdrop-blur-xl"
          )}
        >
          <LogoLight className="size-4 sm:size-4.5 dark:hidden" />
          <LogoDark className="hidden size-4 sm:size-4.5 dark:block" />
        </Link>
        <div
          className={cn(
            "pointer-events-auto relative z-10 scrollbar-none overflow-x-auto backdrop-blur-xl transition-[width,max-width,border-radius,background-color,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none [&::-webkit-scrollbar]:hidden",
            isScrolled
              ? "w-full max-w-none rounded-none bg-transparent px-14 py-2 sm:px-16"
              : "w-[min(38rem,calc(100vw-6.5rem))] max-w-[calc(100vw-6.5rem)] rounded-full bg-foreground/10 px-1 py-1 sm:max-w-[calc(100vw-8rem)] sm:px-1.5"
          )}
        >
          <NavigationMenu
            aria-label="Main"
            align="center"
            className="relative z-10 mx-auto w-max max-w-full flex-none"
          >
            <NavigationMenuList className="flex-nowrap justify-start gap-0.5 sm:gap-1">
              {triggerItems.map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuTrigger className="h-8 px-2.5 text-xs text-muted-foreground hover:bg-transparent focus:bg-transparent data-popup-open:bg-white/30 data-popup-open:text-foreground/90 data-popup-open:hover:bg-white/30 data-popup-open:hover:text-foreground/90 data-popup-open:focus:bg-white/30 data-popup-open:focus:text-foreground/90 sm:h-9 sm:px-4.5 sm:text-sm data-open:bg-white/30 data-open:text-foreground/90 data-open:hover:bg-white/30 data-open:hover:text-foreground/90 data-open:focus:bg-white/30 data-open:focus:text-foreground/90">
                    {item}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-44">
                    <NavigationMenuLink
                      href="/"
                      className="w-full in-data-[slot=navigation-menu-content]:rounded-3xl"
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open account menu"
            className={cn(
              sideControlClass,
              "right-3 bg-foreground/10 backdrop-blur-xl sm:right-6",
              isScrolled
                ? "shadow-none"
                : "shadow-[0_10px_28px_rgba(0,0,0,0.1)]"
            )}
          >
            <Avatar className="size-full bg-transparent after:border-0">
              <AvatarFallback className="bg-background/40 text-xs font-semibold text-foreground/80">
                CJ
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} className="w-40">
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
