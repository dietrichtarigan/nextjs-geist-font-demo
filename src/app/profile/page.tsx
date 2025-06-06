"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShareButtons } from "@/components/ui/share-buttons"

// Mock data
const savedArticles = [
  {
    id: "1",
    title: "Career Paths in Quantum Computing",
    category: "Career Insights",
    author: "Dr. Sarah Chen",
    date: "March 15, 2024",
    readTime: "5 min read",
    excerpt: "Explore the growing field of quantum computing and discover various career opportunities.",
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg"
  }
]

const savedOpportunities = [
  {
    id: "1",
    title: "Summer Research Internship",
    type: "internship",
    organization: "CERN",
    deadline: "May 30, 2024",
    description: "Join CERN's summer research program.",
    requirements: ["Physics background", "Programming skills"]
  }
]

const registeredEvents = [
  {
    id: "1",
    title: "Physics Career Fair",
    type: "conference",
    date: "2024-04-15",
    time: "10:00",
    location: "Physics Department Building",
    status: "upcoming"
  }
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("saved")

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to access your profile and manage your saved items.
            </p>
            <Button>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold mb-4">My Profile</h1>
          <p className="text-gray-300 text-lg">
            Manage your saved items and event registrations
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="saved">Saved Items</TabsTrigger>
              <TabsTrigger value="events">My Events</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Saved Items */}
            <TabsContent value="saved" className="space-y-8">
              {/* Saved Articles */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Saved Articles</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {savedArticles.map((article) => (
                    <Card key={article.id}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <span className="inline-block px-2 py-1 text-sm font-medium bg-gray-100 rounded mb-2">
                              {article.category}
                            </span>
                            <h3 className="text-xl font-semibold">{article.title}</h3>
                          </div>
                          <p className="text-gray-600">{article.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              <p>{article.author}</p>
                              <p>{article.readTime}</p>
                            </div>
                            <ShareButtons
                              data={{
                                title: article.title,
                                text: article.excerpt,
                                url: `/articles/${article.id}`
                              }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Saved Opportunities */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Saved Opportunities</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {savedOpportunities.map((opportunity) => (
                    <Card key={opportunity.id}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <span className="inline-block px-2 py-1 text-sm font-medium bg-gray-100 rounded mb-2 capitalize">
                              {opportunity.type}
                            </span>
                            <h3 className="text-xl font-semibold">{opportunity.title}</h3>
                            <p className="text-gray-600">{opportunity.organization}</p>
                          </div>
                          <p className="text-gray-600">{opportunity.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              <p>Deadline: {opportunity.deadline}</p>
                            </div>
                            <Button variant="outline">Apply Now</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Registered Events */}
            <TabsContent value="events" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {registeredEvents.map((event) => (
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
                            {event.time}
                          </p>
                          <p>
                            <i className="fas fa-location-dot mr-2"></i>
                            {event.location}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-600">
                            <i className="fas fa-check-circle mr-1"></i>
                            Registered
                          </span>
                          <Button variant="outline">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <p className="text-gray-600">{user.email}</p>
                        </div>
                        <Button variant="outline">Change Password</Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-600">
                              Receive updates about new opportunities and events
                            </p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Privacy</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Profile Visibility</p>
                            <p className="text-sm text-gray-600">
                              Control who can see your profile and activities
                            </p>
                          </div>
                          <Button variant="outline">Manage</Button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
