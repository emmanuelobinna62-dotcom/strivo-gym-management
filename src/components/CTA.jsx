import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

const CTA = () => {
  return (
    <section className="bg-red-500 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          <div className="max-w-3xl">

            <p className="font-monst text-sm font-bold uppercase tracking-wider text-white/80">
              Start Your Journey
            </p>

            <h2 className="font-monst mt-3 text-4xl font-bold uppercase text-white md:text-5xl">
              Ready To Train With Purpose?
            </h2>

            <p className="font-roboto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
              Choose a class, meet our trainers and take the next step
              toward becoming stronger, healthier and more confident.
            </p>

          </div>

          <Link
            to="/booking"
            className="font-monst inline-flex w-fit shrink-0 items-center gap-3 bg-[#05050f] px-7 py-4 text-sm font-bold uppercase text-white transition duration-300 hover:bg-white hover:text-[#05050f]"
          >
            Book A Class
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>

        </div>

      </div>

    </section>
  )
}

export default CTA