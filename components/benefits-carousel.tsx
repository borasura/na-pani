"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = [
  {
    title: "Simple, Opinionated, and Efficient",
    description:
      "With simple software, be efficient. Project management doesn't need to be complicated. No one enjoys the endless clicks and configuration of bloated tools. We built this software to keep things straight to the point—manage your tasks, organize your work, and get back to what matters. Say goodbye to complex dashboards and unnecessary features.",
  },
  {
    title: "Own Your Data",
    description:
      "Your data, you own it. No ads. No tracking. No marketing gimmicks. We believe in transparency and respect for your information. With our platform, you maintain full control over your data at all times. We will never sell your information or use it to push ads. The data is yours to keep, securely stored with no external interference. Privacy is a right, not a feature.",
  },
  {
    title: "Open Source",
    description:
      "Completely open source. Our software is built on a robust tech stack using industry-leading best practices. We are passionate about the open-source community, and by using our platform, you're joining a collaborative effort to improve and expand the software. Customize, extend, or contribute. You are not just a user—you're a part of the project. Open source means transparency, trust, and freedom to adapt to your needs.",
  },
  {
    title: "Roll Your Own",
    description:
      "Use our app, or deploy it on your platform of choice. Whether you prefer to run it on your own infrastructure or leverage our hosted solution, you have complete control. If you need help, we're here to assist you with deployment, hosting, and ongoing support. You choose the solution that fits your needs, and we’re here to back you up when you need it. Complete flexibility without sacrificing the support you deserve.",
  },
]

export function BenefitsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current === benefits.length - 1 ? 0 : current + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? benefits.length - 1 : current - 1))
  }, [])

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, nextSlide])

  return (
    <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="min-w-full px-4">
              <Card className="h-full bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-center text-blue-600">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {benefits.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === activeIndex ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
        aria-label="Previous benefit"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
        aria-label="Next benefit"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

