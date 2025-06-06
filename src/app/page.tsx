import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Home() {
  const opportunities = [
    {
      id: 1,
      title: "Summer Research Internship",
      type: "Internship",
      deadline: "May 30, 2024",
      organization: "CERN"
    },
    {
      id: 2,
      title: "Physics Innovation Competition",
      type: "Competition",
      deadline: "June 15, 2024",
      organization: "IEEE"
    },
    {
      id: 3,
      title: "Graduate Studies Scholarship",
      type: "Scholarship",
      deadline: "July 1, 2024",
      organization: "National Science Foundation"
    }
  ]

  const articles = [
    {
      id: 1,
      title: "Career Paths in Quantum Computing",
      excerpt: "Explore the growing field of quantum computing and its career opportunities.",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "From Physics to Data Science",
      excerpt: "How physics graduates are making an impact in data science.",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Research Opportunities in Renewable Energy",
      excerpt: "Discover research opportunities in sustainable energy technologies.",
      readTime: "6 min read"
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-black text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Shape Your Future in Physics
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Discover opportunities, gain insights, and connect with alumni to build your career in physics.
            </p>
            <div className="flex gap-4">
              <Button className="bg-white text-black hover:bg-gray-100">
                Explore Opportunities
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                Read Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Latest Opportunities</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {opportunities.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <span className="inline-block px-2 py-1 text-sm font-medium bg-gray-100 rounded">
                          {item.type}
                        </span>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <div className="space-y-1 text-sm text-gray-500">
                          <p>{item.organization}</p>
                          <p>Deadline: {item.deadline}</p>
                        </div>
                        <Button variant="outline" className="w-full">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{article.title}</h3>
                    <p className="text-gray-600">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                      <Button variant="link">Read More →</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
