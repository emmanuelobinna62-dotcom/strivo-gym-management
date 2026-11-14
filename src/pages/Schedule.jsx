import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import Footer from "../components/Footer"
import { supabase } from "../lib/supabase"

// Detect the visitor's timezone from their browser.
// Example: Africa/Lagos, America/Toronto, Europe/London.
const getVisitorTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

// Convert a date/time into a YYYY-MM-DD key in the visitor's timezone.
// This makes session filtering follow the visitor's local calendar date.
const getLocalDateKey = (date) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: getVisitorTimeZone(),
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date)

  const year = parts.find((part) => part.type === "year").value
  const month = parts.find((part) => part.type === "month").value
  const day = parts.find((part) => part.type === "day").value

  return `${year}-${month}-${day}`
}

// Work with date-only keys in UTC to avoid daylight-saving/timezone shifts
// while moving between calendar dates.
const addDaysToDateKey = (dateKey, days) => {
  const date = new Date(`${dateKey}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().split("T")[0]
}

// Get the Monday that starts the week containing the supplied date key.
const getMondayDateKey = (dateKey) => {
  const date = new Date(`${dateKey}T12:00:00Z`)
  const day = date.getUTCDay()
  const difference = day === 0 ? -6 : 1 - day

  date.setUTCDate(date.getUTCDate() + difference)

  return date.toISOString().split("T")[0]
}

// Build the seven date keys from Monday through Sunday.
const getWeekDates = (mondayDateKey) => {
  return Array.from({ length: 7 }, (_, index) =>
    addDaysToDateKey(mondayDateKey, index)
  )
}

// Format a date key for display without accidentally shifting its day.
const formatDate = (dateKey, options = {}) => {
  return new Date(`${dateKey}T12:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    ...options,
  })
}

// Format an actual session timestamp in the visitor's local timezone.
const formatSessionTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    timeZone: getVisitorTimeZone(),
    hour: "2-digit",
    minute: "2-digit",
  })
}

