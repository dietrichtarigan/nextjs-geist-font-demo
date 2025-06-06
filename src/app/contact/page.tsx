import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">
            Get in touch with HIMAFI Career Center team or request mentorship from our alumni.
          </p>
        </div>
      </section>

      {/* Contact Forms */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* General Contact Form */}
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">General Inquiry</h2>
                    <p className="text-gray-600">
                      Have questions about HIMAFI Career Center? Send us a message.
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Select>
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="opportunities">Opportunities</option>
                        <option value="events">Events</option>
                        <option value="feedback">Feedback</option>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        placeholder="Your message here..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button className="w-full">Send Message</Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Mentorship Request Form */}
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Request Mentorship</h2>
                    <p className="text-gray-600">
                      Connect with HIMAFI alumni for career guidance and mentorship.
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Current Status
                      </label>
                      <Select>
                        <option value="">Select your status</option>
                        <option value="undergraduate">Undergraduate Student</option>
                        <option value="graduate">Graduate Student</option>
                        <option value="recent-graduate">Recent Graduate</option>
                        <option value="professional">Professional</option>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Area of Interest
                      </label>
                      <Select>
                        <option value="">Select area of interest</option>
                        <option value="research">Research & Academia</option>
                        <option value="industry">Industry R&D</option>
                        <option value="data-science">Data Science</option>
                        <option value="quantum">Quantum Computing</option>
                        <option value="other">Other</option>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message to Potential Mentor
                      </label>
                      <Textarea
                        placeholder="Briefly describe your career goals and what kind of guidance you're seeking..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button className="w-full">Submit Request</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Contact Information */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600">career@himafi.org</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-gray-600">Physics Department Building</p>
                <p className="text-gray-600">Room 301</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday</p>
                <p className="text-gray-600">9:00 AM - 4:00 PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
