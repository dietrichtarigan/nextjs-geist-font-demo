import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select } from "@/components/ui/select"

export default function ArticlesPage() {
  const articles = [
    {
      id: 1,
      title: "Career Paths in Quantum Computing",
      category: "Career Insights",
      author: "Dr. Sarah Chen",
      date: "March 15, 2024",
      readTime: "5 min read",
      excerpt: "Explore the growing field of quantum computing and discover various career opportunities for physics graduates.",
      image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      title: "From Physics to Data Science: A Career Transition Guide",
      category: "Career Transition",
      author: "Michael Roberts",
      date: "March 12, 2024",
      readTime: "4 min read",
      excerpt: "Learn how physics graduates are leveraging their analytical skills to excel in the field of data science.",
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      title: "Research Opportunities in Renewable Energy",
      category: "Research",
      author: "Dr. Emily Watson",
      date: "March 10, 2024",
      readTime: "6 min read",
      excerpt: "Discover exciting research opportunities in sustainable energy technologies and how physics plays a crucial role.",
      image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 4,
      title: "Building a Strong CV in Physics",
      category: "Career Tips",
      author: "James Wilson",
      date: "March 8, 2024",
      readTime: "3 min read",
      excerpt: "Essential tips and strategies for creating a compelling CV that highlights your physics expertise.",
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 5,
      title: "Women in Physics: Breaking Barriers",
      category: "Inspiration",
      author: "Dr. Maria Rodriguez",
      date: "March 5, 2024",
      readTime: "7 min read",
      excerpt: "Inspiring stories of women who have made significant contributions to physics and are paving the way for future generations.",
      image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 6,
      title: "The Future of Physics Research",
      category: "Research",
      author: "Dr. Alex Thompson",
      date: "March 1, 2024",
      readTime: "5 min read",
      excerpt: "Exploring emerging trends and future directions in physics research and their impact on career opportunities.",
      image: "https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ]

  return (
    <>
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold mb-4">Career Articles & Insights</h1>
          <p className="text-gray-300 text-lg">
            Stay informed about career opportunities, research trends, and success stories in physics.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <Select>
              <option value="">All Categories</option>
              <option value="career-insights">Career Insights</option>
              <option value="research">Research</option>
              <option value="career-tips">Career Tips</option>
              <option value="inspiration">Inspiration</option>
            </Select>
            <Select>
              <option value="">Sort by</option>
              <option value="latest">Latest</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
            </Select>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <span className="inline-block px-2 py-1 text-sm font-medium bg-gray-100 rounded mb-2">
                        {article.category}
                      </span>
                      <h3 className="text-xl font-semibold line-clamp-2">{article.title}</h3>
                    </div>
                    <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4">
                      <div className="text-sm text-gray-500">
                        <p>{article.author}</p>
                        <p>{article.date} · {article.readTime}</p>
                      </div>
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
