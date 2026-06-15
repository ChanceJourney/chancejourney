"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronDownIcon, MenuIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { cn } from "@workspace/ui/lib/utils"
import { LogoDark, LogoLight } from "./logo"

const navItems = [
  {
    title: "Products",
    subItems: [{ title: "Home", href: "/" }],
  },
  {
    title: "Resources",
    subItems: [{ title: "Home", href: "/" }],
  },
  {
    title: "Solutions",
    subItems: [{ title: "Home", href: "/" }],
  },
  {
    title: "Company",
    subItems: [{ title: "Home", href: "/" }],
  },
]

export function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrollState = () => {
      const firstSection = document.querySelector<HTMLElement>(
        "[data-home-section='hero']"
      )
      const nextIsScrolled = firstSection
        ? firstSection.getBoundingClientRect().bottom <= 0
        : window.scrollY > 2

      setIsScrolled((currentIsScrolled) =>
        currentIsScrolled === nextIsScrolled
          ? currentIsScrolled
          : nextIsScrolled
      )
    }

    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)

    return () => {
      window.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [])

  const sideControlClass = cn(
    "pointer-events-auto absolute z-20 flex items-center justify-center rounded-full transition-[top,width,height,background-color,box-shadow,backdrop-filter,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
    isScrolled
      ? "top-0 size-12 shadow-none sm:size-[3.25rem]"
      : "top-4 size-10 sm:size-11"
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
        <Sheet>
          <SheetTrigger
            aria-label="Open site navigation"
            className={cn(
              sideControlClass,
              "left-[3.75rem] bg-foreground/10 text-foreground shadow-[0_10px_28px_rgba(0,0,0,0.1)] backdrop-blur-xl min-[720px]:hidden sm:left-[5rem]",
              isScrolled && "bg-transparent shadow-none backdrop-blur-0"
            )}
          >
            <MenuIcon className="size-4.5 sm:size-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent
            side="left"
            showCloseButton={false}
            className="w-[min(20rem,85vw)] border-border/70 bg-background/92 px-4 py-5 backdrop-blur-2xl min-[720px]:hidden"
          >
            <SheetTitle className="sr-only">Site navigation</SheetTitle>
            <nav aria-label="Mobile main" className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <Collapsible
                  key={item.title}
                  className="group/collapsible rounded-3xl"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 data-open:bg-foreground/10 data-open:text-foreground">
                    {item.title}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 transition-transform duration-200 group-data-open/collapsible:rotate-180"
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden px-2 pb-2 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0">
                    <div className="flex flex-col gap-1 border-l border-border/70 pl-2">
                      {item.subItems.map((subItem) => (
                        <SheetClose
                          nativeButton={false}
                          key={`${item.title}-${subItem.title}`}
                          render={
                            <Link
                              href={subItem.href}
                              className="rounded-3xl px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30"
                            />
                          }
                        >
                          {subItem.title}
                        </SheetClose>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div
          className={cn(
            "pointer-events-auto relative z-10 scrollbar-none overflow-x-auto backdrop-blur-xl transition-[width,max-width,border-radius,background-color,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[719px]:hidden [&::-webkit-scrollbar]:hidden",
            isScrolled
              ? "w-full max-w-none rounded-none bg-transparent px-[4.25rem] py-2 sm:px-20"
              : "w-[min(38rem,calc(100vw-7.5rem))] max-w-[calc(100vw-7.5rem)] rounded-full bg-foreground/10 px-1 py-1 sm:max-w-[calc(100vw-9rem)] sm:px-1.5"
          )}
        >
          <NavigationMenu
            aria-label="Main"
            align="center"
            className="relative z-10 mx-auto w-max max-w-full flex-none"
          >
            <NavigationMenuList className="flex-nowrap justify-start gap-0.5 sm:gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="h-8 px-2.5 text-xs text-muted-foreground hover:bg-transparent focus:bg-transparent data-popup-open:bg-white/30 data-popup-open:text-foreground/90 data-popup-open:hover:bg-white/30 data-popup-open:hover:text-foreground/90 data-popup-open:focus:bg-white/30 data-popup-open:focus:text-foreground/90 sm:h-9 sm:px-4.5 sm:text-sm data-open:bg-white/30 data-open:text-foreground/90 data-open:hover:bg-white/30 data-open:hover:text-foreground/90 data-open:focus:bg-white/30 data-open:focus:text-foreground/90">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-44">
                    {item.subItems.map((subItem) => (
                      <NavigationMenuLink
                        key={`${item.title}-${subItem.title}`}
                        href={subItem.href}
                        className="w-full in-data-[slot=navigation-menu-content]:rounded-3xl"
                      >
                        {subItem.title}
                      </NavigationMenuLink>
                    ))}
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
              isScrolled && "top-2 size-8 sm:size-9",
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
