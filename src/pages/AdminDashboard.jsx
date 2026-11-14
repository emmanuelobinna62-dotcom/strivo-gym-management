
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const AdminDashboard = () => {

  // Navigation
  const [activeSection, setActiveSection] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Dashboard data
  const [totalMembers, setTotalMembers] = useState(0)
  const [activeMemberships, setActiveMemberships] = useState(0)
  const [pendingRequests, setPendingRequests] = useState(0)
  const [totalBookings, setTotalBookings] = useState(0)

  // Memberships
  const [membershipRequests, setMembershipRequests] = useState([])
  const [requestsLoading, setRequestsLoading] = useState(true)

  // Bookings
  const [bookings, setBookings] = useState([])
  const [bookingsLoading, setBookingsLoading] = useState(true)

  // Classes
  const [classes, setClasses] = useState([])
  const [classesLoading, setClassesLoading] = useState(true)

  const [className, setClassName] = useState("")
  const [classDescription, setClassDescription] = useState("")
  const [classDuration, setClassDuration] = useState("")
  const [classCapacity, setClassCapacity] = useState("")
  const [editingClass, setEditingClass] = useState(null)
  const [editClassName, setEditClassName] = useState("")
  const [editClassDescription, setEditClassDescription] = useState("")
  const [editClassDuration, setEditClassDuration] = useState("")
  const [editClassCapacity, setEditClassCapacity] = useState("")

  // General states
  const [loading, setLoading] = useState(true)
  const [processingRequest, setProcessingRequest] = useState(false)
  const [actionMessage, setActionMessage] = useState("")

  // Navigation items
  const navigation = [
    { id: "overview", label: "Overview", number: "01" },
    { id: "memberships", label: "Memberships", number: "02" },
    { id: "bookings", label: "Bookings", number: "03" },
    { id: "classes", label: "Classes", number: "04" },
    { id: "trainers", label: "Trainers", number: "05" },
  ]



  // Trainers
  const [trainers, setTrainers] = useState([])
  const [trainersLoading, setTrainersLoading] = useState(true)

  const [trainerName, setTrainerName] = useState("")
  const [trainerRole, setTrainerRole] = useState("")
  const [trainerBio, setTrainerBio] = useState("")
  const [trainerSpecialties, setTrainerSpecialties] = useState("")
  const [trainerImageFile, setTrainerImageFile] = useState(null)

  const [editingTrainer, setEditingTrainer] = useState(null)
  const [trainerSaving, setTrainerSaving] = useState(false)
  const [trainerDeleting, setTrainerDeleting] = useState(null)


  const handleNavigation = (section) => {
    setActiveSection(section)
    setSidebarOpen(false)
    setActionMessage("")
  }

  // Approve membership
  const handleApproveMembership = async (requestId) => {

    setProcessingRequest(true)
    setActionMessage("")

    const startDate = new Date()
    const endDate = new Date(startDate)

    endDate.setMonth(endDate.getMonth() + 1)

    const { data, error } = await supabase
      .from("memberships")
      .update({
        status: "active",
        payment_status: "paid",
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      })
      .eq("id", requestId)
      .select()
      .single()

    if (error) {

      console.log("Membership approval error:", error.message)
      setActionMessage("Could not approve membership. Please try again.")

    } else {

      setMembershipRequests((previousRequests) =>
        previousRequests.map((request) =>
          request.id === requestId
            ? {
              ...request,
              status: data.status,
              payment_status: data.payment_status,
            }
            : request
        )
      )

      setPendingRequests((previous) => Math.max(0, previous - 1))
      setActiveMemberships((previous) => previous + 1)

      setActionMessage("Payment confirmed. Membership activated successfully.")
    }

    setProcessingRequest(false)
  }

  // Reject membership
  const handleRejectMembership = async (requestId) => {

    const confirmed = window.confirm(
      "Are you sure you want to reject this membership request?"
    )

    if (!confirmed) return

    setProcessingRequest(true)
    setActionMessage("")

    const { error } = await supabase
      .from("memberships")
      .update({ status: "rejected" })
      .eq("id", requestId)

    if (error) {

      console.log("Membership rejection error:", error.message)
      setActionMessage("Could not reject membership request.")

    } else {

      setMembershipRequests((previousRequests) =>
        previousRequests.map((request) =>
          request.id === requestId
            ? { ...request, status: "rejected" }
            : request
        )
      )

      setPendingRequests((previous) => Math.max(0, previous - 1))

      setActionMessage("Membership request rejected successfully.")
    }

    setProcessingRequest(false)
  }

  // Cancel booking
  const handleCancelBooking = async (bookingId) => {

    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    )

    if (!confirmed) return

    setProcessingRequest(true)
    setActionMessage("")

    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", bookingId)

    if (error) {

      console.log("Booking cancellation error:", error.message)
      setActionMessage("Could not cancel booking. Please try again.")

    } else {

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      )

      setActionMessage("Booking cancelled successfully.")
    }

    setProcessingRequest(false)
  }

  const handleEditClass = async (e) => {
    e.preventDefault()

    if (!editClassName || !editClassDuration || !editClassCapacity) {
      setActionMessage("Please fill in all required fields.")
      return
    }

    const { data, error } = await supabase
      .from("classes")
      .update({
        name: editClassName,
        description: editClassDescription,
        duration_minutes: Number(editClassDuration),
        capacity: Number(editClassCapacity),
      })
      .eq("id", editingClass.id)
      .select()
      .single()

    if (error) {
      setActionMessage(error.message)
      return
    }

    setClasses((previousClasses) =>
      previousClasses.map((gymClass) =>
        gymClass.id === editingClass.id ? data : gymClass
      )
    )

    setEditingClass(null)
    setActionMessage("Class updated successfully.")
  }


  const handleDeleteClass = async (classId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this class?"
    )

    if (!confirmed) return

    const { error } = await supabase
      .from("classes")
      .delete()
      .eq("id", classId)

    if (error) {
      setActionMessage(error.message)
      return
    }

    setClasses((previousClasses) =>
      previousClasses.filter((gymClass) => gymClass.id !== classId)
    )

    setActionMessage("Class deleted successfully.")
  }

  // Create class
  const handleCreateClass = async (e) => {

    e.preventDefault()

    if (!className.trim() || !classDuration || !classCapacity) {
      setActionMessage("Please complete all required class fields.")
      return
    }

    if (Number(classDuration) <= 0 || Number(classCapacity) <= 0) {
      setActionMessage("Duration and capacity must be greater than zero.")
      return
    }

    setProcessingRequest(true)
    setActionMessage("")

    const { data, error } = await supabase
      .from("classes")
      .insert({
        name: className.trim(),
        description: classDescription.trim(),
        duration_minutes: Number(classDuration),
        capacity: Number(classCapacity),
      })
      .select()
      .single()

    if (error) {

      console.log("Class creation error:", error.message)
      setActionMessage("Could not create class. Please try again.")

    } else {

      setClasses((previousClasses) => [data, ...previousClasses])

      setClassName("")
      setClassDescription("")
      setClassDuration("")
      setClassCapacity("")

      setActionMessage("Class created successfully.")
    }

    setProcessingRequest(false)
  }

  // Fetch dashboard data
  useEffect(() => {

    const fetchDashboardStats = async () => {

      // Total members
      const { count: membersCount, error: membersError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "client")

      if (membersError) {
        console.log("Members error:", membersError.message)
      } else {
        setTotalMembers(membersCount || 0)
      }

      // Active memberships
      const { count: activeCount, error: activeError } = await supabase
        .from("memberships")
        .select("*", { count: "exact", head: true })
        .eq("status", "active")

      if (activeError) {
        console.log("Active memberships error:", activeError.message)
      } else {
        setActiveMemberships(activeCount || 0)
      }

      // Pending requests
      const { count: pendingCount, error: pendingError } = await supabase
        .from("memberships")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending")

      if (pendingError) {
        console.log("Pending requests error:", pendingError.message)
      } else {
        setPendingRequests(pendingCount || 0)
      }

      // Total bookings
      const { count: bookingsCount, error: bookingsError } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })

      if (bookingsError) {
        console.log("Bookings error:", bookingsError.message)
      } else {
        setTotalBookings(bookingsCount || 0)
      }

      // Membership requests
      const { data: requestsData, error: requestsError } = await supabase
        .from("memberships")
        .select(`
          id,
          status,
          payment_status,
          created_at,
          member:profiles (
            full_name,
            phone
          ),
          plan:membership_plans (
            name,
            price,
            billing_interval
          )
        `)
        .order("created_at", { ascending: false })

      if (requestsError) {
        console.log("Membership requests error:", requestsError.message)
      } else {
        setMembershipRequests(requestsData || [])
      }

      // Bookings
      const { data: bookingsData, error: bookingsFetchError } = await supabase
        .from("bookings")
        .select(`
          id,
          status,
          booked_at,
          member:profiles (
            full_name,
            phone
          ),
          session:class_sessions (
            starts_at,
            ends_at,
            class:classes (
              name
            ),
            trainer:trainers (
              name
            )
          )
        `)
        .order("booked_at", { ascending: false })

      if (bookingsFetchError) {
        console.log("Bookings fetch error:", bookingsFetchError.message)
      } else {
        setBookings(bookingsData || [])
      }

      // Classes
      const { data: classesData, error: classesError } = await supabase
        .from("classes")
        .select("*")
        .order("created_at", { ascending: false })

      if (classesError) {
        console.log("Classes fetch error:", classesError.message)
      } else {
        setClasses(classesData || [])
      }

      setClassesLoading(false)
      setBookingsLoading(false)
      setRequestsLoading(false)
      setLoading(false)
    }

    fetchDashboardStats()

  }, [])



  useEffect(() => {
    const fetchTrainers = async () => {
      setTrainersLoading(true)

      const { data, error } = await supabase
        .from("trainers")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        setActionMessage(error.message)
      } else {
        setTrainers(data || [])
      }

      setTrainersLoading(false)
    }

    fetchTrainers()
  }, [])


  // Loading screen
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05050f] text-white">
        <p className="font-monst text-lg font-bold uppercase">
          Loading Strivo...
        </p>
      </main>
    )
  }



  // Reset trainer form
  const resetTrainerForm = () => {
    setEditingTrainer(null)
    setTrainerName("")
    setTrainerRole("")
    setTrainerBio("")
    setTrainerSpecialties("")
    setTrainerImageFile(null)
  }

  // Upload trainer image
  const uploadTrainerImage = async () => {
    if (!trainerImageFile) {
      return editingTrainer?.image_url || ""
    }

    const filePath = `${Date.now()}-${trainerImageFile.name.replace(/\s+/g, "-")}`

    const { error } = await supabase.storage
      .from("trainer-images")
      .upload(filePath, trainerImageFile, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) {
      throw error
    }

    const { data } = supabase.storage
      .from("trainer-images")
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  // Create or update trainer
  const handleSaveTrainer = async (e) => {
    e.preventDefault()

    const wasEditing = Boolean(editingTrainer)

    if (!trainerName.trim() || !trainerRole.trim()) {
      setActionMessage("Please enter the trainer's name and role.")
      return
    }

    setTrainerSaving(true)
    setActionMessage("")

    try {
      const imageUrl = await uploadTrainerImage()

      const specialties = trainerSpecialties
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "")

      const trainerData = {
        name: trainerName.trim(),
        role: trainerRole.trim(),
        bio: trainerBio.trim(),
        specialties,
        image_url: imageUrl,
      }

      let error

      if (editingTrainer) {
        const result = await supabase
          .from("trainers")
          .update(trainerData)
          .eq("id", editingTrainer.id)

        error = result.error

        if (!error) {
          setTrainers((previous) =>
            previous.map((trainer) =>
              trainer.id === editingTrainer.id
                ? { ...trainer, ...trainerData }
                : trainer
            )
          )
        }
      } else {
        const result = await supabase
          .from("trainers")
          .insert(trainerData)
          .select()
          .single()

        error = result.error

        if (!error) {
          setTrainers((previous) => [result.data, ...previous])
        }
      }

      if (error) {
        throw error
      }

      resetTrainerForm()

      setActionMessage(
        wasEditing
          ? "Trainer updated successfully."
          : "Trainer added successfully."
      )

    } catch (error) {
      setActionMessage(error.message)
    }

    setTrainerSaving(false)
  }

  // Load trainer details into the form
  const handleEditTrainer = (trainer) => {
    setEditingTrainer(trainer)
    setTrainerName(trainer.name || "")
    setTrainerRole(trainer.role || "")
    setTrainerBio(trainer.bio || "")
    setTrainerSpecialties(
      Array.isArray(trainer.specialties)
        ? trainer.specialties.join(", ")
        : ""
    )
    setTrainerImageFile(null)
    setActionMessage("")
  }

  // Delete trainer
  const handleDeleteTrainer = async (trainer) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${trainer.name}?`
    )

    if (!confirmed) return

    setTrainerDeleting(trainer.id)
    setActionMessage("")

    const { error } = await supabase
      .from("trainers")
      .delete()
      .eq("id", trainer.id)

    if (error) {
      setActionMessage(
        "Could not delete this trainer. Check whether the trainer is assigned to a class or scheduled session. " +
        error.message
      )
      setTrainerDeleting(null)
      return
    }

    setTrainers((previous) =>
      previous.filter((item) => item.id !== trainer.id)
    )

    setClasses((previous) =>
      previous.map((gymClass) =>
        gymClass.trainer_id === trainer.id
          ? { ...gymClass, trainer_id: null }
          : gymClass
      )
    )

    if (editingTrainer?.id === trainer.id) {
      resetTrainerForm()
    }

    setActionMessage("Trainer deleted successfully.")
    setTrainerDeleting(null)
  }

  // Assign trainer to a class
  const handleAssignTrainer = async (classId, trainerId) => {
    const { data, error } = await supabase
      .from("classes")
      .update({
        trainer_id: trainerId || null,
      })
      .eq("id", classId)
      .select()
      .single()

    if (error) {
      setActionMessage(error.message)
      return
    }

    setClasses((previous) =>
      previous.map((gymClass) =>
        gymClass.id === classId ? data : gymClass
      )
    )

    setActionMessage("Trainer assignment updated successfully.")
  }


  return (

    <main className="min-h-screen bg-[#05050f] text-white">

      {/* Mobile Header */}
      <header className="fixed left-0 top-0 z-40 flex h-20 w-full items-center justify-between border-b border-gray-800 bg-[#080812] px-5 lg:hidden">

        <div>
          <h1 className="font-monst text-xl font-extrabold tracking-widest">
            STRIVO<span className="text-red-500">.</span>
          </h1>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Administration
          </p>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="border border-gray-700 px-4 py-2 text-xs font-bold uppercase tracking-wider transition hover:border-red-500"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? "Close" : "Menu"}
        </button>

      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-67.5 flex-col border-r border-gray-800 bg-[#080812] transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >

        {/* Brand */}
        <div className="border-b border-gray-800 px-7 py-8">

          <h1 className="font-monst text-2xl font-extrabold tracking-[0.15em]">
            STRIVO<span className="text-red-500">.</span>
          </h1>

          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
            Gym Management
          </p>

        </div>

        {/* Navigation */}
        <div className="px-5 pt-9">

          <p className="mb-5 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
            Management
          </p>

          <nav className="space-y-2">

            {navigation.map((item) => (

              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex w-full items-center gap-4 border-l-2 px-4 py-4 text-left transition ${activeSection === item.id
                  ? "border-red-500 bg-red-500/10 text-white"
                  : "border-transparent text-gray-500 hover:bg-white/3 hover:text-white"
                  }`}
              >

                <span className={`font-roboto text-[10px] ${activeSection === item.id
                  ? "text-red-500"
                  : "text-gray-600"
                  }`}>
                  {item.number}
                </span>

                <span className="font-roboto text-xs font-bold uppercase tracking-wider">
                  {item.label}
                </span>

                {item.id === "memberships" && pendingRequests > 0 && (
                  <span className="ml-auto bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
                    {pendingRequests}
                  </span>
                )}

              </button>

            ))}

          </nav>

        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto border-t border-gray-800 px-7 py-6">

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
            Strivo Management
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Administration Panel
          </p>

        </div>

      </aside>

      {/* Main Content */}
      <div className="min-h-screen pt-20 lg:ml-[270px] lg:pt-0">

        {/* Top Bar */}
        <div className="flex min-h-[76px] items-center justify-between border-b border-gray-800 px-6 md:px-10">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              Strivo / Management
            </p>

            <h2 className="mt-1 font-monst text-sm font-bold uppercase tracking-wider">
              {navigation.find((item) => item.id === activeSection)?.label}
            </h2>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="h-2 w-2 bg-green-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Admin Access
            </span>
          </div>

        </div>

        <div className="mx-auto max-w-[1500px] px-5 py-9 md:px-10 md:py-12">

          {/* Page Heading */}
          <div className="mb-9">

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-500">
              Strivo Control Centre
            </p>

            <h1 className="mt-3 font-monst text-2xl font-extrabold uppercase tracking-wide md:text-3xl">
              {activeSection === "overview" && "Dashboard Overview"}
              {activeSection === "memberships" && "Membership Management"}
              {activeSection === "bookings" && "Class Bookings"}
              {activeSection === "classes" && "Class Management"}
              {activeSection === "trainers" && "Trainer Management"}
            </h1>

            <p className="mt-2 max-w-xl text-sm text-gray-500">
              {activeSection === "overview" && "An overview of your gym's activity and performance."}
              {activeSection === "memberships" && "Review membership applications and manage member access."}
              {activeSection === "bookings" && "Monitor and manage class reservations."}
              {activeSection === "classes" && "Create and manage the classes available at your gym."}
              {activeSection === "trainers" && "Manage your coaching team and trainer profiles."}
            </p>

          </div>

          {/* Action Message */}
          {/* {actionMessage && (
            <div className="mb-7 border-l-2 border-red-500 bg-[#0b0b18] px-5 py-4">
              <p className="text-sm text-gray-300">
                {actionMessage}
              </p>
            </div>
          )} */}

          {/* OVERVIEW */}
          {activeSection === "overview" && (

            <>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <div className="border border-gray-800 bg-[#0b0b18] p-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Total Members
                  </p>
                  <h2 className="mt-5 font-monst text-4xl font-extrabold">
                    {totalMembers}
                  </h2>
                  <p className="mt-3 text-xs text-gray-600">
                    Registered clients
                  </p>
                </div>

                <div className="border border-gray-800 bg-[#0b0b18] p-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Active Memberships
                  </p>
                  <h2 className="mt-5 font-monst text-4xl font-extrabold text-green-500">
                    {activeMemberships}
                  </h2>
                  <p className="mt-3 text-xs text-gray-600">
                    Currently active
                  </p>
                </div>

                <div className="border border-gray-800 bg-[#0b0b18] p-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Pending Requests
                  </p>
                  <h2 className="mt-5 font-monst text-4xl font-extrabold text-yellow-500">
                    {pendingRequests}
                  </h2>
                  <p className="mt-3 text-xs text-gray-600">
                    Awaiting review
                  </p>
                </div>

                <div className="border border-gray-800 bg-[#0b0b18] p-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Total Bookings
                  </p>
                  <h2 className="mt-5 font-monst text-4xl font-extrabold">
                    {totalBookings}
                  </h2>
                  <p className="mt-3 text-xs text-gray-600">
                    All recorded bookings
                  </p>
                </div>

              </div>

              {/* Overview Activity */}
              <div className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-2">

                <div className="border border-gray-800 bg-[#0b0b18] p-6 md:p-8">

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Membership Activity
                  </p>

                  <h3 className="mt-3 font-monst text-xl font-bold uppercase">
                    Membership Requests
                  </h3>

                  <div className="mt-7 flex items-center justify-between border-t border-gray-800 pt-5">
                    <span className="text-sm text-gray-400">
                      Pending applications
                    </span>
                    <span className="font-monst text-2xl font-bold text-yellow-500">
                      {pendingRequests}
                    </span>
                  </div>

                  <button
                    onClick={() => handleNavigation("memberships")}
                    className="mt-7 border border-gray-700 px-5 py-3 text-[10px] font-bold uppercase tracking-wider transition hover:border-red-500 hover:bg-red-500"
                  >
                    Review Memberships
                  </button>

                </div>

                <div className="border border-gray-800 bg-[#0b0b18] p-6 md:p-8">

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Class Activity
                  </p>

                  <h3 className="mt-3 font-monst text-xl font-bold uppercase">
                    Booking Management
                  </h3>

                  <div className="mt-7 flex items-center justify-between border-t border-gray-800 pt-5">
                    <span className="text-sm text-gray-400">
                      Total bookings
                    </span>
                    <span className="font-monst text-2xl font-bold">
                      {totalBookings}
                    </span>
                  </div>

                  <button
                    onClick={() => handleNavigation("bookings")}
                    className="mt-7 border border-gray-700 px-5 py-3 text-[10px] font-bold uppercase tracking-wider transition hover:border-red-500 hover:bg-red-500"
                  >
                    View Bookings
                  </button>

                </div>

              </div>

            </>

          )}

          {/* MEMBERSHIPS */}
          {activeSection === "memberships" && (

            <div>

              {requestsLoading ? (

                <p className="py-10 font-monst text-sm font-bold uppercase text-gray-400">
                  Loading membership requests...
                </p>

              ) : membershipRequests.length === 0 ? (

                <div className="border border-gray-800 bg-[#0b0b18] p-8">
                  <p className="text-sm text-gray-400">
                    No membership requests found.
                  </p>
                </div>

              ) : (

                <div className="space-y-4">

                  {membershipRequests.map((request) => (

                    <div
                      key={request.id}
                      className="border border-gray-800 bg-[#0b0b18] p-6 md:p-8"
                    >

                      <div className="flex flex-wrap items-start justify-between gap-4">

                        <div>
                          <h3 className="font-monst text-lg font-bold uppercase">
                            {request.member?.full_name || "Member"}
                          </h3>

                          <p className="mt-2 text-sm text-gray-500">
                            {request.member?.phone || "No phone number provided"}
                          </p>
                        </div>

                        <span className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-wider ${request.status === "active"
                          ? "border-green-800 text-green-500"
                          : request.status === "rejected"
                            ? "border-red-800 text-red-500"
                            : "border-yellow-800 text-yellow-500"
                          }`}>
                          {request.status}
                        </span>

                      </div>

                      <div className="mt-7 grid grid-cols-1 gap-6 border-t border-gray-800 pt-6 sm:grid-cols-2 lg:grid-cols-4">

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                            Selected Plan
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            {request.plan?.name || "Plan unavailable"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                            Monthly Price
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            ${request.plan?.price}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                            Payment Status
                          </p>
                          <p className="mt-2 text-sm font-bold uppercase">
                            {request.payment_status}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                            Requested
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>

                      </div>

                      {request.status === "pending" && (

                        <div className="mt-7 flex flex-wrap gap-3 border-t border-gray-800 pt-6">

                          <button
                            onClick={() => handleApproveMembership(request.id)}
                            disabled={processingRequest}
                            className="bg-red-500 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-red-600 disabled:opacity-50"
                          >
                            {processingRequest ? "Processing..." : "Confirm Payment & Activate"}
                          </button>

                          <button
                            onClick={() => handleRejectMembership(request.id)}
                            disabled={processingRequest}
                            className="border border-gray-700 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 transition hover:border-red-500 hover:text-red-500 disabled:opacity-50"
                          >
                            Reject Request
                          </button>

                        </div>

                      )}

                    </div>

                  ))}

                </div>

              )}

            </div>

          )}

          {/* BOOKINGS */}
          {activeSection === "bookings" && (

            <div>

              {bookingsLoading ? (

                <p className="py-10 font-monst text-sm font-bold uppercase text-gray-400">
                  Loading bookings...
                </p>

              ) : bookings.length === 0 ? (

                <div className="border border-gray-800 bg-[#0b0b18] p-8">
                  <p className="text-sm text-gray-400">
                    No bookings found.
                  </p>
                </div>

              ) : (

                <div className="space-y-4">

                  {bookings.map((booking) => (

                    <div
                      key={booking.id}
                      className="border border-gray-800 bg-[#0b0b18] p-6 md:p-8"
                    >

                      <div className="flex flex-wrap items-start justify-between gap-4">

                        <div>
                          <h3 className="font-monst text-lg font-bold uppercase">
                            {booking.member?.full_name || "Member"}
                          </h3>

                          <p className="mt-2 text-sm text-gray-500">
                            {booking.member?.phone || "Not provided"}
                          </p>
                        </div>

                        <span className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-wider ${booking.status === "cancelled"
                          ? "border-red-800 text-red-500"
                          : "border-green-800 text-green-500"
                          }`}>
                          {booking.status}
                        </span>

                      </div>

                      <div className="mt-7 grid grid-cols-1 gap-6 border-t border-gray-800 pt-6 sm:grid-cols-2 lg:grid-cols-4">

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                            Class
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            {booking.session?.class?.name || "Class unavailable"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                            Trainer
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            {booking.session?.trainer?.name || "Not assigned"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                            Session Date
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            {booking.session?.starts_at
                              ? new Date(booking.session.starts_at).toLocaleString()
                              : "Not available"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                            Booked On
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            {new Date(booking.booked_at).toLocaleDateString()}
                          </p>
                        </div>

                      </div>

                      {booking.status !== "cancelled" && (

                        <div className="mt-7 border-t border-gray-800 pt-6">

                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={processingRequest}
                            className="bg-red-600 px-5 py-3 text-[10px] font-bold uppercase tracking-wider transition hover:bg-red-700 disabled:opacity-50"
                          >
                            {processingRequest ? "Processing..." : "Cancel Booking"}
                          </button>

                        </div>

                      )}

                    </div>

                  ))}

                </div>

              )}

            </div>

          )}

          {/* CLASSES */}
          {activeSection === "classes" && (

            <div>

              {/* Create Class */}
              <div className="border border-gray-800 bg-[#0b0b18] p-6 md:p-8">

                <div className="border-b border-gray-800 pb-6">

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">
                    Class Setup
                  </p>

                  <h3 className="mt-3 font-monst text-xl font-bold uppercase">
                    Add New Class
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Enter the details of the new gym class.
                  </p>

                </div>

                <form onSubmit={handleCreateClass} className="mt-7">

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div className="md:col-span-2">

                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Class Name
                      </label>

                      <input
                        type="text"
                        placeholder="e.g. Strength Training"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                        className="w-full border border-gray-700 bg-[#05050f] p-4 text-sm text-white outline-none transition focus:border-red-500"
                      />

                    </div>

                    <div className="md:col-span-2">

                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Description
                      </label>

                      <textarea
                        placeholder="Describe this class..."
                        value={classDescription}
                        onChange={(e) => setClassDescription(e.target.value)}
                        rows="4"
                        className="w-full border border-gray-700 bg-[#05050f] p-4 text-sm text-white outline-none transition focus:border-red-500"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Duration (Minutes)
                      </label>

                      <input
                        type="number"
                        placeholder="e.g. 45"
                        value={classDuration}
                        onChange={(e) => setClassDuration(e.target.value)}
                        min="1"
                        required
                        className="w-full border border-gray-700 bg-[#05050f] p-4 text-sm text-white outline-none transition focus:border-red-500"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Class Capacity
                      </label>

                      <input
                        type="number"
                        placeholder="e.g. 20"
                        value={classCapacity}
                        onChange={(e) => setClassCapacity(e.target.value)}
                        min="1"
                        required
                        className="w-full border border-gray-700 bg-[#05050f] p-4 text-sm text-white outline-none transition focus:border-red-500"
                      />

                    </div>

                  </div>

                  <div className="mt-7 border-t border-gray-800 pt-6">

                    <button
                      type="submit"
                      disabled={processingRequest}
                      className="w-full bg-red-500 px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      {processingRequest ? "Creating Class..." : "Create Class"}
                    </button>

                  </div>

                </form>

                {editingClass && (
                  <div className="mt-10 border border-red-500/30 bg-[#0b0b18] p-6">

                    <div className="mb-6 flex items-center justify-between gap-4">
                      <h3 className="font-monst text-xl font-bold uppercase">
                        Edit Class
                      </h3>

                      <button
                        type="button"
                        onClick={() => setEditingClass(null)}
                        className="text-xs font-bold uppercase text-gray-500 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleEditClass} className="grid grid-cols-1 gap-5 md:grid-cols-2">

                      <input
                        type="text"
                        value={editClassName}
                        onChange={(e) => setEditClassName(e.target.value)}
                        placeholder="Class Name"
                        className="border border-gray-800 bg-[#05050f] p-4 text-sm text-white outline-none focus:border-red-500"
                        required
                      />

                      <input
                        type="number"
                        value={editClassDuration}
                        onChange={(e) => setEditClassDuration(e.target.value)}
                        placeholder="Duration (minutes)"
                        className="border border-gray-800 bg-[#05050f] p-4 text-sm text-white outline-none focus:border-red-500"
                        required
                      />

                      <input
                        type="number"
                        value={editClassCapacity}
                        onChange={(e) => setEditClassCapacity(e.target.value)}
                        placeholder="Class Capacity"
                        className="border border-gray-800 bg-[#05050f] p-4 text-sm text-white outline-none focus:border-red-500"
                        required
                      />

                      <textarea
                        value={editClassDescription}
                        onChange={(e) => setEditClassDescription(e.target.value)}
                        placeholder="Class Description"
                        rows="4"
                        className="border border-gray-800 bg-[#05050f] p-4 text-sm text-white outline-none focus:border-red-500 md:col-span-2"
                      />

                      <button
                        type="submit"
                        className="bg-red-600 px-6 py-4 text-xs font-bold uppercase tracking-wider transition hover:bg-red-700 md:col-span-2"
                      >
                        Save Changes
                      </button>

                    </form>

                  </div>
                )}

              </div>

              {/* Existing Classes */}
              <div className="mt-12">

                <div className="mb-6 flex flex-wrap items-end justify-between gap-3">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">
                      Class Directory
                    </p>

                    <h3 className="mt-2 font-monst text-xl font-bold uppercase">
                      Existing Classes
                    </h3>
                  </div>

                  <p className="text-xs text-gray-500">
                    {classes.length} classes
                  </p>

                </div>

                {classesLoading ? (

                  <p className="py-8 text-sm text-gray-400">
                    Loading classes...
                  </p>

                ) : classes.length === 0 ? (

                  <div className="border border-gray-800 bg-[#0b0b18] p-8">
                    <p className="text-sm text-gray-400">
                      No classes found. Create your first class above.
                    </p>
                  </div>

                ) : (

                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

                    {classes.map((gymClass) => (

                      <div
                        key={gymClass.id}
                        className="border border-gray-800 bg-[#0b0b18] p-6"
                      >

                        <div className="flex items-start justify-between gap-4">

                          <h4 className="font-monst text-lg font-bold uppercase">
                            {gymClass.name}
                          </h4>

                          <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                            Class
                          </span>

                        </div>

                        <p className="mt-4 text-sm leading-6 text-gray-500">
                          {gymClass.description || "No description available."}
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-800 pt-5">

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                              Duration
                            </p>
                            <p className="mt-2 text-sm font-bold">
                              {gymClass.duration_minutes} minutes
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                              Capacity
                            </p>
                            <p className="mt-2 text-sm font-bold">
                              {gymClass.capacity} members
                            </p>
                          </div>

                        </div>

                        <div className="mt-6 flex gap-3">

                          <button
                            onClick={() => {
                              setEditingClass(gymClass)
                              setEditClassName(gymClass.name)
                              setEditClassDescription(gymClass.description || "")
                              setEditClassDuration(gymClass.duration_minutes)
                              setEditClassCapacity(gymClass.capacity)
                              setActionMessage("")
                            }}
                            className="border border-gray-700 px-5 py-2 text-xs font-bold uppercase tracking-wider transition hover:border-red-500 hover:text-red-500"
                          >
                            Edit Class
                          </button>

                          <button
                            onClick={() => handleDeleteClass(gymClass.id)}
                            className="border border-red-500/40 px-5 py-2 text-xs font-bold uppercase tracking-wider text-red-500 transition hover:bg-red-500 hover:text-white"
                          >
                            Delete Class
                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </div>

          )}


          {/* TRAINER MANAGEMENT */}
          {activeSection === "trainers" && (

            <div className="space-y-12">

              {/* PAGE HEADER */}
              <div className="flex flex-col justify-between gap-6 border-b border-gray-800 pb-8 md:flex-row md:items-end">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                    Management / Team
                  </p>

                  <h2 className="mt-3 font-monst text-3xl font-bold uppercase tracking-tight md:text-4xl">
                    Trainer Management
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                    Manage your coaching team, trainer profiles and class assignments.
                  </p>
                </div>

                <div className="flex items-center gap-4 border border-gray-800 bg-[#0b0b18] px-5 py-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Total Trainers
                    </p>
                    <p className="mt-1 font-monst text-2xl font-bold">
                      {trainers.length.toString().padStart(2, "0")}
                    </p>
                  </div>
                </div>

              </div>


              {/* ACTION MESSAGE */}
              {actionMessage && (
                <div className="border border-gray-800 bg-[#0b0b18] p-4 text-sm text-gray-300">
                  {actionMessage}
                </div>
              )}


              {/* ADD / EDIT TRAINER FORM */}
              <div className="border border-gray-800 bg-[#0b0b18] p-6 md:p-8">

                <div className="mb-8 flex items-center justify-between gap-4">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                      Team Management
                    </p>

                    <h3 className="mt-2 font-monst text-xl font-bold uppercase">
                      {editingTrainer ? "Edit Trainer" : "Add New Trainer"}
                    </h3>
                  </div>

                  {editingTrainer && (
                    <button
                      type="button"
                      onClick={resetTrainerForm}
                      className="text-xs font-bold uppercase tracking-wider text-gray-500 transition hover:text-white"
                    >
                      Cancel Edit
                    </button>
                  )}

                </div>


                <form onSubmit={handleSaveTrainer} className="space-y-6">

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {/* TRAINER NAME */}
                    <div>
                      <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        Trainer Name *
                      </label>

                      <input
                        type="text"
                        value={trainerName}
                        onChange={(e) => setTrainerName(e.target.value)}
                        placeholder="e.g. Marcus Reed"
                        required
                        className="w-full border border-gray-800 bg-[#05050f] px-4 py-4 text-sm text-white outline-none transition focus:border-red-500"
                      />
                    </div>


                    {/* TRAINER ROLE */}
                    <div>
                      <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        Professional Role *
                      </label>

                      <input
                        type="text"
                        value={trainerRole}
                        onChange={(e) => setTrainerRole(e.target.value)}
                        placeholder="e.g. Head Strength Coach"
                        required
                        className="w-full border border-gray-800 bg-[#05050f] px-4 py-4 text-sm text-white outline-none transition focus:border-red-500"
                      />
                    </div>


                    {/* SPECIALTIES */}
                    <div className="md:col-span-2">

                      <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        Specialties
                      </label>

                      <input
                        type="text"
                        value={trainerSpecialties}
                        onChange={(e) => setTrainerSpecialties(e.target.value)}
                        placeholder="Strength Training, HIIT, Conditioning"
                        className="w-full border border-gray-800 bg-[#05050f] px-4 py-4 text-sm text-white outline-none transition focus:border-red-500"
                      />

                      <p className="mt-2 text-xs text-gray-600">
                        Separate each specialty with a comma.
                      </p>

                    </div>


                    {/* BIO */}
                    <div className="md:col-span-2">

                      <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        Trainer Biography
                      </label>

                      <textarea
                        value={trainerBio}
                        onChange={(e) => setTrainerBio(e.target.value)}
                        rows="5"
                        placeholder="Write a professional introduction about this trainer..."
                        className="w-full resize-y border border-gray-800 bg-[#05050f] px-4 py-4 text-sm leading-6 text-white outline-none transition focus:border-red-500"
                      />

                    </div>


                    {/* PROFILE IMAGE */}
                    <div className="md:col-span-2">

                      <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        Trainer Profile Image
                      </label>

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0]

                          if (file && file.size > 5 * 1024 * 1024) {
                            setActionMessage("Image must be 5MB or smaller.")
                            e.target.value = ""
                            setTrainerImageFile(null)
                            return
                          }

                          setActionMessage("")
                          setTrainerImageFile(file || null)
                        }}
                        className="w-full border border-gray-800 bg-[#05050f] p-4 text-xs text-gray-400 file:mr-4 file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:text-white"
                      />

                      <p className="mt-2 text-xs text-gray-600">
                        JPG, PNG or WebP. Maximum file size: 5MB.
                        {editingTrainer && !trainerImageFile && " Leave empty to keep the current image."}
                      </p>

                    </div>

                  </div>


                  {/* SUBMIT */}
                  <div className="flex flex-col gap-4 border-t border-gray-800 pt-6 sm:flex-row">

                    <button
                      type="submit"
                      disabled={trainerSaving}
                      className="bg-red-600 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {trainerSaving
                        ? "Saving Trainer..."
                        : editingTrainer
                          ? "Save Changes"
                          : "Add Trainer"}
                    </button>

                    {editingTrainer && (
                      <button
                        type="button"
                        onClick={resetTrainerForm}
                        className="border border-gray-700 px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 transition hover:border-white hover:text-white"
                      >
                        Cancel
                      </button>
                    )}

                  </div>

                </form>

              </div>


              {/* TRAINER DIRECTORY */}
              <div>

                <div className="mb-6 flex items-end justify-between gap-4">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                      Our People
                    </p>

                    <h3 className="mt-2 font-monst text-xl font-bold uppercase">
                      Coaching Team
                    </h3>
                  </div>

                  <p className="text-xs text-gray-600">
                    {trainers.length} trainers
                  </p>

                </div>


                {trainersLoading ? (

                  <div className="border border-gray-800 bg-[#0b0b18] p-12 text-center">
                    <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-gray-700 border-t-red-500"></div>

                    <p className="mt-5 text-xs font-bold uppercase tracking-widest text-gray-500">
                      Loading Trainers...
                    </p>
                  </div>

                ) : trainers.length === 0 ? (

                  <div className="border border-gray-800 bg-[#0b0b18] px-6 py-16 text-center">

                    <h4 className="font-monst text-lg font-bold uppercase">
                      No Trainers Yet
                    </h4>

                    <p className="mt-3 text-sm text-gray-500">
                      Add your first trainer using the form above.
                    </p>

                  </div>

                ) : (

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {trainers.map((trainer) => (

                      <div
                        key={trainer.id}
                        className="group overflow-hidden border border-gray-800 bg-[#0b0b18] transition hover:border-gray-600"
                      >

                        {/* TRAINER IMAGE */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#11111e]">

                          {trainer.image_url ? (

                            <img
                              src={trainer.image_url}
                              alt={trainer.name}
                              className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                            />

                          ) : (

                            <div className="flex h-full w-full items-center justify-center">
                              <span className="font-monst text-5xl font-bold text-gray-700">
                                {trainer.name?.charAt(0)?.toUpperCase()}
                              </span>
                            </div>

                          )}

                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-5 pt-12">

                            <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                              STRIVO / COACHING TEAM
                            </p>

                            <h4 className="mt-2 font-monst text-xl font-bold uppercase text-white">
                              {trainer.name}
                            </h4>

                          </div>

                        </div>


                        {/* TRAINER DETAILS */}
                        <div className="p-6">

                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                            {trainer.role}
                          </p>

                          <p className="mt-4 line-clamp-4 min-h-[96px] text-sm leading-6 text-gray-500">
                            {trainer.bio || "No biography available."}
                          </p>


                          {/* SPECIALTIES */}
                          <div className="mt-5 border-t border-gray-800 pt-5">

                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
                              Specialties
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">

                              {Array.isArray(trainer.specialties) &&
                                trainer.specialties.length > 0 ? (

                                trainer.specialties.map((specialty, index) => (

                                  <span
                                    key={index}
                                    className="border border-gray-800 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400"
                                  >
                                    {specialty}
                                  </span>

                                ))

                              ) : (

                                <span className="text-xs text-gray-600">
                                  No specialties added.
                                </span>

                              )}

                            </div>

                          </div>


                          {/* ACTIONS */}
                          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-800 pt-5">

                            <button
                              type="button"
                              onClick={() => handleEditTrainer(trainer)}
                              className="border border-gray-700 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition hover:border-red-500 hover:text-red-500"
                            >
                              Edit Trainer
                            </button>

                            <button
                              type="button"
                              disabled={trainerDeleting === trainer.id}
                              onClick={() => handleDeleteTrainer(trainer)}
                              className="border border-red-500/30 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                            >
                              {trainerDeleting === trainer.id
                                ? "Deleting..."
                                : "Delete"}
                            </button>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>


              {/* CLASS ASSIGNMENTS */}
              <div>

                <div className="mb-6">

                  <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                    Coaching Allocation
                  </p>

                  <h3 className="mt-2 font-monst text-xl font-bold uppercase">
                    Class Assignments
                  </h3>

                  <p className="mt-3 text-sm text-gray-500">
                    Assign a lead trainer to each class.
                  </p>

                </div>


                {classesLoading ? (

                  <div className="border border-gray-800 bg-[#0b0b18] p-8 text-center text-xs font-bold uppercase tracking-widest text-gray-500">
                    Loading Classes...
                  </div>

                ) : classes.length === 0 ? (

                  <div className="border border-gray-800 bg-[#0b0b18] p-8 text-center text-sm text-gray-500">
                    No classes available for assignment.
                  </div>

                ) : (

                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

                    {classes.map((gymClass) => (

                      <div
                        key={gymClass.id}
                        className="flex flex-col justify-between gap-5 border border-gray-800 bg-[#0b0b18] p-6 sm:flex-row sm:items-center"
                      >

                        <div>

                          <h4 className="font-monst text-base font-bold uppercase">
                            {gymClass.name}
                          </h4>

                          <p className="mt-2 text-xs text-gray-600">
                            {gymClass.duration_minutes} minutes / {gymClass.capacity} members
                          </p>

                        </div>


                        <div className="w-full sm:max-w-[230px]">

                          <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-600">
                            Assigned Trainer
                          </label>

                          <select
                            value={gymClass.trainer_id || ""}
                            onChange={(e) =>
                              handleAssignTrainer(gymClass.id, e.target.value)
                            }
                            className="w-full border border-gray-800 bg-[#05050f] px-4 py-3 text-xs text-white outline-none focus:border-red-500"
                          >

                            <option value="">
                              Unassigned
                            </option>

                            {trainers.map((trainer) => (

                              <option key={trainer.id} value={trainer.id}>
                                {trainer.name}
                              </option>

                            ))}

                          </select>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </div>

          )}


          {/* Footer */}
          <footer className="mt-16 border-t border-gray-800 pt-6">

            <div className="flex flex-col justify-between gap-3 sm:flex-row">

              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                STRIVO / ADMINISTRATION
              </p>

              <p className="text-[10px] uppercase tracking-wider text-gray-600">
                Gym Management System
              </p>

            </div>

          </footer>

        </div>

      </div>

    </main>

  )

}

export default AdminDashboard
