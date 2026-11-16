
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/"

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    navigate(redirectTo)
  }


  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Please enter your email address first.")
      return
    }

    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://strivo-gym-management.vercel.app/reset-password",
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage("Password recovery email sent. Check your inbox.")
  }

  return (
    <main className="min-h-screen bg-[#05050f] px-6 py-24 text-white">
      <div className="mx-auto max-w-md">
        <Link
          to="/"
          className="font-monst text-sm font-bold uppercase text-red-500"
        >
          Strivo
        </Link>

        <h1 className="mt-10 font-monst text-3xl font-extrabold uppercase">
          Welcome Back
        </h1>

        <p className="mt-3 font-roboto text-gray-400">
          Sign in to manage your training sessions.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
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
              required
              className="w-full border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-red-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading}
              className="text-sm text-red-500 hover:text-red-400"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 px-5 py-3 font-monst text-sm font-bold uppercase transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {message && (
          <p className="mt-5 text-sm text-gray-300" role="status">
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-500 hover:text-red-400">
            Create one
          </Link>
        </p>
      </div>
    </main>
  )
}
