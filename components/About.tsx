import { stats } from "@/data/data"

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center text-white text-6xl font-bold">
              AI
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Passionate AI Developer & Problem Solver
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a dedicated AI developer with expertise in machine learning, deep learning, and modern web
              technologies. My journey in technology started with a curiosity about how intelligent systems work, and it
              has evolved into a passion for creating innovative solutions that make a real impact.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              With experience in Python, JavaScript, React, Next.js, and various AI frameworks, I enjoy building
              end-to-end solutions that combine the power of artificial intelligence with intuitive user experiences.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
