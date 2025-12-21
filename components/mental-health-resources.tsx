"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Clock, Shield, AlertTriangle } from "lucide-react"
import { nigerianMentalHealthResources } from "@/lib/data/nigerian-mental-health-resources"
import { useState } from "react"

export function MentalHealthResources() {
  const [filter, setFilter] = useState<"all" | "crisis" | "counseling">("all")

  const filteredResources =
    filter === "all" ? nigerianMentalHealthResources : nigerianMentalHealthResources.filter((r) => r.type === filter)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-hamboi-light to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hamboi-purple to-hamboi-blue">
              Nigerian Mental Health Resources
            </span>
          </h2>
          <p className="text-lg text-hamboi-dark/70 max-w-2xl mx-auto leading-relaxed">
            Free crisis hotlines and mental health support services available across Nigeria
          </p>
        </div>

        <div className="flex gap-3 justify-center mb-10 flex-wrap">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={
              filter === "all"
                ? "bg-gradient-to-r from-hamboi-purple to-hamboi-blue text-white hover:opacity-90"
                : "border-hamboi-purple/30 text-hamboi-purple hover:bg-hamboi-purple/10"
            }
          >
            All Resources
          </Button>
          <Button
            variant={filter === "crisis" ? "default" : "outline"}
            onClick={() => setFilter("crisis")}
            className={
              filter === "crisis"
                ? "bg-gradient-to-r from-hamboi-purple to-hamboi-blue text-white hover:opacity-90"
                : "border-hamboi-purple/30 text-hamboi-purple hover:bg-hamboi-purple/10"
            }
          >
            Crisis Lines
          </Button>
          <Button
            variant={filter === "counseling" ? "default" : "outline"}
            onClick={() => setFilter("counseling")}
            className={
              filter === "counseling"
                ? "bg-gradient-to-r from-hamboi-purple to-hamboi-blue text-white hover:opacity-90"
                : "border-hamboi-purple/30 text-hamboi-purple hover:bg-hamboi-purple/10"
            }
          >
            Counseling
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredResources.map((resource, index) => (
            <Card
              key={index}
              className="border-hamboi-purple/20 hover:border-hamboi-purple/40 hover:shadow-xl transition-all duration-300 smooth-hover bg-white/80 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 text-hamboi-dark">{resource.name}</CardTitle>
                    <CardDescription className="text-hamboi-dark/60">{resource.description}</CardDescription>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-hamboi-green/20 flex items-center justify-center flex-shrink-0 ml-2">
                    <Shield className="h-5 w-5 text-hamboi-green" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-hamboi-dark/60">
                  <Clock className="h-4 w-4" />
                  <span>{resource.availability}</span>
                </div>

                <div className="space-y-2">
                  {resource.phone.map((number, idx) => (
                    <a
                      key={idx}
                      href={`tel:${number.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 p-4 rounded-xl bg-hamboi-purple/5 hover:bg-hamboi-purple/10 transition-all border border-hamboi-purple/10 hover:border-hamboi-purple/30 smooth-hover"
                    >
                      <div className="w-8 h-8 rounded-full bg-hamboi-purple/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-4 w-4 text-hamboi-purple" />
                      </div>
                      <span className="font-mono font-medium text-hamboi-dark">{number}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 p-6 bg-red-50 border-2 border-red-200 rounded-2xl animate-fade-in-up">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-red-900 mb-2 text-lg">In Case of Emergency</h3>
              <p className="text-red-800 leading-relaxed">
                If you or someone you know is in immediate danger, please call <strong>112</strong> (National Emergency)
                or <strong>767</strong> (Lagos Emergency) immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
