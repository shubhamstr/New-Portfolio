const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">

        {/* Logo / Brand */}
        <a href="/" className="text-2xl font-bold text-primary-500">
          Shubham Sutar
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-secondary-500 font-medium">
          <a href="#home" className="hover:text-primary-500">Home</a>
          <a href="#about" className="hover:text-primary-500">About</a>
          <a href="#skills" className="hover:text-primary-500">Skills</a>
          <a href="#projects" className="hover:text-primary-500">Projects</a>
          <a href="#contact" className="hover:text-primary-500">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header