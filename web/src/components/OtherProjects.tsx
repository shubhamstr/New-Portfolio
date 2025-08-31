/* eslint-disable jsx-a11y/accessible-emoji */

const OtherProjects = () => {
  const projects = [
    {
      title: "Restaurant Website",
      description:
        "A responsive restaurant website with online reservation system, menu display, and customer review management.",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      tech: ["HTML/CSS", "JavaScript", "PHP"],
      liveLink: "#",
      codeLink: "#",
    },
    {
      title: "Portfolio Dashboard",
      description:
        "A dynamic portfolio dashboard for showcasing projects, skills, and achievements with admin panel for content management.",
      image:
        "https://images.unsplash.com/photo-1581091870636-66c8a9b8fa03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      tech: ["React.js", "Laravel", "MySQL"],
      liveLink: "#",
      codeLink: "#",
    },
    {
      title: "Blog Platform",
      description:
        "A modern blog platform with content management system, SEO optimization, and social media integration.",
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      tech: ["WordPress", "PHP", "JavaScript"],
      liveLink: "#",
      codeLink: "#",
    },
    {
      title: "Weather App",
      description:
        "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      image:
        "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      tech: ["React.js", "Weather API", "Chart.js"],
      liveLink: "#",
      codeLink: "#",
    },
  ];

  return (
    <section className="py-16 bg-white" id="other-projects">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Other <span className="text-purple-600">Projects</span>
        </h2>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-white shadow-md rounded-2xl overflow-hidden text-left border"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 text-sm">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    🔗 Live
                  </a>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-700 hover:underline"
                  >
                    💻 Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-12">
          <p className="text-gray-600 mb-4">Want to see more of my work?</p>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white border border-purple-600 text-purple-600 rounded-lg shadow hover:bg-purple-600 hover:text-white transition"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );

}

export default OtherProjects