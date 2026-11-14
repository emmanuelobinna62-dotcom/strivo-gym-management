
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const MemberDashboard = () => {

  // Profile information
  const [profile, setProfile] = useState(null)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)

  // Profile editing states
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  // Booking information
  const [bookings, setBookings] = useState([])
  const [bookingsLoading, setBookingsLoading] = useState(true)
  // Membership information
  const [membership, setMembership] = useState(null)
  const [membershipLoading, setMembershipLoading] = useState(true)

  // Separate bookings into upcoming and history
  const upcomingBookings = bookings.filter((booking) => {
    return (
      booking.status === "confirmed" &&
      new Date(booking.class_sessions?.starts_at) > new Date()
    )
  })

  const bookingHistory = bookings.filter((booking) => {
    return (
      booking.status !== "confirmed" ||
      new Date(booking.class_sessions?.starts_at) <= new Date()
    )
  })

  // Dashboard statistics
  const totalBookings = bookings.length

  const totalUpcomingBookings = upcomingBookings.length


  // Save profile function comes next...


  // Fetch the logged-in member's profile and bookings
  useEffect(() => {

    const getProfile = async () => {

      // Get the currently logged-in user
      const { data: { user }, error: userError } =
        await supabase.auth.getUser()

      // Stop if there is no authenticated user
      if (userError || !user) {
        console.log("User error:", userError)

        setLoading(false)
        setBookingsLoading(false)
        setMembershipLoading(false)
        return
      }

      // Save the user's email address
      setEmail(user.email || "")


      // Fetch the member's profile from Supabase
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (error) {
        console.log("Profile error:", error.message)
      } else {
        setProfile(data)

        // Fill the editing fields with existing profile information
        setFullName(data.full_name || "")
        setPhone(data.phone || "")
      }


      // Fetch the member's bookings
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select(`
          id,
          status,
          booked_at,
          class_sessions (
            id,
            starts_at,
            ends_at,
            classes (
              name,
              description,
              duration_minutes
            )
          )
        `)
        .eq("member_id", user.id)

      if (bookingError) {
        console.log("Bookings error:", bookingError.message)
      } else {
        setBookings(bookingData || [])
      }

      // Fetch membership information
      const { data: membershipData, error: membershipError } = await supabase
        .from("memberships")
        .select(`
    id,
    status,
    payment_status,
    start_date,
    end_date,
    created_at,
    plan:membership_plans (
      name,
      price,
      billing_interval
    )
  `)
        .eq("member_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (membershipError) {
        console.log("Membership error:", membershipError.message)
      } else {
        setMembership(membershipData)
      }

      setMembershipLoading(false)

      // Finish loading both sections
      setBookingsLoading(false)
      setLoading(false)

    }

    getProfile()

  }, [])


  // Update the member's profile
  const handleSaveProfile = async (e) => {

    e.preventDefault()

    setSaving(true)
    setMessage("")

    try {
      const { data: { user }, error: userError } =
        await supabase.auth.getUser()

      if (userError || !user || !profile) {
        setMessage("Please log in to update your profile.")
        setEditing(false)
        return
      }

      const { data, error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          phone: phone.trim(),
        })
        .eq("id", user.id)
        .select()
        .single()

      if (error) {
        setMessage(error.message)
        return
      }

      setProfile(data)
      setEditing(false)
      setMessage("Profile updated successfully!")

    } catch (error) {
      console.log("Profile update error:", error)
      setMessage("Something went wrong. Please try again.")

    } finally {
      setSaving(false)
    }

  }


  // Cancel a member's booking
  const handleCancelBooking = async (bookingId) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    )

    if (!confirmCancel) {
      return
    }

    // Update booking status in Supabase
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "cancelled",
      })
      .eq("id", bookingId)

    if (error) {
      console.log("Cancellation error:", error.message)
      return
    }

    // Update the booking in React state
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "cancelled" }
          : booking
      )
    )

  }




  // Show loading message while profile is being fetched
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="font-roboto text-lg text-gray-600">
          Loading member dashboard...
        </p>
      </main>
    )
  }

  return (

    <main className="min-h-screen bg-[#05050f] px-6 pt-32 pb-16 text-white md:px-12">

      <div className="mx-auto max-w-6xl">

        {/* Dashboard Heading */}
        <h1 className="font-monst text-3xl font-extrabold uppercase">
          Member Dashboard
        </h1>

        <p className="mt-2 font-roboto text-gray-400">
          Welcome back, {profile?.full_name}.
        </p>


        {/* Dashboard Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Bookings */}
          <div className="border border-gray-800 bg-[#0b0b18] p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Total Bookings
            </p>

            <h2 className="mt-3 font-monst text-4xl font-extrabold">
              {bookingsLoading ? "..." : totalBookings}
            </h2>
          </div>

          {/* Upcoming Sessions */}
          <div className="border border-gray-800 bg-[#0b0b18] p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Upcoming Sessions
            </p>

            <h2 className="mt-3 font-monst text-4xl font-extrabold">
              {bookingsLoading ? "..." : totalUpcomingBookings}
            </h2>
          </div>

          {/* Membership Status */}
          <div className="border border-gray-800 bg-[#0b0b18] p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Membership Status
            </p>

            <h2 className="mt-3 font-monst text-2xl font-extrabold text-yellow-500">
              {membershipLoading
                ? "Loading..."
                : membership
                  ? membership.status
                  : "No Membership"}
            </h2>
          </div>

        </div>


        {/* Membership Details */}
        <div className="mt-8 border border-gray-800 bg-[#0b0b18] p-6 md:p-8">

          <h2 className="font-monst text-xl font-bold uppercase">
            My Membership
          </h2>

          {membershipLoading ? (

            <p className="mt-5 text-gray-400">
              Loading membership details...
            </p>

          ) : membership ? (

            <div className="mt-6 space-y-4">

              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Selected Plan
                </p>
                <p className="mt-2 text-lg font-bold">
                  {membership.plan?.name || "Plan unavailable"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Monthly Price
                </p>
                <p className="mt-2 text-lg font-bold">
                  ${membership.plan?.price}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Payment Status
                </p>
                <p className="mt-2 font-bold uppercase text-yellow-500">
                  {membership.payment_status}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  Start Date
                </p>
                <p className="mt-2 text-gray-300">
                  {membership.start_date
                    ? new Date(membership.start_date).toLocaleDateString()
                    : "Awaiting activation"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-gray-500">
                  End Date
                </p>
                <p className="mt-2 text-gray-300">
                  {membership.end_date
                    ? new Date(membership.end_date).toLocaleDateString()
                    : "Awaiting activation"}
                </p>
              </div>

            </div>

          ) : (

            <p className="mt-5 text-gray-400">
              You have not selected a membership plan yet.
            </p>

          )}

        </div>



        {/* ============================= */}
        {/* MY PROFILE SECTION */}
        {/* ============================= */}

        <div className="mt-10 max-w-2xl border border-gray-800 bg-[#0b0b18] p-6 md:p-8">

          {/* Profile Card Heading */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-5">

            <div>
              <h2 className="font-monst text-xl font-bold uppercase">
                My Profile
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Your personal account information
              </p>
            </div>

            {/* First letter of member's name */}
            <div className="flex h-12 w-12 items-center justify-center bg-red-500 font-monst text-xl font-bold uppercase">
              {profile?.full_name?.charAt(0) || "M"}
            </div>

          </div>


          {/* Display Profile Information */}
          {!editing ? (

            <>

              <div className="mt-6 space-y-6">

                {/* Full Name */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Full Name
                  </p>

                  <p className="mt-2 text-white">
                    {profile?.full_name || "Not provided"}
                  </p>
                </div>


                {/* Email Address */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Email Address
                  </p>

                  <p className="mt-2 break-all text-white">
                    {email || "Not provided"}
                  </p>
                </div>


                {/* Phone Number */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Phone Number
                  </p>

                  <p className="mt-2 text-white">
                    {profile?.phone || "Not provided"}
                  </p>
                </div>


                {/* Account Type */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Account Type
                  </p>

                  <p className="mt-2 inline-block bg-red-500/10 px-3 py-1 text-sm font-bold uppercase text-red-500">
                    {profile?.role || "Client"}
                  </p>
                </div>

              </div>


              {/* Edit Profile Button */}
              {/* Edit Profile Button */}
              {profile && (
                <button
                  onClick={() => {
                    setFullName(profile.full_name || "")
                    setPhone(profile.phone || "")
                    setMessage("")
                    setEditing(true)
                  }}
                  className="mt-8 bg-red-500 px-6 py-3 font-monst text-sm font-bold uppercase transition hover:bg-red-600"
                >
                  Edit Profile
                </button>
              )}

            </>

          ) : (

            /* Profile Editing Form */
            <form onSubmit={handleSaveProfile} className="mt-6 space-y-6">

              {/* Edit Full Name */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Full Name
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full border border-gray-700 bg-transparent px-4 py-3 text-white outline-none focus:border-red-500"
                />
              </div>


              {/* Edit Phone Number */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-700 bg-transparent px-4 py-3 text-white outline-none focus:border-red-500"
                  placeholder="Enter your phone number"
                />
              </div>


              {/* Save and Cancel Buttons */}
              <div className="flex flex-wrap gap-4">

                <button
                  type="submit"
                  disabled={saving || !fullName.trim()}
                  className="bg-red-500 px-6 py-3 font-monst text-sm font-bold uppercase transition hover:bg-red-600 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>


                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setEditing(false)
                    setMessage("")
                  }}
                  className="border border-gray-600 px-6 py-3 font-monst text-sm font-bold uppercase transition hover:border-white"
                >
                  Cancel
                </button>

              </div>

            </form>

          )}


          {/* Profile Update Message */}
          {message && (
            <p className="mt-5 text-sm text-gray-300" role="status">
              {message}
            </p>
          )}

        </div>



        {/* ============================= */}
        {/* MY BOOKINGS SECTION */}
        {/* ============================= */}

        <div className="mt-12">

          <h2 className="font-monst text-2xl font-extrabold uppercase">
            My Bookings
          </h2>

          <p className="mt-2 font-roboto text-gray-400">
            View and manage your training sessions.
          </p>

          {bookingsLoading ? (

            <p className="mt-6 text-gray-400">
              Loading bookings...
            </p>

          ) : (

            <>

              {/* UPCOMING BOOKINGS */}
              <div className="mt-8">

                <h3 className="font-monst text-lg font-bold uppercase text-red-500">
                  Upcoming Bookings
                </h3>

                {upcomingBookings.length === 0 ? (

                  <p className="mt-4 text-gray-400">
                    You have no upcoming bookings.
                  </p>

                ) : (

                  <div className="mt-5 space-y-4">

                    {upcomingBookings.map((booking) => (

                      <div
                        key={booking.id}
                        className="border border-gray-800 bg-[#0b0b18] p-6"
                      >

                        <h4 className="font-monst text-lg font-bold uppercase">
                          {booking.class_sessions?.classes?.name || "Class"}
                        </h4>

                        <p className="mt-2 text-sm text-gray-400">
                          {booking.class_sessions?.classes?.description}
                        </p>

                        <p className="mt-4 text-sm text-gray-300">
                          Start: {new Date(
                            booking.class_sessions.starts_at
                          ).toLocaleString()}
                        </p>

                        <p className="mt-2 text-sm text-gray-300">
                          End: {new Date(
                            booking.class_sessions.ends_at
                          ).toLocaleString()}
                        </p>

                        <p className="mt-4 text-sm font-bold uppercase text-green-500">
                          Status: {booking.status}
                        </p>

                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="mt-5 border border-red-500 px-5 py-2 text-sm font-bold uppercase text-red-500 transition hover:bg-red-500 hover:text-white"
                        >
                          Cancel Booking
                        </button>

                      </div>

                    ))}

                  </div>

                )}

              </div>


              {/* BOOKING HISTORY */}
              <div className="mt-12">

                <h3 className="font-monst text-lg font-bold uppercase">
                  Booking History
                </h3>

                {bookingHistory.length === 0 ? (

                  <p className="mt-4 text-gray-400">
                    No booking history yet.
                  </p>

                ) : (

                  <div className="mt-5 space-y-4">

                    {bookingHistory.map((booking) => (

                      <div
                        key={booking.id}
                        className="border border-gray-800 bg-[#0b0b18] p-6"
                      >

                        <h4 className="font-monst text-lg font-bold uppercase">
                          {booking.class_sessions?.classes?.name || "Class"}
                        </h4>

                        <p className="mt-4 text-sm text-gray-300">
                          Start: {booking.class_sessions?.starts_at
                            ? new Date(
                              booking.class_sessions.starts_at
                            ).toLocaleString()
                            : "Not available"}
                        </p>

                        <p className="mt-2 text-sm font-bold uppercase text-gray-400">
                          Status: {booking.status}
                        </p>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </>

          )}

        </div>


      </div>

    </main>

  )

}

export default MemberDashboard
