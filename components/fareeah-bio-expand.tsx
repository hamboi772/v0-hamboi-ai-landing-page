"use client"

import { useState } from "react"

const FULL_BIO = [
  "Fareeah Bada didn't set out to change anything. She just cared. Deeply, quietly, and without needing to be asked.",
  "She is the kind of person who notices when something is off before anyone else does. The kind who stays up thinking about how to make things better, not for recognition, but because it genuinely matters to her. Brilliant in the way that goes beyond grades. She thinks in layers, asks the right questions, and always finds a way to make complex things feel human.",
  "At Hamboi, Fareeah is the voice that makes everything feel real. She brings the words, the warmth, and the ideas that turn a product into something teenagers actually trust. Her writing doesn't just inform. It reaches people. Because she writes the way she lives: with honesty, care, and an open heart.",
  "She is emotional in the best way. The kind of emotional that makes her great at what she does because she feels what the people Hamboi is built for feel. She doesn't just understand the mission. She lives it.",
  "Fareeah is a graduate now, stepping into the next chapter with the same calm, curious energy she brings to everything. Whatever she builds next, it will be thoughtful. It will be kind. And it will matter.",
]

export function FareeahBioExpand() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      {/* Short bio always visible */}
      <p
        style={{
          fontSize: 15,
          color: "#8B8B8B",
          lineHeight: 1.8,
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: 16,
        }}
      >
        A curious and thoughtful individual with a strong interest in learning, research, and creativity. She brings
        the words, the warmth, and the ideas that make Hamboi feel real.
      </p>

      {/* Expanded paragraphs */}
      {expanded && (
        <div
          style={{
            overflow: "hidden",
            animation: "fadeIn 0.35s ease",
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginBottom: 16,
            }}
          >
            {FULL_BIO.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 15,
                  color: "#8B8B8B",
                  lineHeight: 1.8,
                  fontFamily: "'DM Sans', sans-serif",
                  margin: 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
          color: "#0CF2C8",
          fontWeight: 500,
          letterSpacing: "0.01em",
          textDecoration: "none",
        }}
      >
        {expanded ? "Read less \u2191" : "Read full story \u2192"}
      </button>
    </div>
  )
}
