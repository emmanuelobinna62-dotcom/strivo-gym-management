
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Logout error:", error.message)
      return
    }

    setIsMenuOpen(false)
    navigate("/login")
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#05050f]">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="/logo.svg"
            alt="Strivo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white">
          <Link to="/" className="hover:text-red-500">Home</Link>
          <Link to="/about" className="hover:text-red-500">About</Link>
          <Link to="/classes" className="hover:text-red-500">Classes</Link>
          <Link to="/trainers" className="hover:text-red-500">Trainers</Link>
          <Link to="/schedule" className="hover:text-red-500">Schedule</Link>
          <Link to="/membership" className="hover:text-red-500">Membership</Link>
          <Link to="/bmi" className="hover:text-red-500">BMI</Link>
          <Link to="/gallery" className="hover:text-red-500">Gallery</Link>
          <Link to="/contact" className="hover:text-red-500">Contact</Link>
        </div>

        {user ? (
          <button
            type="button"
            onClick={handleLogout}
            className="hidden lg:flex items-center gap-2 border border-red-500/60 bg-red-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 transition duration-300 hover:bg-red-500 hover:text-white"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="hidden lg:flex items-center gap-2 border border-red-500 bg-red-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition duration-300 hover:bg-transparent hover:text-red-500"
          >
            Login
          </Link>
        )}

        {/* Booking Button and Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            to="/booking"
            className="hidden md:block border border-white px-5 py-3 text-sm font-bold uppercase text-white hover:bg-red-500 hover:border-red-500"
          >
            Book a Class
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl lg:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

      </nav>

      {/* Mobile Navigation */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"
          } lg:hidden bg-[#05050f] border-t border-white/10 px-6 pb-6`}
      >
        <div className="flex flex-col gap-5 text-sm font-medium text-white">

          <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500">Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500">About</Link>
          <Link to="/classes" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500">Classes</Link>
          <Link to="/trainers" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500">Trainers</Link>
          <Link to="/schedule" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500">Schedule</Link>
          <Link to="/membership" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500">Membership</Link>
          <Link to="/bmi" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500">BMI Calculator</Link>
          <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500">Gallery</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500">Contact</Link>

          <Link
            to="/booking"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 border border-red-500 bg-red-500 px-5 py-3 text-center font-bold uppercase text-white hover:bg-transparent"
          >
            Book a Class
          </Link>

        </div>

        {user ? (
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm font-bold uppercase tracking-wider text-red-400 transition duration-300 hover:bg-red-500 hover:text-white"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        ) : (
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-red-500">
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