const Schedule = () => {
  // The selected date starts as today's date in the visitor's timezone.
  const [selectedDate, setSelectedDate] = useState(() =>
    getLocalDateKey(new Date())
  )
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch all scheduled sessions from Supabase.
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
        setSessions(data || [])
      }

      setLoading(false)
    }

    fetchSessions()
  }, [])

  // Work out the Monday and Sunday for the week containing selectedDate.
  const weekStartDate = getMondayDateKey(selectedDate)
  const weekEndDate = addDaysToDateKey(weekStartDate, 6)
  const weekDates = getWeekDates(weekStartDate)

  // Get the current time so past sessions cannot appear as bookable.
  const now = new Date()

  // Show only sessions scheduled for the selected date
  // whose starting time has not already passed.
  const currentSessions = sessions.filter((session) => {
    const sessionStart = new Date(session.starts_at)

    const isSelectedDate =
      getLocalDateKey(sessionStart) === selectedDate

    const isUpcoming = sessionStart > now

    return isSelectedDate && isUpcoming
  })

  // Move the selected date by seven days, keeping the same weekday selected.
  const goToPreviousWeek = () => {
    setSelectedDate((currentDate) =>
      addDaysToDateKey(currentDate, -7)
    )
  }

  const goToNextWeek = () => {
    setSelectedDate((currentDate) =>
      addDaysToDateKey(currentDate, 7)
    )
  }

  // The selected date's full weekday and date for the timetable heading.
  const selectedDateHeading = formatDate(selectedDate, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  if (loading) {
    return (
      <main className="bg-[#05050f] px-6 py-32 text-center text-white">
        Loading schedule...
      </main>
    )
  }

  if (error) {
    return (
      <main className="bg-[#05050f] px-6 py-32 text-center text-white">
        <p className="text-red-500">{error}</p>
      </main>
    )
  }

  return (
    <main>
      {/* Schedule Hero */}
      <section className="relative min-h-105 bg-[#05050f]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/schedule.avif')] bg-cover bg-center"></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#05050f]/75"></div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-105 max-w-7xl items-center px-6 pt-20">
          <div>
            <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
              Plan Your Training
            </p>

            <h1 className="font-monst mt-4 text-5xl font-extrabold uppercase text-white md:text-6xl">
              Class Schedule
            </h1>

            <p className="font-roboto mt-5 max-w-xl text-lg leading-relaxed text-gray-300">
              Find your session, choose your training level and make time
              for your next workout.
            </p>
          </div>
        </div>
      </section>

      {/* Weekly Timetable */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Heading */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Find Your Session
              </p>

              <h2 className="font-monst mt-4 text-4xl font-bold uppercase leading-tight text-[#05050f] md:text-5xl">
                Weekly
                <br />
                Timetable.
              </h2>
            </div>

            <p className="font-roboto max-w-md text-base leading-relaxed text-gray-600">
              Select a date to explore that day's training sessions.
              Choose the level that suits you and reserve your place.
            </p>
          </div>

          {/* Week navigation and currently displayed date range */}
          <div className="mt-12 flex flex-col justify-between gap-4 border-y border-gray-200 py-5 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={goToPreviousWeek}
              className="inline-flex items-center gap-2 self-start font-monst text-xs font-bold uppercase text-[#05050f] transition duration-300 hover:text-red-500"
              aria-label="Go to previous week"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              Previous Week
            </button>

            <p className="font-monst text-sm font-bold uppercase text-[#05050f] sm:text-center">
              {formatDate(weekStartDate, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              {" — "}
              {formatDate(weekEndDate, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <button
              type="button"
              onClick={goToNextWeek}
              className="inline-flex items-center gap-2 self-start font-monst text-xs font-bold uppercase text-[#05050f] transition duration-300 hover:text-red-500 sm:self-auto"
              aria-label="Go to next week"
            >
              Next Week
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* Seven date buttons for the selected week, Monday to Sunday */}
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
            {weekDates.map((dateKey) => {
              const dayName = formatDate(dateKey, { weekday: "short" })
              const dayNumber = formatDate(dateKey, { day: "2-digit" })
              const isSelected = selectedDate === dateKey

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => setSelectedDate(dateKey)}
                  aria-pressed={isSelected}
                  className={`border px-3 py-4 font-monst transition duration-300 sm:py-5 ${isSelected
                      ? "border-[#05050f] bg-[#05050f] text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-red-500 hover:text-red-500"
                    }`}
                >
                  <span className="block text-xs font-bold uppercase">
                    {dayName}
                  </span>
                  <span className="mt-1 block text-xl font-extrabold">
                    {dayNumber}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Selected date heading and session count */}
          <div className="mt-12 flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#05050f] pb-5">
            <div>
              <p className="font-roboto text-sm text-gray-500">
                Training Schedule
              </p>

              <h3 className="font-monst mt-2 text-2xl font-bold uppercase text-[#05050f] md:text-3xl">
                {selectedDateHeading}
              </h3>
            </div>

            <p className="font-roboto text-sm text-gray-500">
              {currentSessions.length}{" "}
              {currentSessions.length === 1 ? "session" : "sessions"} scheduled
            </p>
          </div>

          {/* Sessions for the selected date only */}
          <div>
            {currentSessions.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-monst text-sm font-bold uppercase text-[#05050f]">
                  No sessions scheduled
                </p>
                <p className="font-roboto mt-2 text-sm text-gray-500">
                  There are no training sessions scheduled for this date.
                  Try another day or move to a different week.
                </p>
              </div>
            ) : (
              currentSessions.map((session) => (
                <div
                  key={session.id}
                  className="grid gap-5 border-b border-gray-200 py-7 transition duration-300 hover:bg-gray-50 sm:px-4 md:grid-cols-[130px_1fr_auto] md:items-center md:gap-8"
                >
                  {/* Session start time, converted to the visitor's timezone */}
                  <div>
                    <p className="font-monst text-sm font-bold text-red-500">
                      {formatSessionTime(session.starts_at)}
                    </p>

                    <p className="font-roboto mt-2 text-xs text-gray-500">
                      {Math.round(
                        (new Date(session.ends_at) -
                          new Date(session.starts_at)) /
                        60000
                      )}{" "}
                      min
                    </p>
                  </div>

                  {/* Class details */}
                  <div>
                    <p className="font-roboto text-xs font-medium uppercase tracking-wider text-gray-500">
                      Scheduled Session
                    </p>

                    <h4 className="font-monst mt-2 text-lg font-bold uppercase text-[#05050f] md:text-xl">
                      {session.classes?.name || "Class"}
                    </h4>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="inline-flex items-center border border-gray-200 px-3 py-1.5 font-monst text-xs font-bold uppercase text-gray-600">
                        {session.status}
                      </span>

                      <span className="font-roboto text-sm text-gray-500">
                        Coach: {session.trainers?.name || "Coach to be announced"}
                      </span>
                    </div>
                  </div>

                  {/* Keep the existing session-specific booking link */}
                  <div>
                    <Link
                      to={`/booking?session=${session.id}`}
                      className="font-monst inline-flex items-center gap-3 text-sm font-bold uppercase text-[#05050f] transition duration-300 hover:text-red-500"
                    >
                      Book Session
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Timetable Note */}
          <div className="mt-8 flex flex-col gap-3 border-l-4 border-red-500 bg-[#f5f5f5] p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-roboto text-sm leading-relaxed text-gray-600">
              Session dates and times are displayed in your local timezone.
              Choose a session that matches your current training experience.
            </p>

            <Link
              to="/classes"
              className="font-monst inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase text-[#05050f] transition duration-300 hover:text-red-500"
            >
              Explore Classes
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </section>

      {/* Schedule CTA */}
      <section className="bg-white px-6 pb-24 pt-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('/schedule-cta.webp')] bg-cover bg-center"></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#05050f]/70"></div>

          {/* Content */}
          <div className="relative z-10 flex min-h-80 flex-col justify-center px-8 py-16 md:px-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <p className="font-monst text-sm font-bold uppercase tracking-wider text-red-500">
                Your Next Session Starts Here
              </p>

              <h2 className="font-monst mt-4 text-3xl font-extrabold uppercase leading-tight text-white md:text-5xl">
                Make Time
                <br />
                For Your Goals.
              </h2>

              <p className="font-roboto mt-5 max-w-xl leading-relaxed text-gray-300">
                Found your session? Reserve your place and take the next step
                in your training.
              </p>
            </div>

            <div className="mt-8 flex shrink-0 flex-wrap gap-4 lg:mt-0">
              <Link
                to="/booking"
                className="font-monst inline-flex items-center gap-3 bg-red-500 px-7 py-4 text-sm font-bold uppercase text-white transition duration-300 hover:bg-white hover:text-[#05050f]"
              >
                Book A Session
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

              <Link
                to="/classes"
                className="font-monst inline-flex items-center border border-white/50 px-7 py-4 text-sm font-bold uppercase text-white transition duration-300 hover:border-white hover:bg-white hover:text-[#05050f]"
              >
                Explore Classes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

export default Schedule
