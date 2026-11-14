import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDumbbell,
  faClock,
  faGear,
  faUsers,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons"
import Footer from "../components/Footer"
import PlanCard from "../components/PlanCard"
import { comparison, faqs } from "../data/membershipPlans"


const benefits = [
  {
    icon: faDumbbell,
    title: "Expert Coaching",
    text: "Get guidance from experienced trainers who help you improve your technique and work toward your goals.",
  },
  {
    icon: faClock,
    title: "Flexible Training",
    text: "Choose from morning and evening sessions that fit around your work, commitments and routine.",
  },
  {
    icon: faGear,
    title: "Modern Equipment",
    text: "Train with equipment designed to support strength work, conditioning and full-body workouts.",
  },
  {
    icon: faUsers,
    title: "Community & Support",
    text: "Stay motivated in a welcoming training environment where consistency and progress matter.",
  },
]

const Membership = () => {
  const [openFaq, setOpenFaq] = useState(0)

  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from("membership_plans")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: true })

      if (error) {
        console.log("Membership plans error:", error.message)
      } else {
        console.log("Membership plans received:", data)
        setPlans(data)
      }

      setLoading(false)
    }

    fetchPlans()
  }, [])

  // load message

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="font-roboto text-lg text-gray-600">
          Loading membership plans...
        </p>
      </main>
    )
  }

  return (
    <main>

      {/* Membership Hero */}
      <section className="relative min-h-105 bg-[#05050f]">
        <div className="absolute inset-0 bg-[url('/membership-hero.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-[#05050f]/75"></div>

        <div className="relative z-10 mx-auto flex min-h-105 max-w-7xl items-center px-6 pt-20">
          <div>
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Your Training. Your Terms.
            </p>

            <h1 className="font-monst mt-4 text-5xl font-extrabold uppercase text-white md:text-6xl">
              Membership
            </h1>

            <p className="font-roboto mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
              Find the membership that fits your routine, your goals
              and the way you want to train.
            </p>
          </div>
        </div>
      </section>


      {/* Compare Plans */}
      <section className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <p className="font-monst text-sm font-bold uppercase tracking-widest text-red-500">
            Compare Plans
          </p>

          <h2 className="font-monst mt-4 max-w-2xl text-3xl font-extrabold uppercase leading-tight text-[#05050f] md:text-5xl">
            See What's Included.
          </h2>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-160 border-collapse bg-white text-left">
              <thead>
                <tr>
                  <th className="w-1/3 px-4 py-5"></th>
                  {plans.map((plan) => (
                    <th
                      key={plan.slug}
                      className={`px-4 py-5 text-center ${plan.is_popular ? "bg-[#05050f] text-white" : "text-[#05050f]"
                        }`}
                    >
                      <span className="font-monst text-sm font-bold uppercase tracking-wider">
                        {plan.name}
                      </span>
                      <span className="font-roboto mt-1 block text-sm font-normal opacity-70">
                        ${plan.price} / month
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-gray-200">
                    <td className="font-roboto px-4 py-4 text-gray-700">
                      {row.label}
                    </td>

                    {row.values.map((value, i) => (
                      <td
                        key={i}
                        className={`font-roboto px-4 py-4 text-center text-sm ${plans[i]?.is_popular ? "bg-red-50" : ""
                          }`}
                      >
                        {value === true ? (
                          <span className="text-red-500">✓</span>
                        ) : value === false ? (
                          <span className="text-gray-300">—</span>
                        ) : (
                          <span className="text-gray-700">{value}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>


      {/* Plans (full feature lists) */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="mb-14 max-w-2xl">
            <p className="font-monst text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Membership & Access
            </p>

            <h2 className="font-monst mt-4 text-3xl font-extrabold uppercase leading-tight text-[#05050f] md:text-5xl">
              Find Your Training Plan.
            </h2>

            <p className="font-roboto mt-5 max-w-xl text-lg leading-relaxed text-gray-600">
              Straightforward membership options for the way you train.
              No contracts, cancel anytime before your next billing date.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.slug}
                plan={plan}
                features={[...plan.features, ...plan.extras]}
              />
            ))}
          </div>

        </div>
      </section>





      {/* Membership Benefits */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-widest text-red-500">
                More Than A Membership
              </p>

              <h2 className="font-monst mt-4 max-w-xl text-3xl font-extrabold uppercase leading-tight text-[#05050f] md:text-5xl">
                Everything You Need To Train Better.
              </h2>
            </div>

            <p className="font-roboto max-w-xl text-lg leading-relaxed text-gray-600">
              The right environment can make all the difference. Get the
              equipment, coaching and support you need to stay consistent
              and keep progressing.
            </p>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className={`border-t-2 pt-7 transition hover:border-red-500 ${i === 0 ? "border-red-500" : "border-gray-200"
                  }`}
              >
                <div className="flex h-14 w-14 items-center justify-center bg-gray-50 text-red-500">
                  <FontAwesomeIcon icon={b.icon} className="text-2xl" />
                </div>

                <h3 className="font-monst mt-6 text-lg font-bold uppercase text-[#05050f]">
                  {b.title}
                </h3>

                <p className="font-roboto mt-3 text-base leading-relaxed text-gray-600">
                  {b.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* FAQ */}
      <section className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-4xl">

          <p className="font-monst text-sm font-bold uppercase tracking-widest text-red-500">
            Questions
          </p>

          <h2 className="font-monst mt-4 text-3xl font-extrabold uppercase leading-tight text-[#05050f] md:text-5xl">
            Good To Know.
          </h2>

          <div className="mt-10 border-t border-gray-200">
            {faqs.map((item, i) => (
              <div key={item.q} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-monst text-base font-bold uppercase text-[#05050f] md:text-lg">
                    {item.q}
                  </span>
                  <FontAwesomeIcon
                    icon={openFaq === i ? faMinus : faPlus}
                    className="text-red-500"
                  />
                </button>

                {openFaq === i && (
                  <p className="font-roboto pb-6 pr-10 leading-relaxed text-gray-600">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* Membership CTA */}
      <section className="bg-[#05050f] px-6 pb-24 pt-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden bg-[#05050f]">
          <div className="absolute inset-0 bg-[url('/dumbbell.avif')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-[#05050f]/75"></div>

          <div className="relative z-10 px-8 py-20 text-center md:px-16 md:py-28">
            <p className="font-monst text-sm font-bold uppercase tracking-widest text-red-500">
              Your Next Chapter Starts Here
            </p>

            <h2 className="font-monst mx-auto mt-5 max-w-3xl text-3xl font-extrabold uppercase leading-tight text-white md:text-5xl">
              Invest In Your Strength. Build Your Future.
            </h2>

            <p className="font-roboto mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Find the right membership, get into a routine and take the next
              step toward your fitness goals.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/booking"
                className="font-monst inline-flex items-center justify-center bg-red-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-600"
              >
                Get Started
              </Link>

              <Link
                to="/contact"
                className="font-monst inline-flex items-center justify-center border border-white/60 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#05050f]"
              >
                Talk To Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Membership