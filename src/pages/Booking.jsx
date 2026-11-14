
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { supabase } from "../lib/supabase"

const Booking = () => {
  // Read class and session IDs from the URL query parameters.
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const sessionId = searchParams.get("session")
  const classId = searchParams.get("class")
  const planSlug = searchParams.get("plan")

  // Manage session details, available sessions, loading states, and feedback messages.
  const [session, setSession] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [membershipLoading, setMembershipLoading] = useState(false)
  const [membershipMessage, setMembershipMessage] = useState("")
  const [availableSessions, setAvailableSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingMessage, setBookingMessage] = useState("")
  const [existingBooking, setExistingBooking] = useState(null)
  const [cancellationLoading, setCancellationLoading] = useState(false)
  const isPastSession =
    session && new Date(session.starts_at).getTime() <= Date.now()

  // Cancel an existing booking and update its status in the database.
  const handleCancellation = async () => {
    if (!existingBooking) return

    setCancellationLoading(true)
    setBookingMessage("")

    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", existingBooking.id)

    setCancellationLoading(false)

    if (error) {
      setBookingMessage("Unable to cancel your booking. Please try again.")
      return
    }

    // Update the local booking state after successful cancellation.
    setExistingBooking({
      ...existingBooking,
      status: "cancelled",
    })

    setBookingMessage("Your booking has been cancelled successfully.")
  }

  // Create a new booking or reactivate a previously cancelled booking.
  const handleBooking = async () => {
    // Prevent booking if the session has already started.
    if (
      !session ||
      new Date(session.starts_at).getTime() <= Date.now()
    ) {
      setBookingMessage("This session has already started.")
      return
    }

    setBookingLoading(true)
    setBookingMessage("")

    // Verify that the user is authenticated before processing the booking.
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      setBookingLoading(false)
      navigate(
        `/login?redirect=${encodeURIComponent(
          `/booking?session=${sessionId}`
        )}`
      )
      return
    }

    // Reactivate an existing cancelled booking or create a new booking record.
    const { data: bookingData, error: bookingError } =
      existingBooking?.status === "cancelled"
        ? await supabase
          .from("bookings")
          .update({ status: "confirmed" })
          .eq("id", existingBooking.id)
          .select("id, status")
          .single()
        : await supabase
          .from("bookings")
          .insert({
            session_id: Number(sessionId),
            member_id: user.id,
            status: "confirmed",
          })
          .select("id, status")
          .single()

    setBookingLoading(false)

    // Handle booking errors and display appropriate feedback to the user.
    if (bookingError) {
      if (bookingError.code === "23505") {
        setBookingMessage("You have already booked this session.")
      } else if (bookingError.message.includes("session is full")) {
        setBookingMessage("Sorry, this session is fully booked.")
      } else if (bookingError.message.includes("already started")) {
        setBookingMessage("This session has already started.")
      } else if (bookingError.message.includes("not available for booking")) {
        setBookingMessage("This session is no longer available.")
      } else {
        setBookingMessage("Unable to complete your booking. Please try again.")
      }

      return
    }

    // Store the confirmed booking and display a success message.
    setExistingBooking(bookingData)
    setBookingMessage("Your session has been booked successfully.")
  }

  // Submit a membership request.
  const handleMembershipRequest = async () => {
    if (!selectedPlan) return

    setMembershipLoading(true)
    setMembershipMessage("")

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      setMembershipLoading(false)

      navigate(
        `/login?redirect=${encodeURIComponent(
          `/booking?plan=${planSlug}`
        )}`
      )

      return
    }

    const { error } = await supabase
      .from("memberships")
      .insert({
        member_id: user.id,
        plan_id: selectedPlan.id,
        status: "pending",
        payment_status: "pending",
      })

    setMembershipLoading(false)

    if (error) {
      console.log("Membership request error:", error.message)
      setMembershipMessage(
        "Unable to submit your membership request. Please try again."
      )
      return
    }

    setMembershipMessage(
      "Your membership request has been submitted successfully. Please visit the gym to complete payment."
    )
  }

  // Fetch available class sessions or the details of a selected session.
  useEffect(() => {
    const fetchSession = async () => {

      // Fetch the selected membership plan.
      if (planSlug) {
        const { data, error } = await supabase
          .from("membership_plans")
          .select("*")
          .eq("slug", planSlug)
          .eq("is_active", true)
          .maybeSingle()

        if (error) {
          setError("Unable to load the selected membership plan.")
        } else if (!data) {
          setError("This membership plan is unavailable.")

        } else {
          // Check whether the member is logged in.
          const {
            data: { session: userSession },
            error: authError,
          } = await supabase.auth.getSession()

          if (authError) {
            setError("Unable to verify your login status.")
            setLoading(false)
            return
          }

          if (!userSession) {
            navigate(
              `/login?redirect=${encodeURIComponent(
                `/booking?plan=${planSlug}`
              )}`
            )
            return
          }

          setSelectedPlan(data)
        }

        setLoading(false)
        return
      }

      // Load upcoming sessions when no specific session is selected.
      if (!sessionId) {
        setLoading(true)
        setError("")

        let sessionsQuery = supabase
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
          .gt("starts_at", new Date().toISOString())
          .order("starts_at", { ascending: true })

        // Filter by class when a class ID is provided.
        if (classId) {
          sessionsQuery = sessionsQuery.eq(
            "class_id",
            Number(classId)
          )
        }

        const { data, error } = await sessionsQuery

        if (error) {
          setError("Unable to load available sessions.")
        } else {
          setAvailableSessions(data || [])
        }

        setLoading(false)
        return
      }


    


      // Check the user's authentication status before loading booking details.
      const { data: { session: userSession }, error: authError } =
        await supabase.auth.getSession()

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      // Redirect unauthenticated users to login and preserve their booking URL.
      if (!userSession) {
        navigate(
          `/login?redirect=${encodeURIComponent(
            `/booking?session=${sessionId}`
          )}`
        )
        return
      }

      // Check whether the current user already has a booking for this session.
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select("id, status")
        .eq("session_id", Number(sessionId))
        .eq("member_id", userSession.user.id)
        .maybeSingle()

      if (bookingError) {
        setError("Unable to check your existing booking.")
        setLoading(false)
        return
      }

      setExistingBooking(bookingData)

      // Retrieve the selected session together with its class and trainer details.
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
        .eq("id", sessionId)
        .maybeSingle()

      if (error) {
        setError(error.message)
      } else if (!data) {
        setError("This session could not be found.")
      } else if (data.status !== "scheduled") {
        setError("This session is no longer available for booking.")
      } else {
        setSession(data)
      }

      setLoading(false)
    }

    fetchSession()
  }, [sessionId, classId, navigate])

  // Display a loading message while session data is being retrieved.
  // if (loading) {
  //   return <p className="p-8 text-gray-500">Loading session details...</p>
  // }

  // Display a loading indicator while booking information is being retrieved.
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-red-500"></div>

          <h2 className="mt-6 font-monst text-lg font-bold uppercase text-[#05050f]">
            {classId && !sessionId
              ? "Finding Available Sessions"
              : "Loading Session Details"}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please wait while we retrieve the information.
          </p>
        </div>
      </main>
    )
  }


  // Display the selected membership plan.
  if (planSlug && selectedPlan) {
    return (
      <main className="min-h-screen bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-monst text-3xl font-bold uppercase text-[#05050f]">
            Membership Request
          </h1>

          <div className="mt-8 border border-gray-200 p-8">
            <p className="font-monst text-sm font-bold uppercase text-red-500">
              Selected Plan
            </p>

            <h2 className="font-monst mt-4 text-2xl font-bold uppercase text-[#05050f]">
              {selectedPlan.name}
            </h2>

            <p className="font-roboto mt-3 text-3xl font-bold text-[#05050f]">
              ${selectedPlan.price}
              <span className="text-base font-normal text-gray-500">
                {" "}/ month
              </span>
            </p>

            <p className="font-roboto mt-5 leading-relaxed text-gray-600">
              {selectedPlan.tagline}
            </p>

            <div className="mt-6">
              <h3 className="font-monst font-bold uppercase text-[#05050f]">
                What's Included
              </h3>

              <ul className="mt-4 space-y-3">
                {[...selectedPlan.features, ...selectedPlan.extras].map(
                  (feature, index) => (
                    <li
                      key={index}
                      className="font-roboto text-gray-600"
                    >
                      <span className="mr-3 text-red-500">✓</span>
                      {feature}
                    </li>
                  )
                )}
              </ul>
            </div>

            <button
              type="button"
              onClick={handleMembershipRequest}
              disabled={membershipLoading}
              className="mt-8 w-full bg-red-500 px-6 py-4 font-monst text-sm font-bold uppercase text-white transition hover:bg-red-600 disabled:opacity-60"
            >
              {membershipLoading
                ? "Submitting Request..."
                : "Submit Membership Request"}
            </button>

            {membershipMessage && (
              <p className="mt-5 text-sm leading-relaxed text-gray-600">
                {membershipMessage}
              </p>
            )}
          </div>
        </div>
      </main>
    )
  }




  // Display an error message if the requested data cannot be retrieved.
  if (error) {
    return <p className="p-8 text-red-500">{error}</p>
  }

  // Display all upcoming sessions when the user selects a class.
  if (!sessionId) {
    return (
      <main className="min-h-screen bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-monst text-3xl font-bold uppercase text-[#05050f]">
            Choose Your Session
          </h1>

          <p className="mt-3 text-gray-600">
            Select an available date and time to book this class.
          </p>

          {/* Show available sessions or an empty-state message. */}
          {availableSessions.length === 0 ? (
            <p className="mt-8 text-gray-500">
              No upcoming sessions are currently available for this class.
            </p>
          ) : (
            <div className="mt-8 space-y-4">
              {availableSessions.map((item) => (
                <div key={item.id} className="border border-gray-200 p-6">
                  <h2 className="font-monst text-xl font-bold uppercase text-[#05050f]">
                    {item.classes?.name || "Class"}
                  </h2>

                  <p className="mt-3 text-gray-600">
                    Date:{" "}
                    {new Date(item.starts_at).toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <p className="mt-2 text-gray-600">
                    Time:{" "}
                    {new Date(item.starts_at).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <p className="mt-2 text-gray-600">
                    Coach: {item.trainers?.name || "Coach to be announced"}
                  </p>

                  {/* Navigate to the selected session's booking page. */}
                  <button
                    type="button"
                    onClick={() => navigate(`/booking?session=${item.id}`)}
                    className="mt-5 w-full bg-red-500 px-5 py-3 font-monst text-sm font-bold uppercase text-white transition hover:bg-red-600"
                  >
                    Book This Session
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    )
  }

  // Prevent the booking interface from rendering before session data is available.
  if (!session) {
    return <p className="p-8 text-gray-500">Loading session details...</p>
  }

  // Display the selected session and its booking or cancellation controls.
  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-monst text-3xl font-bold uppercase text-[#05050f]">
          Book Your Session
        </h1>

        <div className="mt-8 border border-gray-200 p-6">
          <h2 className="font-monst text-xl font-bold uppercase text-[#05050f]">
            {session.classes?.name || "Class"}
          </h2>

          <p className="mt-4 text-gray-600">
            Date:{" "}
            {new Date(session.starts_at).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="mt-2 text-gray-600">
            Time:{" "}
            {new Date(session.starts_at).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p className="mt-2 text-gray-600">
            Duration:{" "}
            {Math.round(
              (new Date(session.ends_at) -
                new Date(session.starts_at)) /
              60000
            )}{" "}
            minutes
          </p>

          <p className="mt-2 text-gray-600">
            Coach: {session.trainers?.name || "Coach to be announced"}
          </p>

          {/* Show a message if the session has already started. */}
          {isPastSession ? (
            <p className="mt-6 text-sm text-red-500" role="status">
              This session has already started and is no longer available for booking.
            </p>
          ) : existingBooking?.status === "confirmed" ? (
            <button
              type="button"
              onClick={handleCancellation}
              disabled={cancellationLoading}
              className="mt-6 w-full bg-gray-900 px-5 py-3 font-monst text-sm font-bold uppercase text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cancellationLoading ? "Cancelling..." : "Cancel Booking"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleBooking}
              disabled={bookingLoading}
              className="mt-6 w-full bg-red-500 px-5 py-3 font-monst text-sm font-bold uppercase text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {bookingLoading ? "Booking..." : "Confirm Booking"}
            </button>
          )}

          {/* Display booking confirmation, cancellation, or error feedback. */}
          {bookingMessage && (
            <p className="mt-4 text-sm text-gray-600" role="status">
              {bookingMessage}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default Booking
