"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Clock, Shield } from "lucide-react"
import { nigerianMentalHealthResources } from "@/lib/data/nigerian-mental-health-resources"
import { useState } from "react"

export function MentalHealthResources() {
  const [filter, setFilter] = useState<"all" | "crisis" | "counseling">("all")

  const filteredResources =
    filter === "all" ? nigerianMentalHealthResources : nigerianMentalHealthResources.filter((r) => r.type === filter)

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nigerian Mental Health Resources</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free crisis hotlines and mental health support services available across Nigeria
          </p>
        </div>

        <div className="flex gap-3 justify-center mb-8 flex-wrap">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All Resources
          </Button>
          <Button variant={filter === "crisis" ? "default" : "outline"} onClick={() => setFilter("crisis")}>
            Crisis Lines
          </Button>
          <Button variant={filter === "counseling" ? "default" : "outline"} onClick={() => setFilter("counseling")}>
            Counseling
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredResources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{resource.name}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </div>
                  <Shield className="h-5 w-5 text-primary flex-shrink-0 ml-2" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{resource.availability}</span>
                </div>

                <div className="space-y-2">
                  {resource.phone.map((number, idx) => (
                    <a
                      key={idx}
                      href={`tel:${number.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="font-mono font-medium">{number}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg">
          <h3 className="font-bold text-red-900 dark:text-red-300 mb-2">In Case of Emergency</h3>
          <p className="text-red-800 dark:text-red-400 text-sm">
            If you or someone you know is in immediate danger, please call <strong>112</strong> (National Emergency) or{" "}
            <strong>767</strong> (Lagos Emergency) immediately.
          </p>
        </div>
      </div>
    </section>
  )
}
