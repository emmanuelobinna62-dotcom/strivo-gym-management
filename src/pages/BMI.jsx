import { useState } from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"

const BMI = () => {
  const [unit, setUnit] = useState("metric")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [feet, setFeet] = useState("")
  const [inches, setInches] = useState("")
  const [pounds, setPounds] = useState("")
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit)
    setResult(null)
    setError("")
  }

  const handleCalculate = (event) => {
    event.preventDefault()
    setError("")
    setResult(null)

    let heightInMeters
    let weightInKg

    if (unit === "metric") {
      heightInMeters = Number(height) / 100
      weightInKg = Number(weight)

      if (
        !height ||
        !weight ||
        heightInMeters <= 0 ||
        weightInKg <= 0
      ) {
        setError("Enter a valid height and weight.")
        return
      }
    } else {
      const totalInches = Number(feet) * 12 + Number(inches)
      heightInMeters = totalInches * 0.0254
      weightInKg = Number(pounds) * 0.45359237

      if (
        !feet ||
        pounds === "" ||
        Number(feet) <= 0 ||
        Number(inches) < 0 ||
        Number(inches) > 11 ||
        Number(pounds) <= 0
      ) {
        setError("Enter a valid height and weight.")
        return
      }
    }

    if (
      heightInMeters < 0.9144 ||
      heightInMeters > 2.7432 ||
      weightInKg < 24.947 ||
      weightInKg > 453.592
    ) {
      setError("Please check your measurements and try again.")
      return
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters)

    let category = ""

    if (bmi < 18.5) {
      category = "Underweight"
    } else if (bmi < 25) {
      category = "Healthy weight"
    } else if (bmi < 30) {
      category = "Overweight"
    } else {
      category = "Obesity"
    }

    setResult({
      bmi: bmi.toFixed(1),
      category: category,
    })
  }

  const handleReset = () => {
    setHeight("")
    setWeight("")
    setFeet("")
    setInches("")
    setPounds("")
    setResult(null)
    setError("")
  }

  return (
    <main>
      {/* BMI Calculator Hero */}
      <section className="relative min-h-105 bg-[#05050f]">
        <div className="absolute inset-0 bg-[url('/bmi-hero.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-[#05050f]/75"></div>

        <div className="relative z-10 mx-auto flex min-h-105 max-w-7xl items-center px-6 pt-20">
          <div>
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Know Your Numbers
            </p>

            <h1 className="font-monst mt-4 text-5xl font-extrabold uppercase text-white md:text-6xl">
              BMI Calculator
            </h1>

            <p className="font-roboto mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
              Get a starting point for understanding your body mass
              index and making informed decisions about your fitness goals.
            </p>

            <Link
              to="/"
              className="font-monst mt-8 inline-flex items-center gap-3 bg-red-500 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-600"
            >
              Explore Strivo <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* BMI Calculator */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            {/* Introduction */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-monst text-sm font-bold uppercase tracking-[0.2em] text-red-500">
                  Your Starting Point
                </p>

                <h2 className="font-monst mt-5 text-4xl font-extrabold uppercase leading-tight text-[#05050f] md:text-5xl">
                  Understand Your Numbers.
                </h2>

                <p className="font-roboto mt-6 max-w-md text-lg leading-relaxed text-gray-600">
                  Enter your measurements to calculate your Body Mass
                  Index. Use the result as one starting point for
                  understanding your health and fitness.
                </p>
              </div>

              <div className="mt-12 border-l-2 border-red-500 py-2 pl-5">
                <p className="font-monst text-sm font-bold uppercase tracking-wide text-[#05050f]">
                  A useful measure. Not the whole picture.
                </p>

                <p className="font-roboto mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
                  BMI does not directly measure body fat or distinguish
                  muscle from fat. Consider your result alongside other
                  aspects of your health.
                </p>
              </div>
            </div>

            {/* Calculator Panel */}
            <div className="border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 sm:px-8">
                <h3 className="font-monst text-lg font-extrabold uppercase text-[#05050f]">
                  Calculate Your BMI
                </h3>

                <span className="font-roboto text-xs uppercase tracking-wider text-gray-500">
                  Adults 20+
                </span>
              </div>

              <div className="p-6 sm:p-8">
                {/* Unit Selector */}
                <div className="mb-8 flex border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => handleUnitChange("metric")}
                    className={`font-monst border-b-2 px-5 py-3 text-sm font-bold uppercase tracking-wide transition ${unit === "metric"
                      ? "border-red-500 text-[#05050f]"
                      : "border-transparent text-gray-400 hover:text-[#05050f]"
                      }`}
                  >
                    Metric
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUnitChange("imperial")}
                    className={`font-monst border-b-2 px-5 py-3 text-sm font-bold uppercase tracking-wide transition ${unit === "imperial"
                      ? "border-red-500 text-[#05050f]"
                      : "border-transparent text-gray-400 hover:text-[#05050f]"
                      }`}
                  >
                    Imperial
                  </button>
                </div>

                <form onSubmit={handleCalculate}>
                  {unit === "metric" ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="height"
                          className="font-monst mb-3 block text-sm font-bold uppercase tracking-wide text-[#05050f]"
                        >
                          Height <span className="text-gray-400">(cm)</span>
                        </label>

                        <input
                          id="height"
                          type="number"
                          min="91.44"
                          max="274.32"
                          step="any"
                          value={height}
                          onChange={(event) => setHeight(event.target.value)}
                          placeholder="e.g. 175"
                          className="w-full border border-gray-300 bg-gray-50 px-4 py-4 font-roboto text-lg text-[#05050f] outline-none transition focus:border-red-500 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="weight"
                          className="font-monst mb-3 block text-sm font-bold uppercase tracking-wide text-[#05050f]"
                        >
                          Weight <span className="text-gray-400">(kg)</span>
                        </label>

                        <input
                          id="weight"
                          type="number"
                          min="24.947"
                          max="453.592"
                          step="any"
                          value={weight}
                          onChange={(event) => setWeight(event.target.value)}
                          placeholder="e.g. 72"
                          className="w-full border border-gray-300 bg-gray-50 px-4 py-4 font-roboto text-lg text-[#05050f] outline-none transition focus:border-red-500 focus:bg-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="feet"
                          className="font-monst mb-3 block text-sm font-bold uppercase tracking-wide text-[#05050f]"
                        >
                          Height <span className="text-gray-400">(ft / in)</span>
                        </label>

                        <div className="flex gap-3">
                          <input
                            id="feet"
                            type="number"
                            min="3"
                            max="9"
                            value={feet}
                            onChange={(event) => setFeet(event.target.value)}
                            placeholder="Feet"
                            className="min-w-0 w-full border border-gray-300 bg-gray-50 px-3 py-4 font-roboto text-lg outline-none focus:border-red-500 focus:bg-white"
                          />

                          <input
                            aria-label="Height in inches"
                            type="number"
                            min="0"
                            max="11"
                            value={inches}
                            onChange={(event) => setInches(event.target.value)}
                            placeholder="Inches"
                            className="min-w-0 w-full border border-gray-300 bg-gray-50 px-3 py-4 font-roboto text-lg outline-none focus:border-red-500 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="pounds"
                          className="font-monst mb-3 block text-sm font-bold uppercase tracking-wide text-[#05050f]"
                        >
                          Weight <span className="text-gray-400">(lbs)</span>
                        </label>

                        <input
                          id="pounds"
                          type="number"
                          min="55"
                          max="1000"
                          step="any"
                          value={pounds}
                          onChange={(event) => setPounds(event.target.value)}
                          placeholder="e.g. 160"
                          className="w-full border border-gray-300 bg-gray-50 px-4 py-4 font-roboto text-lg text-[#05050f] outline-none transition focus:border-red-500 focus:bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {error && (
                    <p role="alert" className="mt-4 text-sm text-red-600">
                      {error}
                    </p>
                  )}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      className="font-monst flex-1 bg-red-500 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-red-600"
                    >
                      Calculate BMI <span aria-hidden="true">↗</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="font-monst border border-gray-300 px-6 py-4 text-sm font-bold uppercase tracking-wider text-[#05050f] transition hover:border-[#05050f]"
                    >
                      Reset
                    </button>
                  </div>
                </form>

                {/* Results */}
                <div
                  aria-live="polite"
                  className="mt-8 bg-[#05050f] p-6 text-white sm:p-8"
                >
                  {result ? (
                    <>
                      <p className="font-monst text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        Your Result
                      </p>

                      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="font-monst text-5xl font-extrabold md:text-6xl">
                            {result.bmi}
                          </p>
                          <p className="font-roboto mt-2 text-sm text-gray-400">
                            Body Mass Index
                          </p>
                        </div>

                        <span className="border border-red-500 px-4 py-2 font-monst text-sm font-bold uppercase tracking-wide text-white">
                          {result.category}
                        </span>
                      </div>

                      <p className="font-roboto mt-6 border-t border-white/20 pt-5 text-sm leading-relaxed text-gray-300">
                        This category is a general screening reference for
                        adults. It is not a diagnosis and may not reflect
                        body composition, especially for muscular athletes.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-monst text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        Your Result
                      </p>

                      <p className="font-monst mt-4 text-3xl font-extrabold uppercase">
                        Ready when you are.
                      </p>

                      <p className="font-roboto mt-3 max-w-md text-sm leading-relaxed text-gray-400">
                        Enter your height and weight above. Your BMI and
                        corresponding adult category will appear here.
                      </p>
                    </>
                  )}
                </div>

                <p className="font-roboto mt-5 text-xs leading-relaxed text-gray-500">
                  For adults aged 20 and over. BMI is a screening measure,
                  not a substitute for professional medical advice.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gray-50 px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          {/* Section Introduction */}
          <div>
            <p className="font-monst text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Make Your Next Move
            </p>

            <h2 className="font-monst mt-5 text-3xl font-extrabold uppercase leading-tight text-[#05050f] md:text-5xl">
              Your Result Is A Starting Point.
            </h2>

            <p className="font-roboto mt-5 max-w-lg text-lg leading-relaxed text-gray-600">
              Fitness is personal. Explore your options, find the right
              support and choose a next step that works for you.
            </p>
          </div>

          {/* Dynamic Next Step */}
          <div className="border border-gray-200 bg-white p-7 sm:p-10">

            {!result ? (
              <>
                <p className="font-monst text-sm font-bold uppercase tracking-widest text-gray-400">
                  Your Next Step
                </p>

                <h3 className="font-monst mt-4 text-2xl font-extrabold uppercase text-[#05050f]">
                  Start With Your Result.
                </h3>

                <p className="font-roboto mt-4 leading-relaxed text-gray-600">
                  Calculate your BMI first. We'll then show you relevant
                  ways to explore Strivo's training options.
                </p>

                <Link
                  to="/classes"
                  className="font-monst mt-7 inline-flex items-center gap-3 bg-[#05050f] px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-500"
                >
                  Explore Classes <span aria-hidden="true">↗</span>
                </Link>
              </>
            ) : (
              <>
                <p className="font-monst text-sm font-bold uppercase tracking-widest text-red-500">
                  Your BMI: {result.bmi}
                </p>

                <h3 className="font-monst mt-4 text-2xl font-extrabold uppercase text-[#05050f]">
                  {result.category === "Underweight"
                    ? "Find The Right Support."
                    : result.category === "Healthy weight"
                      ? "Keep Building Your Strength."
                      : "Explore Your Training Options."}
                </h3>

                <p className="font-roboto mt-4 leading-relaxed text-gray-600">
                  {result.category === "Underweight"
                    ? "BMI below the usual adult range does not tell the whole story. If you're concerned about your weight, consider speaking with a healthcare professional. Our team can help you explore appropriate exercise options."
                    : result.category === "Healthy weight"
                      ? "Your BMI falls within the usual adult reference range. Keep working towards your personal goals with strength training, conditioning and classes that suit your routine."
                      : "Your BMI is above the usual adult reference range, but it doesn't define your fitness or your potential. If improving your fitness is your goal, our team can help you explore suitable classes and training options."}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                 

                  {/* Contact Our Team Button */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {/* First Button */}
                    <Link
                      to={result.category === "Healthy weight" ? "/classes" : "/contact"}
                      className="font-monst inline-flex items-center justify-center gap-3 bg-red-500 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-600"
                    >
                      {result.category === "Healthy weight"
                        ? "Explore Classes"
                        : "Contact Our Team"}
                      <span aria-hidden="true">↗</span>
                    </Link>

                    {/* Keep your existing second button */}
                    <Link
                      to="/schedule"
                      className="font-monst inline-flex items-center justify-center gap-3 border border-[#05050f] px-6 py-4 text-sm font-bold uppercase tracking-wide text-[#05050f] transition hover:bg-[#05050f] hover:text-white"
                    >
                      View Schedule
                    </Link>
                  </div>


                </div>
              </>
            )}
          </div>

        </div>
      </section>

      <Footer />

    </main>
  )
}

export default BMI