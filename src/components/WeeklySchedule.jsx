import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]
const WeeklySchedule = () => {

  const [activeDay, setActiveDay] = useState(0)

  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true)
      setError("")

      const { data, error } = await supabase
        .from("class_sessions")
        .select(`
        id,
        starts_at,
        ends_at,
        status,
        classes (
          name,
          duration_minutes
        ),
        trainers (
          name
        )
      `)
        .eq("status", "scheduled")
        .order("starts_at", { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setSessions(data)
      }

      setLoading(false)
    }

    fetchSessions()
  }, [])

  const currentSessions = sessions.filter((session) => {
    const sessionDay = new Date(session.starts_at).toLocaleDateString(
      "en-US",
      { weekday: "long" }
    )

    return sessionDay === weekdays[activeDay]
  })

  if (loading) {
    return (
      <section className="bg-[#05050f] py-24 text-center text-gray-400">
        Loading weekly schedule...
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#05050f] py-24 text-center text-red-500">
        Unable to load schedule. Please try again.
      </section>
    )
  }

  return (
    <section className="bg-[#05050f] py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <p className="font-monst text-red-500 font-semibold uppercase tracking-wider">
          Weekly Schedule
        </p>

        <h2 className="font-monst mt-3 text-4xl md:text-5xl font-bold uppercase text-white">
          Train On Your Time
        </h2>


        {/* Days */}

        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">

          {weekdays.map((day, index) => (
            <button
              key={day}
              onClick={() => setActiveDay(index)}

              className={`font-monst px-4 py-4 text-sm font-bold uppercase transition duration-300 ${activeDay === index
                ? "bg-red-500 text-white"
                : "bg-[#11111d] text-gray-400 hover:bg-[#1b1b29] hover:text-white"
                }`}
            >
              {day}
            </button>

          ))}

        </div>


        {/* Classes */}

        <div className="mt-6 space-y-3">

          {currentSessions.length === 0 ? (
            <p className="py-10 text-center text-gray-400">
              No sessions scheduled for this day.
            </p>
          ) : (
            currentSessions.map((session) => (

              <div
                key={session.id}
                className="group grid gap-6 bg-[#11111d] p-6 transition duration-300 hover:bg-[#171722] md:grid-cols-[140px_1fr_auto] md:items-center"
              >

                {/* Time */}

                <div>

                  <p className="font-monst text-xl font-bold text-white">
                    {new Date(session.starts_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>

                  <p className="font-roboto mt-1 text-sm text-gray-500">
                    {Math.round((new Date(session.ends_at) - new Date(session.starts_at)) / 60000)} min
                  </p>

                </div>


                {/* Class */}

                <div>

                  <p className="font-monst text-xl font-bold uppercase text-white">
                    {session.classes?.name || "Class"}
                  </p>

                  <p className="font-roboto mt-2 text-sm text-gray-400">
                    {session.trainers?.name || "Coach to be announced"}


                  </p>

                </div>


                {/* Book Button */}

                <Link
                  to="/schedule"
                  className="font-monst inline-flex w-fit items-center gap-2 border border-gray-600 px-5 py-3 text-sm font-bold uppercase text-white transition duration-300 group-hover:border-red-500 group-hover:bg-red-500"
                >
                  Book Class
                </Link>

              </div>

            ))
          )}

        </div>


        {/* Full Schedule */}

        <div className="mt-10">

          <Link
            to="/schedule"
            className="font-monst inline-flex items-center gap-3 border border-gray-600 px-6 py-3 text-sm font-bold uppercase text-white transition duration-300 hover:border-red-500 hover:bg-red-500"
          >
            View Full Schedule
          </Link>

        </div>

      </div>

    </section>
  )
}

export default WeeklySchedule