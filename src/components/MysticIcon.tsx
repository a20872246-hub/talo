"use client"

interface MysticIconProps {
  type: string
  className?: string
}

export default function MysticIcon({ type, className = "w-8 h-8" }: MysticIconProps) {
  const icons: Record<string, JSX.Element> = {
    yearly: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2C12 2 14 6 14 12C14 18 12 22 12 22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2C12 2 10 6 10 12C10 18 12 22 12 22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    love: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 21C12 21 3 13.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.09C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 13.5 14 21 14 21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M12 7V17M7 12H17" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    marriage: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 13V20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 20H16" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    career: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    money: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 9.5C15 8.12 13.66 7 12 7C10.34 7 9 8.12 9 9.5C9 10.88 10.34 12 12 12C13.66 12 15 13.12 15 14.5C15 15.88 13.66 17 12 17C10.34 17 9 15.88 9 14.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    health: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    sun: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2V4M12 20V22M2 12H4M20 12H22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  }

  return icons[type] || icons.star
}
