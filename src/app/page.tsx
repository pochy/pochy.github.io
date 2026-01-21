import ParticleBackground from "@/components/ParticleBackground";
import Hero3D from "@/components/Hero3D";
import ScrollSection from "@/components/ScrollSection";
import InteractiveCard from "@/components/InteractiveCard";

export default function Home() {
  return (
    <main className="relative bg-black text-white overflow-hidden">
      <ParticleBackground />

      <Hero3D />

      <div className="relative z-10">
        <ScrollSection
          title="Innovation"
          description="Pushing the boundaries of what's possible with modern web technologies. Experience the future of interactive design."
          color="#8b5cf6"
        />

        <ScrollSection
          title="Creativity"
          description="Where art meets code. Creating immersive digital experiences that captivate and inspire."
          color="#ec4899"
        />

        <ScrollSection
          title="Excellence"
          description="Crafting pixel-perfect interfaces with attention to detail and performance optimization."
          color="#06b6d4"
        />
      </div>

      <section className="relative z-10 py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Explore
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InteractiveCard
              title="Blog"
              description="Thoughts on design, development, and technology"
              link="/blog"
            />
            <InteractiveCard
              title="Projects"
              description="Showcase of creative experiments and innovations"
              link="#projects"
            />
            <InteractiveCard
              title="About"
              description="Learn more about my journey and expertise"
              link="#about"
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Ready to Create Something Amazing?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Let's collaborate and bring your vision to life with cutting-edge technology
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-purple-500/50">
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
}
