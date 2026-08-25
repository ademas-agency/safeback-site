"use client"

import type React from "react"
import Link from "next/link"

interface ShinyButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

export function ShinyButton({ children, href, onClick, className = "" }: ShinyButtonProps) {
  if (href) {
    return (
      <Link href={href} className={`shiny-cta ${className}`}>
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <button className={`shiny-cta ${className}`} onClick={onClick}>
      <span>{children}</span>
    </button>
  )
}
