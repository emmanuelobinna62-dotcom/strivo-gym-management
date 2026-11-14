

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const SupabaseTest = () => {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const getMessage = async () => {
      const { data, error } = await supabase
        .from("connection_test")
        .select("message")
        .limit(1)

      if (error) {
        setError(error.message)
      } else if (data.length > 0) {
        setMessage(data[0].message)
      } else {
        setMessage("No test message found.")
      }

      setLoading(false)
    }

    getMessage()
  }, [])

  return (
    <div className="min-h-screen bg-[#05050f] text-white flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Supabase Connection Test
        </h1>

        {loading && <p>Connecting to Supabase...</p>}

        {!loading && error && (
          <p className="text-red-500">Error: {error}</p>
        )}

        {!loading && !error && (
          <p className="text-green-500">{message}</p>
        )}
      </div>
    </div>
  )
}

export default SupabaseTest
