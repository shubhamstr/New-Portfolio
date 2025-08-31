import hero_img from '../assets/hero_img.png'
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-purple-50 overflow-hidden" id='home'>
      {/* Background gradient blur */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-pink-400 opacity-20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 grid md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Left content */}
        <div>
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Hello, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              I'm Shubham Sutar
            </span>
          </h1>
          <h2 className="mt-4 text-xl text-gray-600">Full Stack Web Developer</h2>
          <p className="mt-4 text-gray-500 max-w-lg">
            I create beautiful, responsive websites using modern technologies like
            JavaScript, PHP, React.js, and Bootstrap. Based in Pune, India, I'm
            passionate about bringing digital ideas to life.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <a
              href="#resume"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              View Resume
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-full border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
            >
              View Projects
            </a>
          </div>

          {/* Social icons */}
          <div className="mt-8 flex space-x-4">
            <a href="/" className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md">
              <i className="fa-brands fa-github text-gray-700"></i>
            </a>
            <a href="/" className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md">
              <i className="fa-brands fa-linkedin text-blue-600"></i>
            </a>
            <a href="/" className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md">
              <i className="fa-brands fa-twitter text-sky-500"></i>
            </a>
            <a href="/" className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md">
              <i className="fa-solid fa-code text-purple-600"></i>
            </a>
          </div>
        </div>

        {/* Right side card */}
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="rounded-3xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition">
              <img
                src={hero_img}
                alt="hero_img"
                className="w-34 h-34 md:w-96 md:h-96 object-cover object-top"
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