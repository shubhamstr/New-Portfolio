/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSkillsStore } from "../store/skillsStore";

const Tools = () => {
  const skillsData = useSkillsStore((state) => state.skillsData);

  return (
    <section className="py-16 bg-white dark:bg-slate-950" id="tools">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Tools I Built for <span className="text-purple-600">Developers</span>
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {skillsData?.projects &&
            skillsData.projects.map((project: any) => (
              <div
                key={project.title}
                className={`bg-white shadow-md rounded-2xl overflow-hidden text-left border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:shadow-slate-950/40 ${
                  project.type === "tools" ? "" : "hidden"
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 dark:text-slate-300">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.techStacks &&
                      project.techStacks.map((t: any) => (
                        <span
                          key={t}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full dark:bg-slate-700 dark:text-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                  </div>

                  <div className="flex gap-4 text-sm">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline dark:text-sky-400"
                    >
                      Live
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-700 hover:underline dark:text-slate-200"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-12">
          <p className="text-gray-600 mb-4 dark:text-slate-300">
            Want to see more of my work?
          </p>
          <a
            href={skillsData?.URLs?.githubURL || "/"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white border border-purple-600 text-purple-600 rounded-lg shadow hover:bg-purple-600 hover:text-white transition dark:bg-slate-800 dark:text-purple-300 dark:border-purple-400 dark:hover:bg-purple-600 dark:hover:text-white"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Tools;
