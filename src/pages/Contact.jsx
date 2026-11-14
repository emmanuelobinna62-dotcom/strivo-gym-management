import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"

// Edit your details here
const info = {
  email: "info@strivo.com",
  phone: "+1 (416) 555-0198",
  phoneHref: "tel:+14165550198",
  address: ["125 King Street West", "Toronto, ON"],
}

const hours = [
  { day: "Monday", time: "6:00 AM – 10:00 PM" },
  { day: "Tuesday", time: "6:00 AM – 10:00 PM" },
  { day: "Wednesday", time: "6:00 AM – 10:00 PM" },
  { day: "Thursday", time: "6:00 AM – 10:00 PM" },
  { day: "Friday", time: "6:00 AM – 10:00 PM" },
  { day: "Saturday", time: "8:00 AM – 6:00 PM" },
  { day: "Sunday", time: "8:00 AM – 6:00 PM" },
]

const topics = ["Membership", "Personal Training", "Classes", "General"]

const labelClass =
  "font-monst text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400"

const fieldClass =
  "mt-2 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 font-roboto text-base text-white outline-none transition-colors placeholder:text-gray-500 focus:border-red-500"

const Contact = () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" })

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    info.address.join(", ")
  )}`

  // Placeholder until Supabase is connected: stops the page reloading on submit
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main>

      {/* Hero */}
      <section className="relative bg-[#05050f]">
        <div className="absolute inset-0 bg-[url('/contact-hero.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-[#05050f]/80"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-36 md:pb-24 md:pt-44">
          <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
            Contact
          </p>

          <h1 className="font-monst mt-4 text-5xl font-extrabold uppercase leading-[1.05] text-white md:text-6xl">
            Get In Touch
          </h1>

          <p className="font-roboto mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
            Questions about memberships, classes or personal training?
            Send us a message and the team will get back to you.
          </p>
        </div>
      </section>


      {/* Details + Form */}
      <section
        id="contact-form"
        className="scroll-mt-24 bg-white px-6 py-24"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left: details */}
          <div>
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Reach Us
            </p>

            <h2 className="font-monst mt-4 text-3xl font-extrabold uppercase leading-tight text-[#05050f] md:text-5xl">
              How Can We Help?
            </h2>

            <p className="font-roboto mt-5 max-w-md text-lg leading-relaxed text-gray-600">
              Whether you are comparing memberships or ready to book your
              first session, we will point you in the right direction.
            </p>

            <div className="mt-10 space-y-8">

              <div className="border-l-4 border-red-500 pl-6">
                <p className="font-monst text-xs font-bold uppercase tracking-wider text-gray-500">
                  Email
                </p>
                <a
                  href={`mailto:${info.email}`}
                  className="font-roboto mt-2 inline-block break-words text-xl text-[#05050f] transition-colors hover:text-red-500"
                >
                  {info.email}
                </a>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <p className="font-monst text-xs font-bold uppercase tracking-wider text-gray-500">
                  Phone
                </p>
                <a
                  href={info.phoneHref}
                  className="font-roboto mt-2 inline-block text-xl text-[#05050f] transition-colors hover:text-red-500"
                >
                  {info.phone}
                </a>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <p className="font-monst text-xs font-bold uppercase tracking-wider text-gray-500">
                  Address
                </p>
                <address className="font-roboto mt-2 text-xl not-italic leading-snug text-[#05050f]">
                  {info.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="font-monst mt-10 inline-flex items-center justify-center gap-3 border border-[#05050f] px-8 py-4 text-sm font-bold uppercase text-[#05050f] transition duration-300 hover:bg-[#05050f] hover:text-white"
            >
              Get Directions
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>

          {/* Right: form panel */}
          <div className="bg-[#05050f] p-6 text-white sm:p-10">

            <h2 className="font-monst text-2xl font-extrabold uppercase md:text-3xl">
              Send Us A Message
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="name" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </div>

                <div className="min-w-0">
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <fieldset>
                <legend className={labelClass}>I am interested in</legend>

                <div className="mt-4 flex flex-wrap gap-3">
                  {topics.map((topic, i) => (
                    <label key={topic} className="cursor-pointer">
                      <input
                        type="radio"
                        name="topic"
                        value={topic}
                        defaultChecked={i === 0}
                        className="peer sr-only"
                      />
                      <span className="font-monst block border border-white/25 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-300 transition hover:border-white peer-checked:border-red-500 peer-checked:bg-red-500 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-red-500">
                        {topic}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="How can we help?"
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="font-monst inline-flex min-h-14 w-full items-center justify-center gap-3 bg-red-500 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Send Message
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>

                <p className="font-roboto mt-4 text-xs leading-relaxed text-gray-500">
                  We only use your details to reply to your message.
                </p>
              </div>

            </form>
          </div>

        </div>
      </section>


      {/* Opening hours + location */}
      <section className="bg-[#05050f] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-20">

          <div>
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Visit Us
            </p>

            <h2 className="font-monst mt-4 text-3xl font-extrabold uppercase leading-tight md:text-5xl">
              Opening Hours
            </h2>

            <ul className="mt-10 border-t border-white/10">
              {hours.map(({ day, time }) => {
                const isToday = day === today
                return (
                  <li
                    key={day}
                    className={`font-roboto flex items-center justify-between gap-4 border-b border-white/10 py-4 ${isToday ? "text-white" : "text-gray-400"
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 shrink-0 ${isToday ? "bg-red-500" : "bg-transparent"}`}
                        aria-hidden="true"
                      ></span>
                      {day}
                      {isToday && (
                        <span className="font-monst text-[10px] font-bold uppercase tracking-widest text-red-500">
                          Today
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 text-right">{time}</span>
                  </li>
                )
              })}
            </ul>
          </div>


          <div className="flex flex-col justify-between gap-8 border border-white/10 p-8 sm:p-10">
            <div>
              <p className={labelClass}>Find Us</p>

              <address className="font-monst mt-5 text-2xl font-bold uppercase not-italic leading-snug">
                {info.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            {/* Google Map */}

            <div className="h-64 w-full overflow-hidden">
              <iframe
                title="Strivo Gym Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.0218087169537!2d-79.38309749999999!3d43.6477146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d2f6116edd%3A0x5cab7f8f8ed6e8db!2s125%20King%20St%20W%2C%20Toronto%2C%20ON%20M5H%203T9%2C%20Canada!5e0!3m2!1sen!2sng!4v1791925009020!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>


            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="font-monst inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:text-red-500"
            >
              Get Directions
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>


        </div>
      </section>

      {/* CTA  */}
      <section className="relative overflow-hidden bg-[#05050f] px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-5xl text-center">

          <p className="font-monst text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Your Move Starts Here
          </p>

          <h2 className="font-monst mt-5 text-3xl font-extrabold uppercase leading-tight sm:text-4xl md:text-6xl">
            Your Goals. <span className="text-red-500">Your Next Move.</span>
          </h2>

          <p className="font-roboto mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
            Whether you're building strength, improving endurance, or starting
            fresh, Strivo gives you the space and support to move forward.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              to="/membership"
              className="font-monst inline-flex items-center justify-center gap-3 bg-red-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-600"
            >
              Explore Memberships
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>

            <Link
              to="/booking"
              className="font-monst inline-flex items-center justify-center gap-3 border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-red-500 hover:text-red-500"
            >
              Book a Session
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>

          </div>
        </div>
      </section>

      <Footer />
      

    </main>
  )
}

export default Contact