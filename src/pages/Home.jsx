import { Link } from "react-router-dom"
import { useRef } from "react"
import Navbar from "../components/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft, } from "@fortawesome/free-solid-svg-icons"
import WeeklySchedule from "../components/WeeklySchedule"
import TestimonialsAlt from "../components/TestimonialsAlt"
import CTA from "../components/CTA.jsx"
import Footer from "../components/Footer.jsx"
import PlanCard from "../components/PlanCard"
import { plans } from "../data/membershipPlans"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const Home = () => {

  const [trainers, setTrainers] = useState([])
  const [loadingTrainers, setLoadingTrainers] = useState(true)
  const [trainerError, setTrainerError] = useState("")

  useEffect(() => {
    const fetchTrainers = async () => {
      const { data, error } = await supabase
        .from("trainers")
        .select("*")
        .order("id", { ascending: true })
        .limit(3)

      if (error) {
        setTrainerError(error.message)
      } else {
        setTrainers(data)
      }

      setLoadingTrainers(false)
    }

    fetchTrainers()
  }, [])

  const classesRef = useRef(null)

  // scroll functions 
  const scrollLeft = () => {
    classesRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    })
  }

  const scrollRight = () => {
    classesRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    })
  }

  return (

    <main>

      {/* Hero section */}
      <section
        className="relative min-h-screen bg-[#05050f] text-white"
      >

        <Navbar />

        <div className="absolute inset-0">
          <img
            src="/hero.webp"
            alt="Person training in the gym"
            className="w-full h-full object-cover object-right"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-r from-[#05050f] via-[#05050f]/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto min-h-screen px-6 flex items-center">

          <div className="max-w-2xl pt-20">

            <span className="inline-block bg-red-500 px-7 py-3 text-sm font-bold uppercase tracking-wider font-monst">
              Find Your Energy
            </span>

            <h1 className="mt-6 text-5xl md:text-7xl font-extrabold  uppercase leading-[1.05] tracking-tight font-monst">
              Get Stronger.
              <br />
              Feel Better.
            </h1>

            <p className="mt-6 max-w-lg text-gray-300 text-lg leading-relaxed font-roboto">
              Train with expert coaches, join flexible classes and build
              strength in a community that keeps you motivated.
            </p>

            <Link
              to="/classes"
              className="font-monst inline-flex items-center gap-3 mt-10 bg-red-500 px-8 py-4 font-bold uppercase transition duration-300 hover:bg-red-600 hover:gap-4"
            >
              Our Classes
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>

          </div>

        </div>

      </section>


      {/* About section */}
      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <img
                src="/jogging.webp"
                alt="People training in a gym"
                className="w-full h-125 object-cover"
              />
            </div>

            <div>

              <p className="font-monst text-red-500 font-semibold uppercase tracking-wider">
                About Our Fitness Center
              </p>

              <h2 className="font-monst mt-4 text-4xl md:text-5xl font-bold uppercase ">
                Train Better.
                <br />
                Live Stronger.
              </h2>

              <p className="font-roboto mt-6 text-gray-600 leading-relaxed">
                Our fitness center is built for people who want to get stronger,
                healthier and more confident. With expert coaches, quality
                equipment and flexible training options, we help you stay
                consistent and reach your goals.
              </p>

              <div className="mt-8 space-y-4">

                <p className="font-roboto">
                  ✓ Expert trainers
                </p>

                <p className="font-roboto">
                  ✓ Modern equipment
                </p>

                <p className="font-roboto">
                  ✓ Flexible training options
                </p>

              </div>

              <Link
                to="/about"
                className="font-monst inline-flex items-center gap-3 mt-8 bg-black text-white px-7 py-4 font-bold uppercase transition duration-300 hover:bg-red-500"
              >
                Learn More
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

            </div>

          </div>

        </div>

      </section>






      {/* Upcoming classes  */}


      <section className="bg-white py-24">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADING */}
          <div className="flex items-end justify-between">

            <div>

              <p className="font-monst text-red-500 font-semibold uppercase tracking-wider">
                Featured Classes
              </p>

              <h2 className="font-monst mt-3 text-4xl md:text-5xl font-bold uppercase">
                Choose Your Class
              </h2>

            </div>

            <div className="hidden md:flex gap-3">

              <button
                onClick={scrollLeft}
                className="w-12 h-12 border border-red-500 flex items-center justify-center text-red-500 transition duration-300 hover:bg-red-500 hover:text-white"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>

              <button
                onClick={scrollRight}
                className="w-12 h-12 border border-red-500 flex items-center justify-center text-red-500 transition duration-300 hover:bg-red-500 hover:text-white"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>

            </div>

          </div>


          {/* CAROUSEL */}
          <div className="mt-12 relative">

            <div
              ref={classesRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide"
            >

              {/* first card */}

              <div className="bg-[#05050f] min-w-87.5 md:min-w-100">

                <div className="h-80">
                  <img
                    src="/man.webp"
                    alt="Strength training class"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 text-white">

                  <p className="font-monst text-red-500 text-sm uppercase tracking-wider">
                    Monday · 7:00 AM
                  </p>

                  <h3 className="font-monst mt-2 text-2xl font-bold uppercase">
                    Strength Training
                  </h3>

                  <p className="font-roboto mt-3 text-gray-400">
                    Build strength and improve your overall fitness with guided training.
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="font-roboto text-sm text-gray-400">
                      60 Minutes
                    </span>

                    <Link
                      to="/booking"
                      className="font-monst text-sm font-bold uppercase text-white transition duration-300 hover:text-red-500"
                    >
                      Join Class
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Link>

                  </div>

                </div>

              </div>

              {/* second card  */}

              <div className="bg-[#05050f] min-w-87.5 md:min-w-100">

                <div className="h-80">
                  <img
                    src="/HIIT.webp"
                    alt="HIIT training class"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 text-white">

                  <p className="font-monst text-red-500 text-sm uppercase tracking-wider">
                    Tuesday · 6:30 AM
                  </p>

                  <h3 className="font-monst mt-2 text-2xl font-bold uppercase">
                    HIIT Training
                  </h3>

                  <p className="font-roboto mt-3 text-gray-400">
                    Push your limits with high-intensity workouts designed to improve strength and endurance.
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="font-roboto text-sm text-gray-400">
                      45 Minutes
                    </span>

                    <Link
                      to="/booking"
                      className="font-monst text-sm font-bold uppercase text-white transition duration-300 hover:text-red-500"
                    >
                      Join Class
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Link>

                  </div>

                </div>

              </div>

              {/* Third card  */}

              <div className="bg-[#05050f] min-w-87.5 md:min-w-100">

                <div className="h-80">
                  <img
                    src="/yoga.webp"
                    alt="Yoga class"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 text-white">

                  <p className="font-monst text-red-500 text-sm uppercase tracking-wider">
                    Wednesday · 7:30 AM
                  </p>

                  <h3 className="font-monst mt-2 text-2xl font-bold uppercase">
                    Yoga & Mobility
                  </h3>

                  <p className="font-roboto mt-3 text-gray-400">
                    Improve flexibility, balance and movement with guided mobility and yoga sessions.
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="font-roboto text-sm text-gray-400">
                      50 Minutes
                    </span>

                    <Link
                      to="/booking"
                      className="font-monst text-sm font-bold uppercase text-white transition duration-300 hover:text-red-500"
                    >
                      Join Class
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Link>

                  </div>

                </div>

              </div>

              {/* card 4  */}

              <div className="bg-[#05050f] min-w-87.5 md:min-w-100">

                <div className="h-80">
                  <img
                    src="/boxing.webp"
                    alt="Boxing fitness class"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 text-white">

                  <p className="font-monst text-red-500 text-sm uppercase tracking-wider">
                    Thursday · 6:00 PM
                  </p>

                  <h3 className="font-monst mt-2 text-2xl font-bold uppercase">
                    Boxing Fitness
                  </h3>

                  <p className="font-roboto mt-3 text-gray-400">
                    Build endurance, coordination and confidence through energetic boxing workouts.
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="font-roboto text-sm text-gray-400">
                      60 Minutes
                    </span>

                    <Link
                      to="/booking"
                      className="font-monst text-sm font-bold uppercase text-white transition duration-300 hover:text-red-500"
                    >
                      Join Class
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Link>

                  </div>

                </div>

              </div>

              {/* card 5  */}

              <div className="bg-[#05050f] min-w-87.5 md:min-w-100">

                <div className="h-80">
                  <img
                    src="/functional-woman.webp"
                    alt="Functional training class"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 text-white">

                  <p className="font-monst text-red-500 text-sm uppercase tracking-wider">
                    Friday · 7:00 AM
                  </p>

                  <h3 className="font-monst mt-2 text-2xl font-bold uppercase">
                    Functional Training
                  </h3>

                  <p className="font-roboto mt-3 text-gray-400">
                    Improve strength, balance and everyday movement with practical full-body training.
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="font-roboto text-sm text-gray-400">
                      50 Minutes
                    </span>

                    <Link
                      to="/booking"
                      className="font-monst text-sm font-bold uppercase text-white transition duration-300 hover:text-red-500"
                    >
                      Join Class
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Link>

                  </div>

                </div>

              </div>

              {/* card 6  */}

              <div className="bg-[#05050f] min-w-87.5 md:min-w-100">

                <div className="h-80">
                  <img
                    src="/spin.webp"
                    alt="Spin cycling class"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 text-white">

                  <p className="font-monst text-red-500 text-sm uppercase tracking-wider">
                    Saturday · 9:00 AM
                  </p>

                  <h3 className="font-monst mt-2 text-2xl font-bold uppercase">
                    Spin Cycling
                  </h3>

                  <p className="font-roboto mt-3 text-gray-400">
                    Ride to the rhythm, challenge your limits and build powerful cardiovascular endurance.
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="font-roboto text-sm text-gray-400">
                      45 Minutes
                    </span>

                    <Link
                      to="/booking"
                      className="font-monst text-sm font-bold uppercase text-white transition duration-300 hover:text-red-500"
                    >
                      Join Class
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* classes for him / her */}

      <section className="bg-white py-16">

        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">

          {/* For Her */}

          <div className="relative h-45 overflow-hidden bg-white shadow-[0_10px_35px_rgba(0,0,0,0.12)]">

            <div className="relative z-10 flex h-full flex-col justify-center pl-8 sm:pl-10">

              <h3 className="font-monst text-xl font-bold uppercase text-[#05050f]">
                Classes For Her
              </h3>

              <Link
                to="/classes"
                className="font-monst mt-6 flex w-fit items-center gap-3 bg-[#05050f] px-5 py-3 text-[13px] font-bold uppercase tracking-wide text-white shadow-[0_12px_25px_rgba(0,0,0,0.25)] transition duration-300 hover:bg-red-500"
              >
                Explore Classes
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

            </div>

            {/* Slanted image */}

            <div
              className="absolute right-0 top-0 h-full w-[52%] sm:w-[56%]"
              style={{
                clipPath: "polygon(37% 0, 100% 0, 100% 100%, 0 100%)",
              }}
            >

              <img
                src="/woman-in-gym.webp"
                alt="Woman training in the gym"
                className="h-full w-full object-cover"
              />

            </div>

            {/* Diagonal accents */}

            <div className="pointer-events-none absolute right-0 top-0 h-full w-[52%] sm:w-[56%]">

              <span
                className="absolute w-1 bg-red-500"
                style={{
                  height: "80px",
                  top: "44%",
                  left: "calc(37% * 0.56 + 27px)",
                  transform: "translate(-50%, -50%) rotate(33deg)",
                }}
              />

              <span
                className="absolute w-1 bg-white"
                style={{
                  height: "36px",
                  top: "78%",
                  left: "calc(37% * 0.22 + 27px)",
                  transform: "translate(-50%, -50%) rotate(33deg)",
                }}
              />

            </div>

          </div>


          {/* For Him */}

          <div className="relative h-45 overflow-hidden bg-white shadow-[0_10px_35px_rgba(0,0,0,0.12)]">

            <div className="relative z-10 flex h-full flex-col justify-center pl-8 sm:pl-10">

              <h3 className="font-monst text-xl font-bold uppercase text-[#05050f]">
                Classes For Him
              </h3>

              <Link
                to="/classes"
                className="font-monst mt-6 flex w-fit items-center gap-3 bg-[#05050f] px-5 py-3 text-[13px] font-bold uppercase tracking-wide text-white shadow-[0_12px_25px_rgba(0,0,0,0.25)] transition duration-300 hover:bg-red-500"
              >
                Explore Classes
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

            </div>

            {/* Slanted image */}

            <div
              className="absolute right-0 top-0 h-full w-[52%] sm:w-[56%]"
              style={{
                clipPath: "polygon(37% 0, 100% 0, 100% 100%, 0 100%)",
              }}
            >

              <img
                src="/man-gym.webp"
                alt="Man training in the gym"
                className="h-full w-full object-cover"
              />

            </div>

            {/* Diagonal accents */}

            <div className="pointer-events-none absolute right-0 top-0 h-full w-[52%] sm:w-[56%]">

              <span
                className="absolute w-1 bg-red-500"
                style={{
                  height: "80px",
                  top: "44%",
                  left: "calc(37% * 0.56 + 27px)",
                  transform: "translate(-50%, -50%) rotate(33deg)",
                }}
              />

              <span
                className="absolute w-1 bg-white"
                style={{
                  height: "36px",
                  top: "78%",
                  left: "calc(37% * 0.22 + 27px)",
                  transform: "translate(-50%, -50%) rotate(33deg)",
                }}
              />

            </div>

          </div>

        </div>

      </section>




      {/* Trainers section */}

      <section className="bg-[#05050f] py-24">

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}

          <div className="flex items-end justify-between">

            <div>

              <p className="font-monst text-red-500 font-semibold uppercase tracking-wider">
                Our Team
              </p>

              <h2 className="font-monst mt-3 text-4xl md:text-5xl font-bold uppercase text-white">
                Meet Our Trainers
              </h2>

              <p className="font-roboto mt-5 max-w-2xl text-gray-400 leading-relaxed">
                Experienced coaches who help you train with purpose,
                stay consistent and get closer to your goals.
              </p>

            </div>

            <Link
              to="/trainers"
              className="hidden md:flex font-monst items-center gap-3 border border-gray-600 px-6 py-3 text-sm font-bold uppercase text-white transition duration-300 hover:border-red-500 hover:bg-red-500"
            >
              All Trainers
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>

          </div>


          {/* Trainers */}

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {loadingTrainers && (
              <p className="text-gray-300">Loading trainers...</p>
            )}

            {!loadingTrainers && trainerError && (
              <p className="text-red-500">
                Unable to load trainers: {trainerError}
              </p>
            )}

            {!loadingTrainers && !trainerError && trainers.map((trainer) => (
              <div key={trainer.id} className="group">

                <div className="h-105 overflow-hidden">
                  <img
                    src={trainer.image_url || "/trainer-placeholder.webp"}
                    alt={trainer.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="pt-5">

                  <h3 className="font-monst text-2xl font-bold uppercase text-white">
                    {trainer.name}
                  </h3>

                  <p className="font-roboto mt-2 text-red-500">
                    {trainer.role}
                  </p>

                  <Link
                    to={`/trainers/${trainer.name.toLowerCase().replaceAll(" ", "-")}`}
                    className="font-monst mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase text-gray-300 transition duration-300 hover:text-red-500"
                  >
                    View Profile
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>

                </div>

              </div>
            ))}

          </div>


          {/* Mobile button */}

          <Link
            to="/trainers"
            className="md:hidden font-monst mt-10 inline-flex items-center gap-3 bg-red-500 px-6 py-3 text-sm font-bold uppercase text-white"
          >
            All Trainers
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>

        </div>

      </section>


      {/* Membership section */}

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="max-w-2xl">
            <p className="font-monst font-semibold uppercase tracking-wider text-red-500">
              Membership
            </p>
            <h2 className="font-monst mt-3 text-4xl font-bold uppercase text-[#05050f] md:text-5xl">
              Choose Your Plan
            </h2>
            <p className="font-roboto mt-5 leading-relaxed text-gray-600">
              Flexible membership options designed to help you train consistently,
              stay motivated and reach your fitness goals.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                features={plan.features.slice(0, 3)}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-gray-200 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="font-roboto text-sm text-gray-500">
              All memberships are month-to-month. Cancel anytime before your next billing date.
            </p>
            <Link
              to="/membership"
              className="font-monst inline-flex items-center gap-2 text-sm font-bold uppercase text-[#05050f] transition duration-300 hover:text-red-500"
            >
              Compare All Plans
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

        </div>
      </section>

      {/* Weekly schedule  */}

      <WeeklySchedule />

      {/* Testimonial  */}

      <TestimonialsAlt />


      {/* CTA  */}

      <CTA />

      {/* Footer  */}

      <Footer />









    </main>






  )
}

export default Home