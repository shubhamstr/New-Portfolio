/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from "react";
// import { useApi } from "../hooks/useApi";
import { useSkillsStore } from "../store/skillsStore";

const Projects = () => {
  const skillsData = useSkillsStore((state) => state.skillsData);
  // const { data: projectsData, loading: projectsLoading, callApi: getProjects }: any = useApi();

  // useEffect(() => {
  //   getProjects({
  //     url: "/get/projects",
  //     method: "GET",
  //   });
  // }, []);

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
          {skillsData?.projects &&
            skillsData.projects.map((project: any) => (
              <div
                key={project.title}
                className={`bg-white shadow-lg rounded-2xl overflow-hidden text-left relative ${project.type === "featured" ? "" : "hidden"
                  }`}
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-52 object-cover"
                  />
                  {project.inProgress && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end">
                      <div className="w-full p-4 text-left">
                        <span className="inline-flex items-center rounded-full bg-amber-400/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-md">
                          In Progress
                        </span>
                        <p className="mt-2 text-sm text-white/90">
                          This project is currently being built and will be updated soon.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {project.inProgress && (
                      <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="mb-4 text-gray-600">{project.description}</p>

                  {/* Tech tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project?.techStacks &&
                      project.techStacks.map((t: any) => (
                        <span
                          key={t}
                          className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <a
                      href={project.demoLink ? project.demoLink : undefined}
                      target={project.demoLink ? "_blank" : undefined}
                      rel={project.demoLink ? "noopener noreferrer" : undefined}
                      onClick={(e) => !project.demoLink && e.preventDefault()}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${project.demoLink
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "cursor-not-allowed bg-gray-300 text-gray-500"
                        }`}
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
