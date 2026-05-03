import { useState } from "react";

type HeaderProps = {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

const Header = ({ isDarkMode, onToggleDarkMode }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-md backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="max-w-6xl container mx-auto flex items-center justify-between py-3 px-4 md:px-0">
        {/* Logo / Brand */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
            SS
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Shubham Sutar</h2>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-slate-600 dark:text-slate-300 font-medium">
          <a href="#home" className="hover:text-purple-500 transition">Home</a>
          <a href="#skills" className="hover:text-purple-500 transition">Skills</a>
          <a href="#projects" className="hover:text-purple-500 transition">Projects</a>
          <a href="#tools" className="hover:text-purple-500 transition">Tools</a>
          <a href="#contact" className="hover:text-purple-500 transition">Contact</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            onClick={onToggleDarkMode}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m8.66-10h-2M5.34 12h-2m13.89 5.66-1.41-1.41M7.58 7.58 6.17 6.17m10.24 0-1.41 1.41M7.58 16.42l-1.41 1.41M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 dark:text-gray-200"
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-white shadow-md dark:border-slate-800 dark:bg-slate-950">
          <ul className="flex flex-col space-y-2 py-3 px-4">
            <li>
              <a href="#home" className="block text-slate-700 hover:text-purple-500 dark:text-slate-300 transition" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            </li>
            <li>
              <a href="#skills" className="block text-slate-700 hover:text-purple-500 dark:text-slate-300 transition" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
            </li>
            <li>
              <a href="#projects" className="block text-slate-700 hover:text-purple-500 dark:text-slate-300 transition" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
            </li>
            <li>
              <a href="#tools" className="block text-slate-700 hover:text-purple-500 dark:text-slate-300 transition" onClick={() => setIsMobileMenuOpen(false)}>Tools</a>
            </li>
            <li>
              <a href="#contact" className="block text-slate-700 hover:text-purple-500 dark:text-slate-300 transition" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
