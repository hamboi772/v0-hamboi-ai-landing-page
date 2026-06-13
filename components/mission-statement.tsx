"use client"

export function MissionStatement() {
  return (
    <section className="w-full py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Mission Statement */}
          <p
            className="text-3xl md:text-5xl lg:text-6xl font-serif italic leading-tight text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Every teenager deserves a space that actually gets them.
          </p>

          {/* Hairline border */}
          <div
            className="w-24 h-px mx-auto mt-8"
            style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
          />
        </div>
      </div>
    </section>
  )
}
