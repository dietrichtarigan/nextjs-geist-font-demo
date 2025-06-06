"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { logoutAdmin } from "@/lib/auth"
import { toast } from "sonner"

export default function AdminDashboard() {
  const router = useRouter()
  const handleLogout = () => {
    try {
      logoutAdmin()
      router.push("/admin")
      toast.success("Logged out successfully")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Error logging out")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">HIMAFI Admin Dashboard</h1>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-black"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="opportunities" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="alumni">Alumni</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Opportunities Management */}
          <TabsContent value="opportunities">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Manage Opportunities</h2>
                    <Button>Add New</Button>
                  </div>

                  <div className="space-y-4">
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Title</label>
                          <Input placeholder="Opportunity title" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Type</label>
                          <Select>
                            <option value="">Select type</option>
                            <option value="internship">Internship</option>
                            <option value="competition">Competition</option>
                            <option value="scholarship">Scholarship</option>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Organization</label>
                          <Input placeholder="Organization name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Deadline</label>
                          <Input type="date" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea placeholder="Opportunity description" rows={4} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Requirements</label>
                        <Textarea placeholder="List the requirements" rows={3} />
                      </div>

                      <Button type="submit">Save Opportunity</Button>
                    </form>

                    {/* Opportunities List */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Current Opportunities</h3>
                      <div className="space-y-4">
                        {/* Example opportunity item */}
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">Summer Research Internship</h4>
                                <p className="text-sm text-gray-600">CERN</p>
                                <p className="text-sm text-gray-500">Deadline: May 30, 2024</p>
                              </div>
                              <div className="space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="destructive" size="sm">Delete</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Articles Management */}
          <TabsContent value="articles">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Manage Articles</h2>
                    <Button>Add New</Button>
                  </div>

                  <div className="space-y-4">
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Title</label>
                          <Input placeholder="Article title" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Category</label>
                          <Select>
                            <option value="">Select category</option>
                            <option value="career-insights">Career Insights</option>
                            <option value="research">Research</option>
                            <option value="career-tips">Career Tips</option>
                            <option value="inspiration">Inspiration</option>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Author</label>
                          <Input placeholder="Author name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Read Time</label>
                          <Input placeholder="e.g., 5 min read" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                        <Input placeholder="https://..." />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Content</label>
                        <Textarea placeholder="Article content" rows={10} />
                      </div>

                      <Button type="submit">Save Article</Button>
                    </form>

                    {/* Articles List */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Published Articles</h3>
                      <div className="space-y-4">
                        {/* Example article item */}
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">Career Paths in Quantum Computing</h4>
                                <p className="text-sm text-gray-600">By Dr. Sarah Chen</p>
                                <p className="text-sm text-gray-500">Published: March 15, 2024</p>
                              </div>
                              <div className="space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="destructive" size="sm">Delete</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alumni Management */}
          <TabsContent value="alumni">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Manage Alumni</h2>
                    <Button>Add New</Button>
                  </div>

                  <div className="space-y-4">
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Name</label>
                          <Input placeholder="Alumni name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Graduation Year</label>
                          <Input type="number" placeholder="YYYY" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Current Role</label>
                          <Input placeholder="Current position" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Company</label>
                          <Input placeholder="Company name" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                        <Input placeholder="https://..." />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Success Story</label>
                        <Textarea placeholder="Share their journey and achievements" rows={4} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Advice for Students</label>
                        <Textarea placeholder="Career advice for current students" rows={3} />
                      </div>

                      <Button type="submit">Save Alumni Profile</Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Management */}
          <TabsContent value="events">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Manage Events</h2>
                    <Button>Add New</Button>
                  </div>

                  <div className="space-y-4">
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Event Title</label>
                          <Input placeholder="Event title" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Event Type</label>
                          <Select>
                            <option value="">Select type</option>
                            <option value="workshop">Workshop</option>
                            <option value="seminar">Seminar</option>
                            <option value="conference">Conference</option>
                            <option value="networking">Networking</option>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Date</label>
                          <Input type="date" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Time</label>
                          <Input type="time" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <Input placeholder="Event location" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea placeholder="Event description" rows={4} />
                      </div>

                      <Button type="submit">Save Event</Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
