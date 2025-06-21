"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface SmoothScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  offset?: number
}

export function SmoothScrollLink({ href, children, className, offset = 80, onClick, ...props }: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Call the original onClick if it exists
    if (onClick) {
      onClick(e)
    }

    // Get the target section ID from the href
    const targetId = href.startsWith("#") ? href.substring(1) : href
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update URL without scrolling
      window.history.pushState(null, "", href)
    }
  }

  return (
    <a href={href} className={cn("cursor-pointer", className)} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
