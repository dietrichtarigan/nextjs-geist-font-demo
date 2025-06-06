import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AlumniPage() {
  const alumniStories = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      graduation: "2018",
      role: "Quantum Computing Researcher",
      company: "IBM Research",
      image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      story: "After graduating, I pursued my PhD in Quantum Computing and now lead research initiatives at IBM. My physics background was crucial in understanding quantum mechanics principles.",
      advice: "Focus on building strong mathematical foundations and don't be afraid to explore interdisciplinary fields."
    },
    {
      id: 2,
      name: "Michael Roberts",
      graduation: "2019",
      role: "Data Science Lead",
      company: "Tesla",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      story: "My journey from physics to data science was natural. The analytical skills I gained during my physics degree are invaluable in solving complex data problems.",
      advice: "Learn programming early and work on practical projects that combine physics with data analysis."
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      graduation: "2017",
      role: "Research Scientist",
      company: "CERN",
      image: "https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      story: "Working at CERN has been my dream since undergraduate years. The experimental skills I developed during my physics degree prepared me well for particle physics research.",
      advice: "Take advantage of research opportunities during your studies and build international connections."
    }
  ]

  const careerStats = {
    fields: [
      { name: "Research & Academia", percentage: 35 },
      { name: "Industry R&D", percentage: 25 },
      { name: "Data Science", percentage: 20 },
      { name: "Technology", percentage: 15 },
      { name: "Other Fields", percentage: 5 }
    ],
    education: [
      { level: "PhD", percentage: 45 },
      { level: "Master's", percentage: 35 },
      { level: "Bachelor's", percentage: 20 }
    ],
    locations: [
      { region: "North America", percentage: 40 },
      { region: "Europe", percentage: 30 },
      { region: "Asia", percentage: 20 },
      { region: "Other", percentage: 10 }
    ]
  }

  return (
    <>
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold mb-4">Alumni Network</h1>
          <p className="text-gray-300 text-lg">
            Connect with HIMAFI alumni and learn from their experiences in various physics careers.
          </p>
        </div>
      </section>

      {/* Career Statistics */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Alumni Career Paths</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Career Fields */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Career Fields</h3>
                <div className="space-y-4">
                  {careerStats.fields.map((field) => (
                    <div key={field.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{field.name}</span>
                        <span className="text-sm text-gray-500">{field.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-black rounded-full h-2"
                          style={{ width: `${field.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education Level */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Education Level</h3>
                <div className="space-y-4">
                  {careerStats.education.map((edu) => (
                    <div key={edu.level}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{edu.level}</span>
                        <span className="text-sm text-gray-500">{edu.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-black rounded-full h-2"
                          style={{ width: `${edu.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Geographic Distribution</h3>
                <div className="space-y-4">
                  {careerStats.locations.map((location) => (
                    <div key={location.region}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{location.region}</span>
                        <span className="text-sm text-gray-500">{location.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-black rounded-full h-2"
                          style={{ width: `${location.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Alumni Stories */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Success Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumniStories.map((alumni) => (
              <Card key={alumni.id} className="overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">{alumni.name}</h3>
                      <p className="text-gray-600">{alumni.role}</p>
                      <p className="text-gray-500">{alumni.company}</p>
                      <p className="text-sm text-gray-500">Class of {alumni.graduation}</p>
                    </div>
                    <p className="text-gray-600">{alumni.story}</p>
                    <div className="pt-4">
                      <h4 className="font-medium mb-2">Advice for Students:</h4>
                      <p className="text-gray-600 italic">&ldquo;{alumni.advice}&rdquo;</p>
                    </div>
                    <Button className="w-full">Connect</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship CTA */}
      <section className="py-12 px-4 bg-black text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Looking for Career Guidance?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Connect with our alumni mentors who can help guide your career path in physics.
          </p>
          <Button className="bg-white text-black hover:bg-gray-100">
            Request Mentorship
          </Button>
        </div>
      </section>
    </>
  )
}
