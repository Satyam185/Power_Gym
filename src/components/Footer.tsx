import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">POWER GYM</h3>
            <p className="text-gray-400">
              Your journey to a stronger, healthier you starts here.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-red-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-red-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/classes" className="text-gray-400 hover:text-red-500 transition-colors">
                  Classes
                </Link>
              </li>
              <li>
                <Link to="/bmicalculator" className="text-gray-400 hover:text-red-500 transition-colors">
                  BMICalculator
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-gray-400 hover:text-red-500 transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-red-500 transition-colors">
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Friday: 5:00 AM - 10:00 PM</li>
              <li>Saturday: 6:00 AM - 8:00 PM</li>
              <li>Sunday: 7:00 AM - 6:00 PM</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 rounded-r-md hover:bg-red-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} POWER GYM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}