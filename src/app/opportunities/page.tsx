import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OpportunitiesPage() {
  const opportunities = {
    internships: [
      {
        id: 1,
        title: "Summer Research Internship",
        organization: "CERN",
        location: "Geneva, Switzerland",
        deadline: "May 30, 2024",
        description: "Join CERN's summer research program and work with leading physicists on cutting-edge experiments.",
        requirements: ["Currently enrolled in Physics program", "Strong background in particle physics", "Programming skills"]
      },
      {
        id: 2,
        title: "Data Science Intern",
        organization: "NASA",
        location: "Remote",
        deadline: "June 15, 2024",
        description: "Apply physics knowledge to analyze space mission data using advanced data science techniques.",
        requirements: ["Physics or related major", "Python programming", "Data analysis experience"]
      }
    ],
    competitions: [
      {
        id: 1,
        title: "Physics Innovation Competition",
        organization: "IEEE",
        deadline: "June 15, 2024",
        prize: "$10,000",
        description: "Develop innovative solutions to real-world problems using physics principles.",
        requirements: ["Team of 2-4 students", "Original project proposal", "Prototype development"]
      },
      {
        id: 2,
        title: "Quantum Computing Challenge",
        organization: "IBM",
        deadline: "July 1, 2024",
        prize: "$5,000",
        description: "Solve complex problems using quantum computing algorithms.",
        requirements: ["Individual or team participation", "Knowledge of quantum mechanics", "Programming skills"]
      }
    ],
    scholarships: [
      {
        id: 1,
        title: "Graduate Studies Scholarship",
        organization: "National Science Foundation",
        amount: "$25,000",
        deadline: "July 1, 2024",
        description: "Full scholarship for pursuing graduate studies in physics or related fields.",
        requirements: ["Minimum GPA 3.5", "Research experience", "Strong recommendation letters"]
      },
      {
        id: 2,
        title: "Women in Physics Fellowship",
        organization: "Physics Society",
        amount: "$15,000",
        deadline: "August 15, 2024",
        description: "Supporting women pursuing advanced degrees in physics.",
        requirements: ["Female students in physics", "Research proposal", "Academic excellence"]
      }
    ]
  }

  return (
    <>
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold mb-4">Opportunities</h1>
          <p className="text-gray-300 text-lg">
            Discover internships, competitions, and scholarships in physics and related fields.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="internships" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="internships">Internships</TabsTrigger>
              <TabsTrigger value="competitions">Competitions</TabsTrigger>
              <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            </TabsList>

            <TabsContent value="internships" className="space-y-6">
              {opportunities.internships.map((internship) => (
                <Card key={internship.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{internship.title}</h3>
                          <p className="text-gray-600">{internship.organization}</p>
                        </div>
                        <span className="text-sm text-gray-500">Deadline: {internship.deadline}</span>
                      </div>
                      <p className="text-gray-600">{internship.description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {internship.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-sm bg-gray-100 px-3 py-1 rounded">
                          {internship.location}
                        </span>
                        <Button>Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="competitions" className="space-y-6">
              {opportunities.competitions.map((competition) => (
                <Card key={competition.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{competition.title}</h3>
                          <p className="text-gray-600">{competition.organization}</p>
                        </div>
                        <span className="text-sm text-gray-500">Deadline: {competition.deadline}</span>
                      </div>
                      <p className="text-gray-600">{competition.description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {competition.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-sm bg-gray-100 px-3 py-1 rounded">
                          Prize: {competition.prize}
                        </span>
                        <Button>Learn More</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="scholarships" className="space-y-6">
              {opportunities.scholarships.map((scholarship) => (
                <Card key={scholarship.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{scholarship.title}</h3>
                          <p className="text-gray-600">{scholarship.organization}</p>
                        </div>
                        <span className="text-sm text-gray-500">Deadline: {scholarship.deadline}</span>
                      </div>
                      <p className="text-gray-600">{scholarship.description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {scholarship.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-sm bg-gray-100 px-3 py-1 rounded">
                          Amount: {scholarship.amount}
                        </span>
                        <Button>Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
