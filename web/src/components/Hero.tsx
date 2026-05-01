// import { useEffect } from "react";
// import { useApi } from "../hooks/useApi";
import hero_img from '../assets/hero_img.png'
import { useSkillsStore } from "../store/skillsStore";

const Hero = () => {
  const skillsData = useSkillsStore((state) => state.skillsData);
  const socialLinks = [
    {
      key: "githubURL",
      icon: "fa-brands fa-github text-gray-700",
      label: "GitHub",
    },
    {
      key: "linkedInURL",
      icon: "fa-brands fa-linkedin text-blue-600",
      label: "LinkedIn",
    },
    // {
    //   key: "twitterURL",
    //   icon: "fa-brands fa-twitter text-sky-500",
    //   label: "Twitter",
    // },
    {
      key: "codepenURL",
      icon: "fa-solid fa-code text-purple-600",
      label: "CodePen",
    },
    {
      key: "stackOverFlowURL",
      icon: "fa-brands fa-stack-overflow text-orange-500",
      label: "Stack Overflow",
    },
    {
      key: "mediumURL",
      icon: "fa-brands fa-medium text-gray-900",
      label: "Medium",
    },
    {
      key: "freeCodeCampURL",
      icon: "fa-brands fa-free-code-camp text-green-600",
      label: "freeCodeCamp",
    },
    {
      key: "devToURL",
      icon: "fa-brands fa-dev text-gray-800",
      label: "DEV",
    },
    {
      key: "leetcodeURL",
      icon: "fa-solid fa-code text-yellow-600",
      label: "LeetCode",
    },
    {
      key: "dockerURL",
      icon: "fa-brands fa-docker text-sky-600",
      label: "Docker Hub",
    },
    {
      key: "hackerEarthURL",
      icon: "fa-solid fa-laptop-code text-indigo-600",
      label: "HackerEarth",
    },
    {
      key: "hackerRankURL",
      icon: "fa-brands fa-hackerrank text-green-700",
      label: "HackerRank",
    },
    {
      key: "bitbucketURL",
      icon: "fa-brands fa-bitbucket text-blue-700",
      label: "Bitbucket",
    },
    {
      key: "gitlabURL",
      icon: "fa-brands fa-gitlab text-orange-600",
      label: "GitLab",
    },
  ] as const;
  // const { data: urlData, callApi: getURLs }: any = useApi();

  // useEffect(() => {
  //   getURLs({
  //     url: "/get/URLs",
  //     method: "GET",
  //   });
  // }, []);
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-purple-50 overflow-hidden px-4 md:px-0"
      id="home"
    >
      {/* Background gradient blur */}
      <div className="absolute -top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-purple-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-[32rem] sm:h-[32rem] bg-pink-400 opacity-20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl container mx-auto grid md:grid-cols-2 items-center gap-8 md:gap-12 relative z-10">
        {/* Left content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900">
            Hi, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              I'm Shubham Sutar,
            </span>
          </h1>
          <h2 className="mt-2 sm:mt-4 text-lg sm:text-xl text-gray-600">
            a Full Stack Web Developer with 5 years of experience building scalable and high-performance web applications.
          </h2>
          <p className="mt-2 sm:mt-4 text-gray-500 max-w-md sm:max-w-lg mx-auto md:mx-0">
            I specialize in JavaScript, React.js, PHP, and Tailwind CSS, focusing on clean architecture and responsive design.
          </p>
          <p className="text-gray-500 max-w-md sm:max-w-lg mx-auto md:mx-0">
            Based in Pune, I’m passionate about turning ideas into efficient, user-friendly digital products.
          </p>

          {/* Buttons */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center md:justify-start">
            <a
              href={skillsData?.URLs?.resumeURL || '/'}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
              target="_blank"
              rel="noreferrer"
            >
              {/* SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4v8" />
                <path d="M8 10l4 4 4-4" />
                <path d="M4 20h16" />
              </svg>
              View Resume
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-full border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition text-center"
            >
              View Projects
            </a>
          </div>

          {/* Social icons */}
          <div className="mt-4 sm:mt-8 flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
            {socialLinks.map((social) => {
              const href = skillsData?.URLs?.[social.key];

              if (!href) return null;

              return (
                <a
                  key={social.key}
                  href={href}
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <i className={`${social.icon} text-lg sm:text-xl`}></i>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right side card */}
        <div className="flex justify-center items-center mt-8 md:mt-0">
          <div className="relative">
            <div className="rounded-3xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition w-48 h-48 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <img
                src={hero_img}
                alt="hero_img"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-40 blur-3xl rounded-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Hero
