"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EventCalendar } from "@/components/ui/event-calendar"
import type { Event } from "@/lib/types"

// Mock events data
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Physics Career Fair",
    type: "conference",
    date: "2024-04-15",
    time: "10:00",
    location: "Physics Department Building",
    description: "Annual career fair featuring top employers in physics and related fields.",
    speaker: "Various Industry Representatives",
    capacity: 200,
    registrationDeadline: "2024-04-10",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-01"
  },
  {
    id: "2",
    title: "Quantum Computing Workshop",
    type: "workshop",
    date: "2024-04-20",
    time: "14:00",
    location: "Room 301",
    description: "Hands-on workshop introducing quantum computing principles and programming.",
    speaker: "Dr. Sarah Chen",
    capacity: 30,
    registrationDeadline: "2024-04-18",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-01"
  },
  {
    id: "3",
    title: "Alumni Networking Night",
    type: "networking",
    date: "2024-04-25",
    time: "18:00",
    location: "University Hall",
    description: "Connect with HIMAFI alumni and learn about their career journeys.",
    capacity: 100,
    registrationDeadline: "2024-04-23",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-01"
  }
]

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredEvents = selectedType === "all"
    ? mockEvents
    : mockEvents.filter(event => event.type === selectedType)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    })
  }

  return (
    <>
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold mb-4">Events Calendar</h1>
          <p className="text-gray-300 text-lg">
            Stay updated with upcoming workshops, seminars, and networking events.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Event Type Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              onClick={() => setSelectedType("all")}
            >
              All Events
            </Button>
            <Button
              variant={selectedType === "workshop" ? "default" : "outline"}
              onClick={() => setSelectedType("workshop")}
            >
              Workshops
            </Button>
            <Button
              variant={selectedType === "seminar" ? "default" : "outline"}
              onClick={() => setSelectedType("seminar")}
            >
              Seminars
            </Button>
            <Button
              variant={selectedType === "conference" ? "default" : "outline"}
              onClick={() => setSelectedType("conference")}
            >
              Conferences
            </Button>
            <Button
              variant={selectedType === "networking" ? "default" : "outline"}
              onClick={() => setSelectedType("networking")}
            >
              Networking
            </Button>
          </div>

          {/* Calendar */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <EventCalendar events={mockEvents} />
            </CardContent>
          </Card>

          {/* Upcoming Events List */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <span className="inline-block px-2 py-1 text-sm font-medium bg-gray-100 rounded mb-2 capitalize">
                          {event.type}
                        </span>
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                      </div>

                      <div className="space-y-2 text-gray-600">
                        <p>
                          <i className="fas fa-calendar mr-2"></i>
                          {formatDate(event.date)}
                        </p>
                        <p>
                          <i className="fas fa-clock mr-2"></i>
                          {formatTime(event.time)}
                        </p>
                        <p>
                          <i className="fas fa-location-dot mr-2"></i>
                          {event.location}
                        </p>
                        {event.speaker && (
                          <p>
                            <i className="fas fa-user mr-2"></i>
                            {event.speaker}
                          </p>
                        )}
                      </div>

                      <p className="text-gray-600">{event.description}</p>

                      <div className="flex items-center justify-between pt-4">
                        <div className="text-sm text-gray-500">
                          {event.capacity && (
                            <p>{event.capacity} spots available</p>
                          )}
                          {event.registrationDeadline && (
                            <p>Register by {formatDate(event.registrationDeadline)}</p>
                          )}
                        </div>
                        <Button>Register Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
