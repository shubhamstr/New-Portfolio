/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/accessible-emoji */
import { useEffect } from "react";
import { useApi } from "../hooks/useApi";

const Projects = () => {
  const { data: projectsData, loading: projectsLoading, callApi: getProjects }: any = useApi();

  useEffect(() => {
    getProjects({
      url: "/get/projects",
      method: "GET",
    });
  }, []);

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
          {!projectsLoading && projectsData.map((project: any) => (
            <div
              key={project.title}
              className={`bg-white shadow-lg rounded-2xl overflow-hidden text-left ${project.featured ? "" : "hidden"}`}
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
                  {project?.techStacks && project.techStacks.map((t: any) => (
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
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition"
                  >
                    🚀 Live Demo
                  </a>
                  <a
                    href={project.githubLink}
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