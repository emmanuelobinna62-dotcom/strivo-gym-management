import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Footer from "../components/Footer"
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

const Classes = () => {

  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true)
      setError("")

      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("id", { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setClasses(data)
      }

      setLoading(false)
    }

    fetchClasses()
  }, [])


  if (loading) {
    return (
      <main className="bg-[#05050f] px-6 py-32 text-center text-white">
        Loading classes...
      </main>
    )
  }

  if (error) {
    return (
      <main className="bg-[#05050f] px-6 py-32 text-center text-white">
        <p className="text-red-500">{error}</p>
      </main>
    )
  }

  return (
    <main>

      {/* Hero section  */}
      <section className="relative min-h-105 bg-[#05050f]">
        <div
          className="absolute inset-0 bg-[url('/functional.webp')] bg-cover bg-center"
        ></div>

        <div className="absolute inset-0 bg-[#05050f]/75"></div>

        <div className="relative z-10 mx-auto flex min-h-105 max-w-7xl items-center px-6 pt-20">
          <div>
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Train Your Way
            </p>

            <h1 className="font-monst mt-4 text-5xl font-extrabold uppercase text-white md:text-6xl">
              Our Classes
            </h1>

            <p className="font-roboto mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
              From strength and conditioning to boxing and mobility, find
              training designed to challenge you and keep you moving forward.
            </p>
          </div>
        </div>
      </section>



      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Train With Purpose
              </p>

              <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-[#05050f] md:text-5xl">
                Training Built
                <br />
                Around You.
              </h2>
            </div>

            <div>
              <p className="font-roboto max-w-xl text-lg leading-relaxed text-gray-600">
                Whether you're building strength, improving your conditioning or
                working on movement, our classes are designed to give you structured
                training, expert coaching and a clear path to progress.
              </p>

              <div className="mt-7 h-1 w-12 bg-red-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* The Classes  */}

      <section className="bg-[#f5f5f5] py-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Section Heading */}
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Training Catalogue
              </p>

              <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-[#05050f] md:text-5xl">
                Find Your
                <br />
                Training.
              </h2>
            </div>

            <p className="font-roboto max-w-md text-lg leading-relaxed text-gray-600">
              Choose from focused training programs built around strength,
              conditioning, movement and performance.
            </p>
          </div>

          {/* Classes List */}
          <div className="space-y-6">


            {classes.length === 0 ? (
              <p className="py-12 text-center text-gray-600">
                No classes are available at the moment.
              </p>
            ) : (
              classes.map((gymClass, index) => (
                <div
                  key={gymClass.id}
                  className="group overflow-hidden bg-white"
                >
                  <div className="grid lg:grid-cols-[80px_1fr_320px]">
                    <div className="hidden items-center justify-center bg-[#05050f] lg:flex">
                      <span className="font-monst text-sm font-bold text-gray-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="p-8 md:p-10">
                      <div className="mb-4 flex items-center gap-4">
                        <span className="font-monst text-xs font-bold uppercase tracking-wider text-red-500">
                          Training
                        </span>

                        <span className="h-px w-8 bg-gray-300"></span>

                        <span className="font-roboto text-sm text-gray-500">
                          {gymClass.duration_minutes} Min
                        </span>
                      </div>

                      <h3 className="font-monst text-2xl font-bold uppercase text-[#05050f] md:text-3xl">
                        {gymClass.name}
                      </h3>

                      <p className="font-roboto mt-4 max-w-2xl leading-relaxed text-gray-600">
                        {gymClass.description || "Details for this class will be available soon."}
                      </p>

                      <Link
                        to={`/booking?class=${gymClass.id}`}
                        className="font-monst mt-7 inline-flex items-center gap-3 text-sm font-bold uppercase text-[#05050f] transition duration-300 group-hover:text-red-500"
                      >
                        Book A Class
                        <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    </div>

                    <div className="flex h-64 items-center justify-center bg-[#e5e5e5] lg:h-auto">
                      <span className="font-monst text-sm font-bold uppercase tracking-wider text-gray-500">
                        {gymClass.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}



          </div>
          
        </div>
      </section>

      {/* CTA  */}

      <section className="relative overflow-hidden bg-[#05050f] py-24">
        <div className="absolute inset-0">
          {/* <img
            src="/classes-cta.webp"
            alt="Training at Strivo"
            className="h-full w-full object-cover"
          /> */}
        </div>

        <div className="absolute inset-0 bg-[#05050f]/75"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Ready To Train?
            </p>

            <h2 className="font-monst mt-4 text-4xl font-extrabold uppercase leading-tight text-white md:text-6xl">
              Find Your
              <br />
              Next Challenge.
            </h2>

            <p className="font-roboto mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
              Choose a class, book your session and start training with a program
              built to help you keep progressing.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="font-monst inline-flex items-center gap-3 bg-red-500 px-7 py-4 text-sm font-bold uppercase text-white transition duration-300 hover:bg-red-600"
              >
                Book A Class
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

              <Link
                to="/schedule"
                className="font-monst inline-flex items-center gap-3 border border-white/40 px-7 py-4 text-sm font-bold uppercase text-white transition duration-300 hover:border-white hover:bg-white hover:text-[#05050f]"
              >
                View Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />



    </main>
  )
}

export default Classes