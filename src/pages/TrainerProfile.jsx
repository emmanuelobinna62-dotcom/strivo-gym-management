import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faArrowLeft,
  faStar
} from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabase"
import Footer from "../components/Footer"

const TrainerProfile = () => {
  const [currentReview, setCurrentReview] = useState(0)

  const { slug } = useParams()

  const [trainer, setTrainer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTrainer = async () => {
      setLoading(true)
      setError("")

      const trainerName = slug.replaceAll("-", " ")

      const { data, error } = await supabase
        .from("trainers")
        .select("*")
        .ilike("name", trainerName)
        .maybeSingle()

      if (error) {
        setError(error.message)
      } else if (!data) {
        setError("Trainer not found.")
      } else {
        setTrainer(data)
      }

      setLoading(false)
    }

    fetchTrainer()
  }, [slug])

  const reviews = [
    {
      name: "Jordan Mitchell",
      memberSince: "Member since 2024",
      text: "Marcus completely changed the way I approach strength training. His attention to technique and progression has made a huge difference.",
    },
    {
      name: "Alex Turner",
      memberSince: "Member since 2023",
      text: "The sessions are challenging but always purposeful. Marcus knows when to push and when to focus on technique.",
    },
    {
      name: "Daniel Brooks",
      memberSince: "Member since 2022",
      text: "Marcus creates structured sessions that keep me motivated and progressing every week.",
    },
    {
      name: "Ryan Carter",
      memberSince: "Member since 2024",
      text: "I have become much stronger and more confident since starting my training with Marcus.",
    },
  ]


  if (loading) {
    return (
      <main className="bg-[#05050f] px-6 py-32 text-center text-white">
        Loading trainer profile...
      </main>
    )
  }

  if (error) {
    return (
      <main className="bg-[#05050f] px-6 py-32 text-center text-white">
        <p className="text-red-500">{error}</p>

        <Link
          to="/trainers"
          className="mt-6 inline-block text-white underline"
        >
          Back To Trainers
        </Link>
      </main>
    )
  }


  return (
    <main>

      {/* Trainer Profile Hero */}
      <section className="bg-[#05050f] pt-20">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

            {/* Content */}
            <div>

              <Link
                to="/trainers"
                className="font-monst inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-gray-400 transition hover:text-red-500"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back To Trainers
              </Link>

              <p className="font-monst mt-12 text-sm font-bold uppercase tracking-wider text-red-500">
                Trainer Profile
              </p>

              <h1 className="font-monst mt-4 text-5xl font-extrabold uppercase leading-tight text-white md:text-6xl">
                {trainer.name}
              </h1>

              <p className="font-monst mt-5 text-lg font-bold uppercase tracking-wide text-gray-300">
                {trainer.role}
              </p>

              <p className="font-roboto mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
                {trainer.bio ||
                  `${trainer.name} helps members improve their fitness and work towards their training goals.`}
              </p>

              <div className="mt-8">
                <p className="font-monst text-sm font-bold uppercase tracking-wider text-gray-500">
                  Specialty
                </p>

                <p className="font-roboto mt-2 text-gray-300">
                  {trainer.specialties?.join(", ") || trainer.role}
                </p>
              </div>

              <Link
                to="/booking"
                className="font-monst mt-9 inline-flex items-center gap-3 bg-red-500 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#05050f]"
              >
                Book A Session
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

            </div>


            {/* Image */}
            <div className="relative">

              <div className="absolute -right-4 -top-4 h-28 w-28 border-r-4 border-t-4 border-red-500"></div>
              <img
                src={trainer.image_url || "/trainer-placeholder.webp"}
                alt={trainer.name}
                className="relative z-10 h-140 w-full object-cover"
              />

              <div className="absolute -bottom-4 -left-4 h-28 w-28 border-b-4 border-l-4 border-red-500"></div>

            </div>

          </div>

        </div>

      </section>

      {/* About Trainer */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">

            {/* Heading */}
            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                About {trainer.name}
              </p>

              <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-[#05050f] md:text-5xl">
                Strength
                <br />
                With Purpose.
              </h2>

              <div className="mt-8 h-1 w-12 bg-red-500"></div>
            </div>


            {/* Biography */}
            <div>
              <p className="font-roboto text-lg leading-relaxed text-gray-600">
                {trainer.bio ||
                  `${trainer.name} helps members improve their fitness, develop their skills, and work towards their training goals.`}
              </p>


              {/* Experience Stats */}
              <div className="mt-12 grid border-y border-gray-200 sm:grid-cols-3">

                <div className="py-7 sm:border-r sm:border-gray-200 sm:pr-6">
                  <p className="font-monst text-4xl font-extrabold text-[#05050f]">
                    8+
                  </p>

                  <p className="font-roboto mt-2 text-sm text-gray-500">
                    Years Coaching
                  </p>
                </div>

                <div className="border-t border-gray-200 py-7 sm:border-t-0 sm:border-r sm:border-gray-200 sm:px-6">
                  <p className="font-monst text-4xl font-extrabold text-[#05050f]">
                    1.2K+
                  </p>

                  <p className="font-roboto mt-2 text-sm text-gray-500">
                    Clients Coached
                  </p>
                </div>

                <div className="border-t border-gray-200 py-7 sm:border-t-0 sm:pl-6">
                  <p className="font-monst text-4xl font-extrabold text-[#05050f]">
                    5
                  </p>

                  <p className="font-roboto mt-2 text-sm text-gray-500">
                    Certifications
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Specialties & Coaching Method */}
      <section className="bg-[#05050f] py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-16 lg:grid-cols-2">

            {/* Specialties */}
            <div>

              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Areas Of Expertise
              </p>

              <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-white md:text-5xl">
                What {trainer.name.split(" ")[0]}
                <br />
                Specializes In.
              </h2>

              <div className="mt-10 divide-y divide-gray-800 border-y border-gray-800">

                <div className="mt-10 divide-y divide-gray-800 border-y border-gray-800">
                  {trainer.specialties?.length > 0 ? (
                    trainer.specialties.map((specialty, index) => (
                      <div
                        key={specialty}
                        className="flex items-center justify-between py-5"
                      >
                        <p className="font-monst text-sm font-bold uppercase text-white">
                          {specialty}
                        </p>

                        <span className="font-monst text-sm text-red-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="py-5 text-gray-400">
                      Specialties have not been added yet.
                    </p>
                  )}
                </div>
              </div>

            </div>


            {/* Coaching Method */}
            <div className="lg:pt-16">

              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Coaching Method
              </p>

              <h3 className="font-monst mt-4 text-3xl font-bold uppercase leading-tight text-white md:text-4xl">
                {trainer.name.split(" ")[0]}'s
                <br />
                Coaching Approach.
              </h3>

              <p className="font-roboto mt-6 text-lg leading-relaxed text-gray-400">
                {trainer.bio ||
                  `${trainer.name} helps members improve their fitness, develop their skills, and work towards their training goals.`}
              </p>

              <p className="font-roboto mt-5 leading-relaxed text-gray-500">
                As your strength and fitness improve, your training is adjusted to
                keep you challenged without losing sight of proper technique and
                recovery.
              </p>


              {/* Method Points */}
              <div className="mt-10 space-y-5">

                <div className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-red-500"></span>

                  <div>
                    <h4 className="font-monst text-sm font-bold uppercase text-white">
                      Goal-focused programming
                    </h4>

                    <p className="font-roboto mt-1 text-sm leading-relaxed text-gray-500">
                      Training is built around your current ability and specific
                      objectives.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-red-500"></span>

                  <div>
                    <h4 className="font-monst text-sm font-bold uppercase text-white">
                      Technique first
                    </h4>

                    <p className="font-roboto mt-1 text-sm leading-relaxed text-gray-500">
                      Exercises are coached with attention to form, control and
                      movement quality.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-red-500"></span>

                  <div>
                    <h4 className="font-monst text-sm font-bold uppercase text-white">
                      Progress tracking
                    </h4>

                    <p className="font-roboto mt-1 text-sm leading-relaxed text-gray-500">
                      Training loads and performance are reviewed so your program
                      can develop with you.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

     
     

      {/* CTA  */}

      <section className="relative overflow-hidden bg-[#05050f] py-24">
        <div className="absolute inset-0">
          <img
            src="/trainer-cta.webp"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-[#05050f]/80"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Ready To Train?
            </p>

            <h2 className="font-monst mt-4 text-4xl font-extrabold uppercase leading-tight text-white md:text-6xl">
              Train With
              <br />
              Marcus.
            </h2>

            <p className="font-roboto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Ready to build strength, improve your performance and train with
              purpose? Book a session with Marcus and take the next step in your
              training.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="font-monst inline-flex items-center gap-3 bg-red-500 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#05050f]"
              >
                Book A Session
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

              <Link
                to="/trainers"
                className="font-monst inline-flex items-center gap-3 border border-white/30 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:border-red-500 hover:bg-red-500"
              >
                View All Trainers
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer  */}
      <Footer />
    </main>
  )
}

export default TrainerProfile