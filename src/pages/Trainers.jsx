import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Footer from "../components/Footer"


const Trainers = () => {
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTrainers = async () => {
      const { data, error } = await supabase
        .from("trainers")
        .select("*")
        .order("id", { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setTrainers(data)
      }

      setLoading(false)
    }

    fetchTrainers()
  }, [])

  return (
    <main>

      {/* Trainers Hero */}
      <section className="relative min-h-105 bg-[#05050f]">

        <div
          className="absolute inset-0 bg-[url('/trainer-hero.avif')] bg-cover bg-center"
        ></div>

        <div className="absolute inset-0 bg-[#05050f]/75"></div>

        <div className="relative z-10 mx-auto flex min-h-105 max-w-7xl items-center px-6 pt-20">
          <div>

            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              The Strivo Team
            </p>

            <h1 className="font-monst mt-4 text-5xl font-extrabold uppercase text-white md:text-6xl">
              Our Trainers
            </h1>

            <p className="font-roboto mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
              Meet the coaches who bring experience, energy and purpose to
              every training session at Strivo.
            </p>

          </div>
        </div>

      </section>


      {/* Meet Our Coaches */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-end gap-10 lg:grid-cols-2">

            {/* Heading */}
            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Meet The Team
              </p>

              <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-[#05050f] md:text-5xl">
                Coaches Who
                <br />
                Push You Further.
              </h2>
            </div>

            {/* Description */}
            <div>
              <p className="font-roboto max-w-xl text-lg leading-relaxed text-gray-600">
                Our trainers bring different areas of expertise, but they share the
                same goal: helping every member train with confidence, improve their
                performance and keep making progress.
              </p>

              <div className="mt-7 h-1 w-12 bg-red-500"></div>
            </div>

          </div>

        </div>
      </section>



      {/* Trainers Grid */}



      <section className="bg-gray-100 py-24">

        <div className="mx-auto max-w-7xl px-6">

          {/* Giving Feedback */}
          {loading && (
            <p className="py-10 text-center text-gray-600">
              Loading trainers...
            </p>
          )}

          {!loading && error && (
            <p className="py-10 text-center text-red-500">
              Unable to load trainers: {error}
            </p>
          )}


          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">


            {trainers.map((trainer) => (
              <div key={trainer.id} className="group bg-white">

                <div className="relative overflow-hidden">
                  <img
                    src={trainer.image_url || "/trainer-placeholder.webp"}
                    alt={trainer.name}
                    className="h-110 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute bottom-0 left-0 bg-red-500 px-6 py-2">
                    <p className="font-monst whitespace-nowrap text-xs font-bold uppercase tracking-wide text-white">
                      {trainer.specialties?.[0] || trainer.role}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-monst text-2xl font-bold uppercase text-[#05050f]">
                    {trainer.name}
                  </h3>

                  <p className="font-roboto mt-2 inline-block text-gray-500">
                    {trainer.role}
                  </p>

                  <Link
                    to={`/trainers/${trainer.name.toLowerCase().replaceAll(" ", "-")}`}
                    className="font-monst mt-6 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-[#05050f] transition hover:text-red-500"
                  >
                    View Profile
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>

              </div>
            ))}












          </div>

        </div>
      </section>


      {/* Trainers CTA */}
      <section className="relative overflow-hidden bg-[#05050f] py-24">
        <div className="absolute inset-0">
          <img
            src="/trainers-cta.webp"
            alt=""
            className="h-full w-full object-cover opacity-25"
          />

          <div className="absolute inset-0 bg-[#05050f]/80"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">

            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Train With The Best
            </p>

            <h2 className="font-monst mt-4 text-4xl font-extrabold uppercase leading-tight text-white md:text-6xl">
              Find The Right
              <br />
              Coach For You.
            </h2>

            <p className="font-roboto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Whether you're building strength, improving your fitness or working
              toward a specific goal, our coaches are ready to help you take the
              next step.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                to="/booking"
                className="font-monst inline-flex items-center gap-3 bg-red-500 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#05050f]"
              >
                Book a session
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

              <Link
                to="/classes"
                className="font-monst inline-flex items-center gap-3 border border-white/30 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:border-red-500 hover:bg-red-500"
              >
                Explore classes
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

            </div>

          </div>
        </div>
      </section>

      <Footer />






    </main>
  )
}

export default Trainers

