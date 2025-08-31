/* eslint-disable jsx-a11y/accessible-emoji */

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1c] text-gray-300 py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo + About */}
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              SS
            </div>
            <h2 className="text-lg font-semibold text-white">Shubham Sutar</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Full Stack Web Developer passionate about creating beautiful,
            functional web experiences using modern technologies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-purple-400">Home</a></li>
            <li><a href="#about" className="hover:text-purple-400">About</a></li>
            <li><a href="#skills" className="hover:text-purple-400">Skills</a></li>
            <li><a href="#projects" className="hover:text-purple-400">Projects</a></li>
            <li><a href="#contact" className="hover:text-purple-400">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Web Development</li>
            <li>Frontend Development</li>
            <li>Backend Development</li>
            <li>Database Design</li>
            <li>API Integration</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
        <p>© 2024 Shubham Sutar. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          Made with <span className="text-red-500">❤️</span> in Pune, India
        </p>
      </div>
    </footer>
  );

}

export default Footer