

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faFacebookF,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
  return (
    <footer className="bg-[#05050f] text-white">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <Link to="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Strivo"
                className="h-12 w-auto"
              />
            </Link>


            <p className="font-roboto mt-5 max-w-sm leading-relaxed text-gray-400">
              A modern fitness community built around expert coaching,
              purposeful training and a stronger way of living.
            </p>

            <div className="mt-6 flex gap-3">

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-gray-700 text-gray-400 transition duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center border border-gray-700 text-gray-400 transition duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center border border-gray-700 text-gray-400 transition duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>

            </div>

          </div>


          {/* Quick Links */}

          <div>

            <h3 className="font-monst text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <div className="font-roboto mt-6 space-y-3">

              <Link
                to="/about"
                className="block text-gray-400 transition duration-300 hover:text-red-500"
              >
                About Us
              </Link>

              <Link
                to="/classes"
                className="block text-gray-400 transition duration-300 hover:text-red-500"
              >
                Classes
              </Link>

              <Link
                to="/trainers"
                className="block text-gray-400 transition duration-300 hover:text-red-500"
              >
                Trainers
              </Link>

              <Link
                to="/schedule"
                className="block text-gray-400 transition duration-300 hover:text-red-500"
              >
                Schedule
              </Link>

              <Link
                to="/membership"
                className="block text-gray-400 transition duration-300 hover:text-red-500"
              >
                Membership
              </Link>

            </div>

          </div>


          {/* Training */}

          <div>

            <h3 className="font-monst text-sm font-bold uppercase tracking-wider text-white">
              Training
            </h3>

            <div className="font-roboto mt-6 space-y-3">

              <Link
                to="/bmi"
                className="block text-gray-400 transition duration-300 hover:text-red-500"
              >
                BMI Calculator
              </Link>

              <Link
                to="/gallery"
                className="block text-gray-400 transition duration-300 hover:text-red-500"
              >
                Gallery
              </Link>

              <Link
                to="/booking"
                className="block text-gray-400 transition duration-300 hover:text-red-500"
              >
                Book A Class
              </Link>

              <Link
                to="/contact"
                className="block text-gray-400 transition duration-300 hover:text-red-500"
              >
                Contact Us
              </Link>

            </div>

          </div>


          {/* Contact */}

          <div>

            <h3 className="font-monst text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h3>

            <div className="font-roboto mt-6 space-y-4 text-gray-400">

              <p>
                125 King Street West
                <br />
                Toronto, ON
              </p>

              <p>
                +1 (416) 555-0198
              </p>

              <p>
                hello@strivo.com
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* Bottom bar */}

      <div className="border-t border-gray-800">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 md:flex-row md:items-center md:justify-between">

          <p className="font-roboto text-sm text-gray-500">
            © {new Date().getFullYear()} STRIVO. All rights reserved.
          </p>

          <div className="font-roboto flex gap-6 text-sm text-gray-500">

            <a
              href="#"
              className="transition duration-300 hover:text-red-500"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition duration-300 hover:text-red-500"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer