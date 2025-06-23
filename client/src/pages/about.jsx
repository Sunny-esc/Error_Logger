import Footer from '../assets/footer';
import Header from '../assets/header';
import x1 from '../assets/img/x1.jpg';

export default function About() {
  return (
    <>
      <Header />
      <div className="py-16">
        <div className="container m-auto px-6 mt-20  md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            {/* Image Section */}
            <div className="md:5/12 lg:w-5/12">
              <img src={x1} alt="Error Logger Preview" className="rounded-xl shadow-md" />
            </div>

            {/* Content Section */}
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-3xl  font-bold md:text-4xl">
                About Error Logger
              </h2>

              <p className="mt-6 ">
                Error Logger is a modern web-based tool built with the MERN stack to help developers log, manage,
                and track their coding issues and bugs in one place. Whether you're debugging a frontend app or tracing a backend issue,
                Error Logger offers a clean interface to save your thoughts, code snippets, and timestamps.
              </p>

              <h3 className="mt-6 text-xl font-semibold ">🔐 Secure & User-Centric</h3>
              <p className="mt-2 ">
                All logs are tied to a verified user account, ensuring your notes are private and accessible only to you.
                Email verification via Nodemailer and JWT adds an extra layer of security.
              </p>

              <h3 className="mt-6 text-xl font-semibold ">⚙️ Powerful Code Editor</h3>
              <p className="mt-2 ">
                With CodeMirror integration, users can write and save rich code snippets — syntax-highlighted and ready for reuse.
              </p>

              <h3 className="mt-6 text-xl font-semibold ">📈 Designed for Productivity</h3>
              <p className="mt-2 ">
                Whether you're working solo or collaboratively, Error Logger is your companion for staying organized through debugging sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
