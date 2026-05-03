/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore, firebaseReady } from "../utils/firebase";
// import { useApi } from "../hooks/useApi";

const Contact = () => {
  // const { loading: contactsLoading, callApi: createContact }: any = useApi();
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  });

  const handleChange = ({ target }: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    console.log("Submitting contact form with data:", formData);

    if (!firebaseReady || !firestore) {
      setStatus({
        type: "error",
        message:
          "Firebase is not configured yet. Add your Firebase project values in web/src/utils/firebase.ts.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const resp = await addDoc(collection(firestore, "contactMessages"), {
        fullName: formData?.fullName || "",
        email: formData?.email || "",
        subject: formData?.subject || "Portfolio contact",
        message: formData?.message || "",
        createdAt: serverTimestamp(),
        source: "portfolio-contact-form",
      });
      console.log("Contact message saved with ID:", resp);

      setStatus({
        type: "success",
        message: "Message sent successfully and saved to Firebase.",
      });
      setFormData({});
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong while saving your message. Please try again.",
      });
      console.error("Failed to save contact message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900/60" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Get In <span className="text-purple-600">Touch</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Have a project in mind or want to collaborate? I'd love to hear from
            you. Let's create something amazing together!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Let's Talk</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              I'm always open to discussing new opportunities, creative ideas,
              or potential collaborations. Feel free to reach out through any of
              the following channels.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white p-4 shadow rounded-xl dark:bg-slate-800 dark:shadow-slate-950/40">
                <span role="img" aria-label="Email" className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                  📧
                </span>
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Email</p>
                  <p className="text-gray-700 dark:text-slate-200">shubhamsutar5799@gmail.com</p>
                </div>
              </div>
              <div className="hidden items-center gap-4 bg-white p-4 shadow rounded-xl">
                <span role="img" aria-label="Phone" className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                  📞
                </span>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-700">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 shadow rounded-xl dark:bg-slate-800 dark:shadow-slate-950/40">
                <span role="img" aria-label="Location" className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                  📍
                </span>
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Location</p>
                  <p className="text-gray-700 dark:text-slate-200">Pune, Maharashtra, India</p>
                </div>
              </div>
            </div>
            <div className="hidden mt-6">
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

          <div className="bg-white shadow rounded-2xl p-6 dark:bg-slate-800 dark:shadow-slate-950/40">
            <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  onChange={handleChange}
                  name="fullName"
                  value={formData?.fullName || ""}
                  type="text"
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
                <input
                  onChange={handleChange}
                  name="email"
                  value={formData?.email || ""}
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
              <input
                onChange={handleChange}
                name="subject"
                value={formData?.subject || ""}
                type="text"
                placeholder="What's this about?"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              />
              <textarea
                onChange={handleChange}
                value={formData?.message || ""}
                name="message"
                placeholder="Tell me about your project or how I can help you..."
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {status.message ? (
                <p
                  className={`text-sm ${
                    status.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status.message}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
