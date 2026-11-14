
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

// Components
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

// Pages
import Home from "./pages/Home"
import About from "./pages/About"
import Classes from "./pages/Classes"
import Trainers from "./pages/Trainers"
import Schedule from "./pages/Schedule"
import Membership from "./pages/Membership"
import BMI from "./pages/BMI"
import Contact from "./pages/Contact"
import Booking from "./pages/Booking"
import TrainerProfile from "./pages/TrainerProfile"
import ClassDetails from "./pages/ClassDetails"
import Gallery from "./pages/Gallery"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ResetPassword from "./pages/ResetPassword"
import MemberDashboard from "./pages/MemberDashboard"
import AdminDashboard from "./pages/AdminDashboard"


// Layout
const AppLayout = () => {

  const location = useLocation()

  const hideNavbar =
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/member-dashboard"

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/trainers/:slug" element={<TrainerProfile />} />
        <Route path="/classes/strength-conditioning" element={<ClassDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/member-dashboard"
          element={
            <ProtectedRoute>
              <MemberDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}


// Main App
const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
