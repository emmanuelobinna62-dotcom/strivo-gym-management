import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons"
import Footer from "../components/Footer"

const ClassDetails = () => {
  return (
    <main>

      {/* Hero */}
      <section className="relative min-h-105 bg-[#05050f]">

        <div
          className="absolute inset-0 bg-[url('/strength-class.webp')] bg-cover bg-center"
        ></div>

        <div className="absolute inset-0 bg-[#05050f]/75"></div>

        <div className="relative z-10 mx-auto flex min-h-105 max-w-7xl items-center px-6 pt-20">
          <div className="max-w-3xl">

            <Link
              to="/classes"
              className="font-monst inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-gray-300 transition duration-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back To Classes
            </Link>

            <p className="font-monst mt-10 text-sm font-bold uppercase tracking-wider text-red-500">
              Strength
            </p>

            <h1 className="font-monst mt-4 text-5xl font-extrabold uppercase leading-tight text-white md:text-6xl">
              Strength &
              <br />
              Conditioning
            </h1>

            <p className="font-roboto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Build strength, power and conditioning through structured
              training designed to improve performance and overall fitness.
            </p>

            <div className="my-8  flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="font-monst inline-flex items-center gap-3 bg-red-500 px-7 py-4 text-sm font-bold uppercase text-white transition duration-300 hover:bg-red-600"
              >
                Book This Class
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>

          </div>
        </div>

      </section>

      {/* About This Class */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Image */}
            <div className="h-100 overflow-hidden md:h-125">
              <img
                src="/man.webp"
                alt="Strength and conditioning training"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                About The Class
              </p>

              <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-[#05050f] md:text-5xl">
                Strength That
                <br />
                Performs.
              </h2>

              <p className="font-roboto mt-6 text-lg leading-relaxed text-gray-600">
                Strength & Conditioning combines resistance training, power work
                and conditioning to help you become stronger, fitter and more
                capable.
              </p>

              <p className="font-roboto mt-5 text-lg leading-relaxed text-gray-600">
                Every session follows a structured approach, with exercises and
                intensity adjusted to your training level and goals.
              </p>

              {/* Quick Details */}
              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-gray-200 pt-8">

                <div>
                  <p className="font-monst text-xs font-bold uppercase tracking-wider text-gray-400">
                    Duration
                  </p>

                  <p className="font-monst mt-2 text-sm font-bold uppercase text-[#05050f]">
                    60 Minutes
                  </p>
                </div>

                <div>
                  <p className="font-monst text-xs font-bold uppercase tracking-wider text-gray-400">
                    Level
                  </p>

                  <p className="font-monst mt-2 text-sm font-bold uppercase text-[#05050f]">
                    Intermediate
                  </p>
                </div>

                <div>
                  <p className="font-monst text-xs font-bold uppercase tracking-wider text-gray-400">
                    Training Type
                  </p>

                  <p className="font-monst mt-2 text-sm font-bold uppercase text-[#05050f]">
                    Group Training
                  </p>
                </div>

                <div>
                  <p className="font-monst text-xs font-bold uppercase tracking-wider text-gray-400">
                    Class Size
                  </p>

                  <p className="font-monst mt-2 text-sm font-bold uppercase text-[#05050f]">
                    Up To 15
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What You'll Work On */}
      <section className="bg-[#f5f5f5] py-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Heading */}
          <div className="max-w-2xl">
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Training Focus
            </p>

            <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-[#05050f] md:text-5xl">
              What You'll
              <br />
              Work On.
            </h2>
          </div>

          {/* Training Areas */}
          <div className="mt-14 grid gap-px bg-gray-300 md:grid-cols-2">

            {/* 01 */}
            <div className="bg-[#f5f5f5] p-8 md:p-10">
              <span className="font-monst text-sm font-bold text-red-500">
                01
              </span>

              <h3 className="font-monst mt-6 text-2xl font-bold uppercase text-[#05050f]">
                Compound Strength
              </h3>

              <p className="font-roboto mt-4 leading-relaxed text-gray-600">
                Build foundational strength through controlled compound movements
                that train multiple muscle groups at once.
              </p>
            </div>

            {/* 02 */}
            <div className="bg-[#f5f5f5] p-8 md:p-10">
              <span className="font-monst text-sm font-bold text-red-500">
                02
              </span>

              <h3 className="font-monst mt-6 text-2xl font-bold uppercase text-[#05050f]">
                Power & Explosiveness
              </h3>

              <p className="font-roboto mt-4 leading-relaxed text-gray-600">
                Develop power through dynamic movements that challenge your ability
                to produce force quickly.
              </p>
            </div>

            {/* 03 */}
            <div className="bg-[#f5f5f5] p-8 md:p-10">
              <span className="font-monst text-sm font-bold text-red-500">
                03
              </span>

              <h3 className="font-monst mt-6 text-2xl font-bold uppercase text-[#05050f]">
                Conditioning
              </h3>

              <p className="font-roboto mt-4 leading-relaxed text-gray-600">
                Improve your work capacity and endurance with conditioning
                exercises that keep the intensity high.
              </p>
            </div>

            {/* 04 */}
            <div className="bg-[#f5f5f5] p-8 md:p-10">
              <span className="font-monst text-sm font-bold text-red-500">
                04
              </span>

              <h3 className="font-monst mt-6 text-2xl font-bold uppercase text-[#05050f]">
                Technique & Control
              </h3>

              <p className="font-roboto mt-4 leading-relaxed text-gray-600">
                Learn proper movement patterns and lifting technique so you can
                train effectively and progress with confidence.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Class Information & Coach */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-12 lg:grid-cols-2">

            {/* Class Information */}
            <div className="bg-[#05050f] p-8 md:p-10 lg:p-12">

              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Class Information
              </p>

              <h2 className="font-monst mt-4 text-3xl font-bold uppercase text-white md:text-4xl">
                Know Before
                <br />
                You Train.
              </h2>

              <div className="mt-10 divide-y divide-white/10">

                <div className="flex items-center justify-between py-5">
                  <span className="font-roboto text-gray-400">
                    Duration
                  </span>

                  <span className="font-monst text-sm font-bold uppercase text-white">
                    60 Minutes
                  </span>
                </div>

                <div className="flex items-center justify-between py-5">
                  <span className="font-roboto text-gray-400">
                    Class Type
                  </span>

                  <span className="font-monst text-sm font-bold uppercase text-white">
                    Group Training
                  </span>
                </div>

                <div className="flex items-center justify-between py-5">
                  <span className="font-roboto text-gray-400">
                    Class Size
                  </span>

                  <span className="font-monst text-sm font-bold uppercase text-white">
                    Up To 15
                  </span>
                </div>

                <div className="flex items-center justify-between py-5">
                  <span className="font-roboto text-gray-400">
                    Equipment
                  </span>

                  <span className="font-monst text-sm font-bold uppercase text-white">
                    Provided
                  </span>
                </div>

              </div>

            </div>

            {/* Coach */}
            <div>

              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Your Coach
              </p>

              <div className="mt-6 grid gap-8 sm:grid-cols-[180px_1fr] sm:items-center">

                <div className="h-56 overflow-hidden sm:h-64">
                  <img
                    src="/trainer-1.webp"
                    alt="Marcus Reed"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-monst text-xs font-bold uppercase tracking-wider text-gray-400">
                    Head Strength Coach
                  </p>

                  <h2 className="font-monst mt-2 text-3xl font-bold uppercase text-[#05050f]">
                    Marcus Reed
                  </h2>

                  <p className="font-roboto mt-4 leading-relaxed text-gray-600">
                    Marcus specializes in strength development, conditioning and
                    performance-focused training.
                  </p>

                  <Link
                    to="/trainers/marcus-reed"
                    className="font-monst mt-6 inline-flex items-center gap-3 text-sm font-bold uppercase text-[#05050f] transition duration-300 hover:text-red-500"
                  >
                    View Profile
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>

              </div>

              {/* Training Note */}
              <div className="mt-12 border-l-4 border-red-500 bg-[#f5f5f5] p-6">
                <p className="font-monst text-sm font-bold uppercase text-[#05050f]">
                  Choosing Your Session
                </p>

                <p className="font-roboto mt-2 leading-relaxed text-gray-600">
                  Our weekly schedule includes sessions for different training
                  levels. Choose the session that best matches your experience
                  and current fitness goals.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>



      {/* Class schedule */}
      <section className="bg-[#f5f5f5] py-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* Heading */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Weekly Schedule
              </p>

              <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-[#05050f] md:text-5xl">
                When To
                <br />
                Train.
              </h2>
            </div>

            <p className="font-roboto max-w-md text-lg leading-relaxed text-gray-600">
              Choose a session that matches your training level and reserve your
              spot before the class fills up.
            </p>

          </div>

          {/* Schedule */}
          <div className="mt-12 overflow-hidden bg-white">

            {/* Monday */}
            <div className="grid border-b border-gray-200 md:grid-cols-[180px_1fr_auto] md:items-center">

              <div className="bg-[#05050f] p-6">
                <p className="font-monst text-sm font-bold uppercase text-white">
                  Monday
                </p>
              </div>

              <div className="p-6 md:px-8">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-monst text-lg font-bold uppercase text-[#05050f]">
                    Strength & Conditioning
                  </p>

                  <span className="font-monst bg-gray-100 px-3 py-1 text-xs font-bold uppercase text-gray-600">
                    Beginner
                  </span>
                </div>

                <p className="font-roboto mt-2 text-sm text-gray-500">
                  6:00 PM · 60 Minutes · Marcus Reed
                </p>
              </div>

              <div className="px-6 pb-6 md:px-8 md:pb-0">
                <Link
                  to="/booking"
                  className="font-monst inline-flex items-center gap-2 text-sm font-bold uppercase text-[#05050f] transition duration-300 hover:text-red-500"
                >
                  Book
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>

            </div>

            {/* Wednesday */}
            <div className="grid border-b border-gray-200 md:grid-cols-[180px_1fr_auto] md:items-center">

              <div className="bg-[#05050f] p-6">
                <p className="font-monst text-sm font-bold uppercase text-white">
                  Wednesday
                </p>
              </div>

              <div className="p-6 md:px-8">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-monst text-lg font-bold uppercase text-[#05050f]">
                    Strength & Conditioning
                  </p>

                  <span className="font-monst bg-gray-100 px-3 py-1 text-xs font-bold uppercase text-gray-600">
                    Intermediate
                  </span>
                </div>

                <p className="font-roboto mt-2 text-sm text-gray-500">
                  7:00 AM · 60 Minutes · Marcus Reed
                </p>
              </div>

              <div className="px-6 pb-6 md:px-8 md:pb-0">
                <Link
                  to="/booking"
                  className="font-monst inline-flex items-center gap-2 text-sm font-bold uppercase text-[#05050f] transition duration-300 hover:text-red-500"
                >
                  Book
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>

            </div>

            {/* Saturday */}
            <div className="grid md:grid-cols-[180px_1fr_auto] md:items-center">

              <div className="bg-[#05050f] p-6">
                <p className="font-monst text-sm font-bold uppercase text-white">
                  Saturday
                </p>
              </div>

              <div className="p-6 md:px-8">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-monst text-lg font-bold uppercase text-[#05050f]">
                    Strength & Conditioning
                  </p>

                  <span className="font-monst bg-gray-100 px-3 py-1 text-xs font-bold uppercase text-gray-600">
                    Advanced
                  </span>
                </div>

                <p className="font-roboto mt-2 text-sm text-gray-500">
                  10:00 AM · 60 Minutes · Marcus Reed
                </p>
              </div>

              <div className="px-6 pb-6 md:px-8 md:pb-0">
                <Link
                  to="/booking"
                  className="font-monst inline-flex items-center gap-2 text-sm font-bold uppercase text-[#05050f] transition duration-300 hover:text-red-500"
                >
                  Book
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="bg-[#05050f] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">

            {/* Text */}
            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Ready To Train?
              </p>

              <h2 className="font-monst mt-4 text-4xl font-extrabold uppercase leading-tight text-white md:text-5xl">
                Reserve Your
                <br />
                Spot.
              </h2>

              <p className="font-roboto mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
                Join the next Strength & Conditioning session and train with
                structured programming, expert coaching and a focused group.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="font-monst inline-flex items-center gap-3 bg-red-500 px-7 py-4 text-sm font-bold uppercase text-white transition duration-300 hover:bg-red-600"
                >
                  Book This Class
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>

                <Link
                  to="/classes"
                  className="font-monst inline-flex items-center gap-3 border border-white/30 px-7 py-4 text-sm font-bold uppercase text-white transition duration-300 hover:border-white hover:bg-white hover:text-[#05050f]"
                >
                  View All Classes
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="h-80 overflow-hidden lg:h-96">
              <img
                src="/strength.avif"
                alt="Strength and conditioning training"
                className="h-full w-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      <Footer />



    </main>
  )
}

export default ClassDetails