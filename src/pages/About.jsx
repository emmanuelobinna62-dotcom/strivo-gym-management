
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft, } from "@fortawesome/free-solid-svg-icons"
import Footer from "../components/Footer"


const About = () => {
  return (
    <main>

      {/* About Hero */}
      <section className="relative min-h-105 bg-[#05050f]">

        <div
          className="absolute inset-0 bg-[url('/About-hero.webp')] bg-cover bg-center"
        ></div>

        <div className="absolute inset-0 bg-[#05050f]/75"></div>

        <div className="relative z-10 mx-auto flex min-h-105 max-w-7xl items-center px-6 pt-20">
          <div>
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              About Strivo
            </p>

            <h1 className="font-monst mt-4 text-5xl font-extrabold uppercase text-white md:text-6xl">
              About Us
            </h1>

            <p className="font-roboto mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
              More than a gym. Strivo is a training community built to help
              you become stronger, healthier and more confident.
            </p>
          </div>
        </div>

      </section>

      {/* Who We Are */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">

            {/* Image */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 border-l-4 border-t-4 border-red-500"></div>

              <img
                src="/About-us.avif"
                alt="People training at Strivo"
                className="relative z-10 h-130 w-full object-cover"
              />

              <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-4 border-r-4 border-red-500"></div>
            </div>

            {/* Content */}
            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Who We Are
              </p>

              <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-[#05050f] md:text-5xl">
                More Than A Gym.
                <br />
                A Place To Grow.
              </h2>

              <p className="font-roboto mt-6 leading-relaxed text-gray-600">
                Strivo is a modern fitness community built for people who want
                more from their training. We bring coaches, members and programs
                together in one supportive space where progress is noticed and
                effort is respected.
              </p>

              <p className="font-roboto mt-5 leading-relaxed text-gray-600">
                Whether you're taking your first step into the gym or pushing
                toward your next level, there's a place for you here.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Beginner-friendly classes and coaching",
                  "Open six days a week",
                  "Flexible month-to-month memberships",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <span className="h-2 w-2 bg-red-500"></span>
                    <p className="font-roboto text-gray-700">{item}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/trainers"
                className="font-monst mt-10 inline-flex items-center gap-3 bg-[#05050f] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
              >
                Meet the coaches
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>

          </div>
        </div>
      </section>




      {/* Strivo Approach */}
      <section className="bg-[#05050f] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

            {/* Content */}
            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Our Approach
              </p>

              <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-white md:text-5xl">
                Train With
                <br />
                Purpose.
              </h2>

              <p className="font-roboto mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
                Every member follows the same simple path, so you always know
                where you are and what comes next.
              </p>

              {/* Steps */}
              <div className="mt-10 space-y-8">
                {[
                  {
                    step: "01",
                    title: "Assess",
                    text: "We start with a fitness assessment to understand your starting point, goals and any limits.",
                  },
                  {
                    step: "02",
                    title: "Plan",
                    text: "Your coach builds a training plan around your goals, schedule and experience level.",
                  },
                  {
                    step: "03",
                    title: "Train",
                    text: "Coached sessions and classes where your form, effort and consistency are guided.",
                  },
                  {
                    step: "04",
                    title: "Progress",
                    text: "Regular progress reviews keep you on track and move your plan forward as you improve.",
                  },
                ].map((item, i, arr) => (
                  <div key={item.step} className="relative flex gap-6">
                    {/* connecting line */}
                    {i !== arr.length - 1 && (
                      <span className="absolute left-5.75 top-14 h-[calc(100%+8px)] w-px bg-gray-800" />
                    )}

                    {/* number */}
                    <span className="font-monst z-10 grid h-12 w-12 shrink-0 place-items-center border border-red-500 bg-[#05050f] text-sm font-bold text-red-500 rounded-lg">
                      {item.step}
                    </span>

                    <div>
                      <h3 className="font-monst text-lg font-bold uppercase text-white">
                        {item.title}
                      </h3>
                      <p className="font-roboto mt-2 max-w-lg text-sm leading-relaxed text-gray-500">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute -right-4 -top-4 h-24 w-24 border-r-4 border-t-4 border-red-500"></div>

              <img
                src="/approach.webp"
                alt="Strivo trainer coaching a client"
                className="relative z-10 h-140 w-full object-cover"
              />

              <div className="absolute -bottom-4 -left-4 h-24 w-24 border-b-4 border-l-4 border-red-500"></div>
            </div>

          </div>
        </div>
      </section>


      {/* Our Story */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Image */}
            <div className="relative">

              <div className="absolute -left-4 -top-4 h-24 w-24 border-l-4 border-t-4 border-red-500"></div>

              <img
                src="/story.webp"
                alt="People training together at Strivo"
                className="relative z-10 h-140 w-full object-cover"
              />

              <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-4 border-r-4 border-red-500"></div>

            </div>

            {/* Story */}
            <div>

              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Our Story
              </p>

              <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-[#05050f] md:text-5xl">
                Built For People
                <br />
                Who Want More.
              </h2>

              <p className="font-roboto mt-8 text-lg leading-relaxed text-gray-600">
                Strivo started with a simple idea: training should be more than
                showing up, working hard and going home. It should give you
                direction, confidence and a reason to keep coming back.
              </p>

              <p className="font-roboto mt-6 leading-relaxed text-gray-600">
                That's why we built Strivo around purposeful programs, experienced
                coaching and a community where people can train at their own level
                while still being challenged to improve.
              </p>

              <p className="font-roboto mt-6 leading-relaxed text-gray-600">
                From strength and conditioning to mobility, boxing and group
                training, every part of Strivo is designed around one goal:
                helping people build a stronger version of themselves.
              </p>

              {/* Closing statement */}
              <div className="mt-10 border-t border-gray-200 pt-8">
                <p className="font-monst text-xl font-bold uppercase leading-tight text-[#05050f]">
                  Train with purpose.
                  <br />
                  Become stronger.
                </p>

                <div className="mt-4 h-1 w-12 bg-red-500"></div>
              </div>

            </div>

          </div>

        </div>
      </section>



      
      {/* CTA */}
      <section className="relative overflow-hidden bg-[#05050f] py-24">
        <div className="absolute inset-0">
          <img
            src="/about-cta.webp"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#05050f]/75"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Ready To Start?
            </p>

            <h2 className="font-monst mt-4 text-4xl font-extrabold uppercase leading-tight text-white md:text-6xl">
              Stronger You 
              <br />
              Starts Here.
            </h2>

            <p className="font-roboto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Whether you're starting from scratch or ready to take your training
              further, Strivo gives you the coaching, programs and environment to
              keep moving forward.
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
                to="/membership"
                className="font-monst inline-flex items-center gap-3 border border-white/30 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:border-red-500 hover:bg-red-500"
              >
                View membership
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

export default About