/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/accessible-emoji */
import { useEffect } from "react";
import { useApi } from "../hooks/useApi";

const OtherProjects = () => {
  const { data: projectsData, loading: projectsLoading, callApi: getProjects }: any = useApi();
  const { data: urlData, callApi: getURLs }: any = useApi();

  useEffect(() => {
    getURLs({
      url: "/get/URLs",
      method: "GET",
    });
    getProjects({
      url: "/get/projects",
      method: "GET",
    });
  }, []);

  return (
    <section className="py-16 bg-white" id="other-projects">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Other <span className="text-purple-600">Projects</span>
        </h2>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {!projectsLoading && projectsData.map((project: any) => (
            <div
              key={project.title}
              className={`bg-white shadow-md rounded-2xl overflow-hidden text-left border ${project.featured ? "hidden" : ""}`}
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
                  {project.techStacks && project.techStacks.map((t: any) => (
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
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    🔗 Live
                  </a>
                  <a
                    href={project.githubLink}
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
            href={urlData?.githubURL || '/'}
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