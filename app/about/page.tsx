import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Award, TrendingUp, Users } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "John Smith",
      role: "Founder & Lead Analyst",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With over 10 years of experience in cryptocurrency trading, John has helped thousands of students achieve financial freedom.",
    },
    {
      name: "Sarah Johnson",
      role: "Senior MemeCoins Analyst",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sarah specializes in spotting early-stage MemeCoins with 100x potential and has a proven track record of successful calls.",
    },
    {
      name: "Michael Chen",
      role: "Technical Analysis Expert",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael's technical analysis skills have helped our community identify optimal entry and exit points for maximum profits.",
    },
    {
      name: "Emma Williams",
      role: "Customer Success Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emma ensures all our students receive personalized support and guidance throughout their crypto journey.",
    },
  ]

  return (
    <>
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              About <span className="text-primary">Crypto University</span>
            </h1>
            <p className="text-xl text-gray-700">
              We're on a mission to help everyday people profit from the explosive growth of MemeCoins and
              cryptocurrency markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Our <span className="text-primary">Story</span>
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2017, Crypto University began as a small group of passionate traders who recognized the
                immense potential of cryptocurrency markets.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                After achieving significant success with our own investments, we decided to share our knowledge and
                strategies with others who wanted to participate in this financial revolution.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Today, we've grown into a community of over 10,000 students worldwide, with a dedicated team of 15
                expert analysts working around the clock to provide the most profitable signals and educational
                resources.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary inline-block">
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Crypto University Team"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg">
                <p className="font-bold text-xl">7+ Years</p>
                <p>of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-primary/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Why Choose <span className="text-primary">Us</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              What sets Crypto University apart from other signal providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <TrendingUp size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Proven Results</h3>
              <p className="text-gray-700">
                Our signals have consistently delivered 100x-1000x returns for our students.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <Users size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Expert Team</h3>
              <p className="text-gray-700">15 professional analysts with decades of combined experience.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <Award size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Quality Education</h3>
              <p className="text-gray-700">Comprehensive guides and videos to help you understand the market.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <CheckCircle size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">24/7 Support</h3>
              <p className="text-gray-700">
                Our team is always available to answer your questions and provide guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The experts behind our successful signals and strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
              >
                <div className="aspect-square">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <p className="text-gray-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white border border-primary/30 rounded-xl p-8 text-center shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Join thousands of successful students and start profiting from MemeCoins today.
            </p>
            <Link href="/checkout" className="btn-primary inline-block text-xl">
              👉 START NOW
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

