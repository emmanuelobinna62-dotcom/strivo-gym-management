import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

const ProtectedRoute = ({ children, requiredRole }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single()

        if (error) {
          console.log("Role error:", error.message)
        } else {
          setRole(profile.role)
        }
      }

      setUser(user)
      setLoading(false)
    }

    checkUser()
  }, [])

  if (loading) {
    return <p className="p-10 text-center">Checking account...</p>
  }

  if (!user) {
    const redirectPath = requiredRole === "admin"
      ? "/admin-dashboard"
      : "/member-dashboard"

    return <Navigate to={`/login?redirect=${redirectPath}`} replace />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/member-dashboard" replace />
  }

  return children
}

export default ProtectedRoute