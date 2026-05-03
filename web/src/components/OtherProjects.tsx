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
    <section className="py-16 bg-white dark:bg-slate-950" id="other-projects">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Other <span className="text-purple-600">Projects</span>
        </h2>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {skillsData?.projects && skillsData.projects.map((project: any) => (
            <div
              key={project.title}
              className={`bg-white shadow-md rounded-2xl overflow-hidden text-left border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-slate-950/40 ${project.type === "others" ? "" : "hidden"}`}
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
                {project.inProgress && (
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent">
                    <div className="w-full p-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/50 bg-slate-950/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300 backdrop-blur-sm shadow-lg">
                        <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.2)]" />
                        In Progress
                      </div>
                      <p className="mt-2 max-w-[14rem] text-xs leading-5 text-white/90">
                        This project is currently being built and will be updated soon.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">
                    {project.title}
                  </h3>
                  {/* {project.inProgress && (
                    <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700 shadow-sm">
                      In Progress
                    </span>
                  )} */}
                </div>
                <p className="text-gray-600 text-sm mb-3 dark:text-slate-300">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStacks && project.techStacks.map((t: any) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full dark:bg-slate-700 dark:text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 text-sm">
                  <a
                    href={project.demoLink || "#"}
                    target={project.demoLink ? "_blank" : undefined}
                    rel={project.demoLink ? "noopener noreferrer" : undefined}
                    className={`flex items-center gap-1 ${project.demoLink
                      ? "text-blue-600 hover:underline"
                      : "text-gray-400 cursor-not-allowed pointer-events-none"
                      }`}
                  >
                    🔗 Live
                  </a>
                  {Array.isArray(project.githubLink) && project.githubLink.length > 0 ? (
                    <div className="relative inline-block group">
                      <button className="flex items-center gap-1 text-gray-700 dark:text-slate-200">
                        💻 Code ▾
                      </button>

                      <div className="absolute bottom-6 mt-1 z-10 min-w-[120px] bg-white shadow-md rounded border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 dark:bg-slate-900 dark:border-slate-700 dark:shadow-slate-950/40">
                        {project.githubLink.map((link: any, index: any) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-800"
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
                      className="flex items-center gap-1 text-gray-700 hover:underline dark:text-slate-200"
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
