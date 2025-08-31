import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl container mx-auto flex items-center justify-between py-3 px-4 md:px-0">
        {/* Logo / Brand */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
            SS
          </div>
          <h2 className="text-2xl font-bold text-primary-500">Shubham Sutar</h2>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-secondary-500 font-medium">
          <a href="#home" className="hover:text-primary-500 transition">Home</a>
          <a href="#skills" className="hover:text-primary-500 transition">Skills</a>
          <a href="#projects" className="hover:text-primary-500 transition">Projects</a>
          <a href="#contact" className="hover:text-primary-500 transition">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-2 py-3 px-4">
            <li>
              <a href="#home" className="block hover:text-primary-500 transition" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            </li>
            <li>
              <a href="#skills" className="block hover:text-primary-500 transition" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
            </li>
            <li>
              <a href="#projects" className="block hover:text-primary-500 transition" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
            </li>
            <li>
              <a href="#contact" className="block hover:text-primary-500 transition" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header