/* eslint-disable jsx-a11y/accessible-emoji */

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution built with React.js, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      tech: ["React.js", "Node.js", "MongoDB", "Stripe API"],
      liveLink: "#",
      codeLink: "#",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image:
        "https://images.unsplash.com/photo-1584697964199-1d64b6d6f0f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      tech: ["React.js", "PHP", "MySQL", "Socket.io"],
      liveLink: "#",
      codeLink: "#",
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="projects">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Featured <span className="text-purple-600">Projects</span>
        </h2>
        <p className="text-gray-600 mb-12">
          Here are some of my recent projects that showcase my skills in
          full-stack development.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-white shadow-lg rounded-2xl overflow-hidden text-left"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
                  >
                    🚀 Live Demo
                  </a>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-100 transition"
                  >
                    💻 Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

}

export default Projects