"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Shield, AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { nigerianMentalHealthResources } from "@/lib/data/nigerian-mental-health-resources"
export function MentalHealthResources() {

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-hamboi-dark-bg via-[#1a1a3e] to-hamboi-dark-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Nigerian Mental Health Resources
          </h2>
          <p className="text-lg md:text-xl text-hamboi-text-muted max-w-2xl mx-auto leading-relaxed">
            A support organization&apos;s current contact details should always be checked on its official website.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {nigerianMentalHealthResources.map((resource) => (
            <Card
              key={resource.name}
              className="border-2 border-hamboi-purple/40 hover:border-hamboi-purple/70 hover:shadow-xl hover:shadow-hamboi-purple/30 transition-all duration-300 smooth-hover bg-hamboi-dark-card backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 text-white">{resource.name}</CardTitle>
                    <CardDescription className="text-hamboi-text-muted">{resource.description}</CardDescription>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-hamboi-green/30 flex items-center justify-center flex-shrink-0 ml-2">
                    <Shield className="h-5 w-5 text-hamboi-green" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-hamboi-text-muted">
                  <Clock className="h-4 w-4" />
                  <span>{resource.availability}</span>
                </div>

                {resource.website ? (
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-hamboi-dark-bg hover:bg-hamboi-purple/20 transition-all border border-hamboi-purple/40"
                  >
                    <ArrowRight className="h-4 w-4 text-hamboi-green" />
                    <span className="font-bold text-white">Visit official website for current contact details</span>
                  </a>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center animate-fade-in-up">
          <Link href="/resources">
            <Button className="bg-gradient-to-r from-hamboi-green to-hamboi-cyan text-hamboi-dark-bg font-bold text-lg px-8 py-6 rounded-2xl shadow-xl shadow-hamboi-green/20 hover:scale-105 transition-transform group">
              View All Resources & Stories
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 p-6 bg-red-50 border-2 border-red-200 rounded-2xl animate-fade-in-up">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-red-900 mb-2 text-lg">In Case of Emergency</h3>
              <p className="text-red-800 leading-relaxed">
                If you or someone you know is in immediate danger, get a trusted adult or another person nearby and contact local emergency services now. Hamboi cannot contact them for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
