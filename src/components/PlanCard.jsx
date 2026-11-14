import { Link } from "react-router-dom"

const PlanCard = ({ plan, features }) => {
  const dark = plan.is_popular

  return (
    <div
      className={`relative flex flex-col p-8 md:p-10 ${
        dark ? "bg-[#05050f] text-white" : "border border-gray-200 bg-white"
      }`}
    >
      {dark && (
        <span className="font-monst absolute right-0 top-0 bg-red-500 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
          Most Popular
        </span>
      )}

      <p
        className={`font-monst text-sm font-bold uppercase tracking-widest ${
          dark ? "text-red-500" : "text-gray-500"
        }`}
      >
        {plan.name}
      </p>

      <h3
        className={`font-monst mt-4 text-4xl font-bold ${
          dark ? "text-white" : "text-[#05050f]"
        }`}
      >
        ${plan.price}
        <span
          className={`font-roboto text-base font-normal ${
            dark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {" "}/ month
        </span>
      </h3>

      <p className={`font-roboto mt-4 ${dark ? "text-gray-300" : "text-gray-600"}`}>
        {plan.tagline}
      </p>

      <ul className="mt-8 flex-1 space-y-4">
        {features.map((item) => (
          <li
            key={item}
            className={`font-roboto flex gap-3 ${
              dark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            <span className="text-red-500">✓</span>
            {item}
          </li>
        ))}
      </ul>

      <Link
        to={`/booking?plan=${plan.slug}`}
        className={`font-monst mt-10 inline-flex w-full items-center justify-center px-6 py-4 text-sm font-bold uppercase tracking-wide transition duration-300 ${
          dark
            ? "bg-red-500 text-white hover:bg-red-600"
            : "border border-[#05050f] text-[#05050f] hover:bg-[#05050f] hover:text-white"
        }`}
      >
        Choose {plan.name}
      </Link>
    </div>
  )
}

export default PlanCard