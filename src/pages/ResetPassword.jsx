


import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setMessage("")

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.")
      return
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage("Your password has been updated successfully.")
    setPassword("")
    setConfirmPassword("")
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
          Reset Password
        </h1>

        <p className="mt-3 font-roboto text-gray-400">
          Enter your new password below.
        </p>

        <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-red-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border border-gray-700 bg-transparent px-4 py-3 outline-none focus:border-red-500"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 px-5 py-3 font-monst text-sm font-bold uppercase transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {message && (
          <p className="mt-5 text-sm text-gray-300" role="status">
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-gray-400">
          <Link to="/login" className="text-red-500 hover:text-red-400">
            Return to Login
          </Link>
        </p>
      </div>
    </main>
  )
}
