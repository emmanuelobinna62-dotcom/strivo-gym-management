import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"

const testimonials = [
  {
    quote:
      "The coaches keep me accountable without making training feel overwhelming. I've become stronger, more consistent and much more confident.",
    name: "Olivia Bennett",
    membership: "Performance Member",
  },
  {
    quote:
      "The classes, trainers and atmosphere make it easy to stay consistent. I finally look forward to training every week.",
    name: "Daniel Foster",
    membership: "Unlimited Member",
  },
  {
    quote:
      "The training feels personal even in a group setting. The coaches actually pay attention to how you're moving and progressing.",
    name: "Maya Thompson",
    membership: "Strength Member",
  },
]

const TestimonialsAlt = () => {

  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrevious = () => {
    if (activeIndex === 0) {
      setActiveIndex(testimonials.length - 1)
    } else {
      setActiveIndex(activeIndex - 1)
    }
  }

  const handleNext = () => {
    if (activeIndex === testimonials.length - 1) {
      setActiveIndex(0)
    } else {
      setActiveIndex(activeIndex + 1)
    }
  }

  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Section heading */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="font-monst text-red-500 font-semibold uppercase tracking-wider">
              Member Stories
            </p>

            <h2 className="font-monst mt-3 text-4xl md:text-5xl font-bold uppercase text-[#05050f]">
              Built By Training.
              <br />
              Backed By Community.
            </h2>

          </div>

          <button
            className="font-monst inline-flex w-fit items-center bg-red-500 px-6 py-4 text-sm font-bold uppercase text-white transition duration-300 hover:bg-red-600"
          >
            Leave a Review
          </button>

        </div>


        {/* Testimonial card */}

        <div className="mt-14 overflow-hidden bg-[#05050f]">

          <div className="grid md:grid-cols-[42%_58%]">


            {/* Fixed gym image */}

            <div className="h-95 overflow-hidden md:h-125">

              <img
                src="/reviw.avif"
                alt="Athlete training in the gym"
                className="h-full w-full object-cover"
              />

            </div>


            {/* Review content */}

            <div className="relative flex min-h-125 flex-col justify-center overflow-hidden px-8 py-12 md:px-14 lg:px-20">

              {/* Large quote mark */}

              <div className="font-monst absolute left-8 top-5 text-[140px] font-bold leading-none text-transparent [-webkit-text-stroke:2px_#262626] md:left-14">
                “
              </div>


              {/* Review */}

              <div className="relative z-10">

                <div className="flex gap-1 text-red-500">
                  ★ ★ ★ ★ ★
                </div>

                <p className="font-roboto mt-8 max-w-2xl text-lg italic leading-relaxed text-gray-300 md:text-xl">
                  "{testimonials[activeIndex].quote}"
                </p>

                <h3 className="font-monst mt-8 text-2xl font-bold uppercase text-white">
                  {testimonials[activeIndex].name}
                </h3>

                <p className="font-roboto mt-2 text-sm text-gray-500">
                  {testimonials[activeIndex].membership}
                </p>


                {/* Navigation */}

                <div className="mt-10 flex gap-3">

                  <button
                    onClick={handlePrevious}
                    aria-label="Previous testimonial"
                    className="flex h-12 w-12 items-center justify-center bg-red-500 text-white transition duration-300 hover:bg-red-600"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="flex h-12 w-12 items-center justify-center bg-white text-[#05050f] transition duration-300 hover:bg-red-500 hover:text-white"
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>

                </div>


                {/* Indicators */}

                <div className="mt-6 flex gap-2">

                  {testimonials.map((item, index) => (

                    <button
                      key={item.name}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show review from ${item.name}`}
                      className={`h-2 transition-all duration-300 ${activeIndex === index
                          ? "w-8 bg-red-500"
                          : "w-2 bg-gray-600"
                        }`}
                    />

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default TestimonialsAlt