/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useApi } from "../hooks/useApi";
import hero_img from '../assets/hero_img.png'

const Hero = () => {
  const { data: urlData, callApi: getURLs }: any = useApi();

  useEffect(() => {
    getURLs({
      url: "/get/URLs",
      method: "GET",
    });
  }, []);
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
            Hello, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              I'm Shubham Sutar
            </span>
          </h1>
          <h2 className="mt-2 sm:mt-4 text-lg sm:text-xl text-gray-600">
            Full Stack Web Developer
          </h2>
          <p className="mt-2 sm:mt-4 text-gray-500 max-w-md sm:max-w-lg mx-auto md:mx-0">
            I create beautiful, responsive websites using modern technologies like
            JavaScript, PHP, React.js, and Tailwind. Based in Pune, India, I'm
            passionate about bringing digital ideas to life.
          </p>

          {/* Buttons */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center md:justify-start">
            <a
              href={urlData?.resumeURL || '/'}
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
          <div className="mt-4 sm:mt-8 flex justify-center md:justify-start space-x-3 sm:space-x-4">
            <a
              href={urlData?.githubURL || '/'}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github text-gray-700"></i>
            </a>
            <a
              href={urlData?.linkedInURL || '/'}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin text-blue-600"></i>
            </a>
            <a
              href={urlData?.twitterURL || '/'}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-twitter text-sky-500"></i>
            </a>
            <a
              href={urlData?.codepenURL || '/'}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-solid fa-code text-purple-600"></i>
            </a>
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