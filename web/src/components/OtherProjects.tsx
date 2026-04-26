/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/accessible-emoji */
// import { useEffect } from "react";
// import { useApi } from "../hooks/useApi";
import { useSkillsStore } from "../store/skillsStore";

const OtherProjects = () => {
  const skillsData = useSkillsStore((state) => state.skillsData);
  // const { data: projectsData, loading: projectsLoading, callApi: getProjects }: any = useApi();
  // const { data: urlData, callApi: getURLs }: any = useApi();

  // useEffect(() => {
  //   getURLs({
  //     url: "/get/URLs",
  //     method: "GET",
  //   });
  //   getProjects({
  //     url: "/get/projects",
  //     method: "GET",
  //   });
  // }, []);

  return (
    <section className="py-16 bg-white" id="other-projects">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Other <span className="text-purple-600">Projects</span>
        </h2>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {skillsData?.projects && skillsData.projects.map((project: any) => (
            <div
              key={project.title}
              className={`bg-white shadow-md rounded-2xl overflow-hidden text-left border ${project.type === "others" ? "" : "hidden"}`}
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
                  {Array.isArray(project.githubLink) && project.githubLink.length > 0 ? (
                    <div className="relative inline-block group">
                      <button className="flex items-center gap-1 text-gray-700">
                        💻 Code ▾
                      </button>

                      <div className="absolute bottom-6 mt-1 z-10 min-w-[120px] bg-white shadow-md rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        {project.githubLink.map((link: any, index: any) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Code {index + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-700 hover:underline"
                    >
                      💻 Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );

}

export default OtherProjects