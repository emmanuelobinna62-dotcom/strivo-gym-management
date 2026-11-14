
import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Register() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    if (data.session) {
      setMessage("Account created successfully. You are signed in.")
    } else {
      setMessage("Account created. Check your email to confirm your account.")
    }
  }

  return (
    <main className="min-h-screen bg-[#05050f] px-6 py-20 text-white">
      <div className="mx-auto max-w-md">
        <Link
          to="/"
          className="font-monst text-sm font-bold uppercase text-red-500"
        >
          Strivo
        </Link>

        <h1 className="mt-10 font-monst text-3xl font-extrabold uppercase">
          Create Your Account
        </h1>

        <p className="mt-3 font-roboto text-gray-400">
          Join Strivo and start booking your training sessions.
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-red-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-red-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              className="w-full border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-red-500"
              placeholder="At least 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 px-5 py-3 font-monst text-sm font-bold uppercase transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {message && (
          <p className="mt-5 text-sm text-gray-300" role="status">
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:text-red-400">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
