import Link from "next/link"

interface AppStoreBadgesProps {
  className?: string
  variant?: "dark" | "light"
  size?: "default" | "large"
}

export function AppStoreBadges({ className = "", variant = "dark", size = "default" }: AppStoreBadgesProps) {
  const badgeHeight = size === "large" ? "h-14" : "h-12"

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <div
        className="relative transition-transform hover:scale-105 rounded-lg"
        aria-label="Download on App Store"
      >
        <svg
          className={`${badgeHeight} w-auto ${variant === "light" ? "brightness-0 invert" : ""}`}
          viewBox="0 0 120 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="120" height="40" rx="5" fill="#000" />
          <path
            d="M24.769 20.3c-.024-2.656 2.169-3.933 2.269-3.995-1.235-1.807-3.159-2.055-3.843-2.083-1.636-.166-3.193.963-4.022.963-.829 0-2.11-.939-3.467-.914-1.784.026-3.429 1.038-4.347 2.636-1.854 3.217-.474 7.984 1.332 10.596.883 1.278 1.936 2.715 3.319 2.663 1.332-.053 1.835-.862 3.446-.862 1.611 0 2.063.862 3.472.835 1.434-.023 2.344-1.303 3.222-2.584 1.015-1.484 1.433-2.92 1.458-2.995-.032-.015-2.798-1.073-2.828-4.26h-.011z"
            fill="#fff"
          />
          <path
            d="M22.037 12.21c.733-.889 1.229-2.124 1.094-3.353-1.058.043-2.339.705-3.097 1.594-.68.788-1.275 2.047-1.115 3.256 1.181.092 2.385-.6 3.118-1.497z"
            fill="#fff"
          />
          <text x="42" y="15" fill="#fff" fontSize="8" fontFamily="system-ui, sans-serif">
            Download on the
          </text>
          <text x="42" y="27" fill="#fff" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600">
            App Store
          </text>
        </svg>
      </div>
    </div>
  )
}