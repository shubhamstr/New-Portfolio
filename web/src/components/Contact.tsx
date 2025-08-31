/* eslint-disable jsx-a11y/accessible-emoji */

const Contact = () => {
  return (
    <section className="py-16 bg-gray-50" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            Get In <span className="text-purple-600">Touch</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Have a project in mind or want to collaborate? I'd love to hear from
            you. Let's create something amazing together!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Let's Talk</h3>
            <p className="text-gray-600 mb-6">
              I'm always open to discussing new opportunities, creative ideas,
              or potential collaborations. Feel free to reach out through any of
              the following channels.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white p-4 shadow rounded-xl">
                <span className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                  📧
                </span>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-700">shubham.sutar@email.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 shadow rounded-xl">
                <span className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                  📞
                </span>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-700">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 shadow rounded-xl">
                <span className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                  📍
                </span>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-700">Pune, Maharashtra, India</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Follow Me</h4>
              <div className="flex gap-4">
                <a
                  href="/"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-purple-600 hover:text-white transition"
                >
                  🌐
                </a>
                <a
                  href="/"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-purple-600 hover:text-white transition"
                >
                  💼
                </a>
                <a
                  href="/"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-purple-600 hover:text-white transition"
                >
                  🐦
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="What's this about?"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <textarea
                placeholder="Tell me about your project or how I can help you..."
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition"
              >
                🚀 Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

}

export default Contact