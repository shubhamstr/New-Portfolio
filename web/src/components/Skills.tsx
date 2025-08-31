/* eslint-disable jsx-a11y/accessible-emoji */

const Skills = () => {
  const skills = {
    frontend: [
      { name: "React.js", level: 85, visible: true },
      { name: "JavaScript", level: 80, visible: true },
      { name: "Tailwind CSS", level: 80, visible: true },
      { name: "HTML/CSS", level: 90, visible: true },
      { name: "Bootstrap", level: 90, visible: true },
      { name: "jQuery", level: 80, visible: false },
      { name: "React Native", level: 70, visible: true },
      { name: "Angular", level: 40, visible: false },
    ],
    backend: [
      { name: "Node.js", level: 75, visible: true },
      { name: "Express.js", level: 90, visible: true },
      { name: "PHP", level: 80, visible: true },
      { name: "Laravel", level: 70, visible: false },
      { name: "CodeIgniter", level: 50, visible: false },
      { name: "Python", level: 40, visible: true },
      { name: "SQL", level: 80, visible: true },
      { name: "NoSQL", level: 70, visible: true },
    ],
    database: [
      { name: "MySQL", level: 80, visible: true },
      { name: "MongoDB", level: 70, visible: true },
      { name: "Jira", level: 90, visible: true },
      { name: "Docker", level: 65, visible: true },
      { name: "Git", level: 90, visible: true },
      { name: "GitHub", level: 90, visible: true },
      { name: "BitBucket", level: 90, visible: true },
      { name: "GitLab", level: 90, visible: false },
    ],
    others: [
      "AWS",
      "npm",
      "yarn",
      "composer",
      "FileZilla",
      "MongoDB Compass",
      "PHPMyAdmin",
    ],
  };

  return (
    <section className="py-16 bg-gray-50" id="skills">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          My <span className="text-purple-600">Skills</span>
        </h2>
        <p className="text-gray-600 mb-12">
          I specialize in full-stack web development with a focus on modern
          technologies and best practices.
        </p>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Frontend */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-blue-600">💻</span> Frontend Development
            </h3>
            {skills.frontend.map((skill) => (
              <div key={skill.name} className={`mb-4 ${skill.visible ? '' : 'hidden'}`}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-gray-600 text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Backend */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-green-600">⚙️</span> Backend Development
            </h3>
            {skills.backend.map((skill) => (
              <div key={skill.name} className={`mb-4 ${skill.visible ? '' : 'hidden'}`}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-gray-600 text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Database & Tools */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-purple-600">🗄️</span> Database & Tools
            </h3>
            {skills.database.map((skill) => (
              <div key={skill.name} className={`mb-4 ${skill.visible ? '' : 'hidden'}`}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-gray-600 text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Technologies */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6">Other Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.others.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white shadow rounded-full text-gray-700 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills