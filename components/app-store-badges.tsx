import Link from "next/link"

interface AppStoreBadgesProps {
  className?: string
  variant?: "dark" | "light"
  size?: "default" | "large"
}

export function AppStoreBadges({ className = "", variant = "dark", size = "default" }: AppStoreBadgesProps) {
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.hamboimindcare"

  const badgeHeight = size === "large" ? "h-14" : "h-12"

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <div
        className="relative transition-transform hover:scale-105 rounded-lg opacity-60 cursor-not-allowed"
        aria-label="iOS version coming soon"
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
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
          <span className="text-white font-semibold text-xs px-3 py-1 bg-hamboi-purple rounded-full">Coming Soon</span>
        </div>
      </div>

      <Link
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-hamboi-purple focus:ring-offset-2 rounded-lg"
        aria-label="Get it on Google Play"
      >
        <svg className={`${badgeHeight} w-auto`} viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg">
          <rect width="135" height="40" rx="5" fill="#000" />
          <path
            d="M47.418 10.24c0 .906-.269 1.627-.806 2.163-.611.632-1.406.949-2.383.949-.936 0-1.732-.321-2.387-.962-.656-.641-.984-1.439-.984-2.394s.328-1.753.984-2.394c.655-.641 1.451-.962 2.387-.962.464 0 .909.091 1.333.274.424.183.763.428 1.017.736l-.571.571c-.424-.508-1.006-.762-1.745-.762-.684 0-1.273.236-1.768.707-.495.471-.742 1.083-.742 1.836s.247 1.365.742 1.836c.495.471 1.084.707 1.768.707.723 0 1.326-.237 1.81-.711.314-.314.495-.75.544-1.308h-2.354v-.786h3.125c.031.168.047.33.047.487l-.017.013z"
            fill="#fff"
          />
          <path d="M52.03 7.639h-2.902v2.088h2.618v.786h-2.618v2.088h2.902V13.4h-3.736V6.853h3.736v.786z" fill="#fff" />
          <path d="M55.718 13.4h-.834V7.639h-1.768v-.786h4.37v.786h-1.768V13.4z" fill="#fff" />
          <path d="M60.848 13.4V6.853h.834V13.4h-.834z" fill="#fff" />
          <path d="M64.826 13.4h-.834V7.639h-1.768v-.786h4.37v.786h-1.768V13.4z" fill="#fff" />
          <path
            d="M73.913 12.572c-.643.641-1.432.962-2.368.962s-1.725-.321-2.368-.962c-.643-.641-.965-1.436-.965-2.387s.321-1.746.965-2.387c.643-.641 1.432-.962 2.368-.962s1.725.321 2.368.962c.643.641.965 1.436.965 2.387s-.322 1.746-.965 2.387zm-4.141-.528c.476.481 1.068.721 1.773.721s1.297-.24 1.773-.721c.476-.481.715-1.09.715-1.829s-.239-1.348-.715-1.829c-.476-.481-1.068-.721-1.773-.721s-1.297.24-1.773.721c-.476.481-.715 1.09-.715 1.829s.239 1.348.715 1.829z"
            fill="#fff"
          />
          <path d="M75.999 13.4V6.853h1.016l3.157 5.101V6.853h.834V13.4h-.869l-3.304-5.323V13.4h-.834z" fill="#fff" />
          <text x="47" y="31" fill="#fff" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="600">
            Google Play
          </text>
          {/* Play Store Triangle Icon */}
          <path
            d="M11.937 9.014l7.758 4.461c.444.256.444.897 0 1.153l-7.758 4.461c-.468.269-1.053-.044-1.053-.577V9.59c0-.533.585-.845 1.053-.577z"
            fill="#00D7FE"
          />
          <path d="M10.884 9.59v8.922c0 .206.073.394.195.541l5.112-5.003-5.307-4.46z" fill="#00F076" />
          <path
            d="M19.695 13.475l-3.504-2.014-5.112 5.003 4.959 2.85c.468.269 1.053-.044 1.053-.577v-.002l2.604-5.26z"
            fill="#FFBC00"
          />
          <path d="M16.191 11.461l-5.307 4.46-5.307-4.46 5.307-4.46 5.307 4.46z" fill="#FF474B" />
        </svg>
      </Link>
    </div>
  )
}
