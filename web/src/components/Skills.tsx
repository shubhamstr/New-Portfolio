import { useSkillsStore } from '../store/skillsStore';

type SkillItem = {
  name: string;
  level: number;
  visible: boolean;
};

type CategoryConfig = {
  key: string;
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
};

const CATEGORIES: CategoryConfig[] = [
  {
    key: 'frontend',
    title: 'Frontend Development',
    icon: 'fa-solid fa-code',
    iconBg: 'bg-blue-50 dark:bg-blue-950/50',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    key: 'backend',
    title: 'Backend Development',
    icon: 'fa-solid fa-server',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    key: 'database',
    title: 'Database & Storage',
    icon: 'fa-solid fa-database',
    iconBg: 'bg-amber-50 dark:bg-amber-950/50',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    key: 'tools',
    title: 'Tools & Workflow',
    icon: 'fa-solid fa-screwdriver-wrench',
    iconBg: 'bg-purple-50 dark:bg-purple-950/50',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    key: 'concepts',
    title: 'Architecture & Concepts',
    icon: 'fa-solid fa-brain',
    iconBg: 'bg-rose-50 dark:bg-rose-950/50',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
  {
    key: 'cloud',
    title: 'Cloud & Infrastructure',
    icon: 'fa-solid fa-cloud',
    iconBg: 'bg-sky-50 dark:bg-sky-950/50',
    iconColor: 'text-sky-600 dark:text-sky-400',
  },
];

const getProficiency = (level: number) => {
  if (level >= 80) {
    return {
      label: 'Advanced',
      dotClass: 'bg-emerald-500',
      badgeClass:
        'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40',
    };
  }
  if (level >= 65) {
    return {
      label: 'Proficient',
      dotClass: 'bg-blue-500',
      badgeClass:
        'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
    };
  }
  return {
    label: 'Familiar',
    dotClass: 'bg-amber-500',
    badgeClass:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40',
  };
};

const Skills = () => {
  const skillsData = useSkillsStore((state) => state.skillsData);

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900/60" id="skills">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100 tracking-tight">
            My <span className="text-purple-600 dark:text-purple-400">Skills</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            A comprehensive overview of my technical stack, development tools, and engineering proficiencies.
          </p>

          {/* Proficiency Level Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-5 text-xs text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Advanced (80%+)
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Proficient (65-79%)
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Familiar (&lt;65%)
            </span>
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {CATEGORIES.map((category) => {
            const skillsList: SkillItem[] = skillsData?.skills?.[category.key] || [];
            const visibleCount = skillsList.filter((s) => s.visible).length;
            const existingNames = new Set(
              skillsList.map((s) => s.name.toLowerCase())
            );
            const othersList: string[] =
              category.key === 'tools'
                ? (skillsData?.skills?.others || []).filter(
                    (tech: string) => !existingNames.has(tech.toLowerCase())
                  )
                : [];
            const totalCount = visibleCount + othersList.length;

            return (
              <div
                key={category.key}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 dark:bg-slate-800 dark:border-slate-700/80 dark:shadow-slate-950/40 hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
              >
                {/* Category Header (Left Column on sm+) */}
                <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:w-44 md:w-48 flex-shrink-0 pb-3 sm:pb-0 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-700/60 w-full sm:pr-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${category.iconBg}`}
                  >
                    <i className={`${category.icon} text-lg ${category.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {totalCount} technologies
                    </p>
                  </div>
                </div>

                {/* Skills Chips (Right Side) */}
                <div className="flex-1 flex flex-wrap gap-2 w-full content-start py-0.5">
                  {skillsList.map((skill) => {
                    const proficiency = getProficiency(skill.level);

                    return (
                      <div
                        key={skill.name}
                        className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/70 hover:bg-white dark:hover:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-500/50 hover:shadow-xs transition-all duration-150 ${
                          skill.visible ? '' : 'hidden'
                        }`}
                        title={`${skill.name} • ${proficiency.label} (${skill.level}%)`}
                      >
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${proficiency.dotClass}`} />
                        <span className="font-medium text-xs text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                  {othersList.map((tech) => (
                    <div
                      key={tech}
                      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/70 hover:bg-white dark:hover:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-500/50 hover:shadow-xs transition-all duration-150"
                      title={`${tech} • Tool & Technology`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-purple-500 dark:bg-purple-400" />
                      <span className="font-medium text-xs text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
