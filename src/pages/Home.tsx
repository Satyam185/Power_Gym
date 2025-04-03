import { ArrowRight, Clock, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Body,<br />Transform Your Life
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Join POWER GYM and start your fitness journey today. Get access to state-of-the-art equipment, expert trainers, and a supportive community.
          </p>
          <Link
            to="/exercises"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold bg-red-500 rounded-md hover:bg-red-600 transition-colors"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose POWER GYM?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We offer everything you need to achieve your fitness goals and maintain a healthy lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-800 p-8 rounded-lg text-center"
              whileHover={{ 
                rotateX: 10,
                rotateY: 10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <Clock className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Access</h3>
              <p className="text-gray-400">
                Work out on your schedule with round-the-clock access to our facilities.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-800 p-8 rounded-lg text-center"
              whileHover={{ 
                rotateX: 10,
                rotateY: 10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <Users className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Expert Trainers</h3>
              <p className="text-gray-400">
                Get personalized guidance from our certified fitness professionals.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-800 p-8 rounded-lg text-center"
              whileHover={{ 
                rotateX: 10,
                rotateY: 10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <Award className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Premium Equipment</h3>
              <p className="text-gray-400">
                Train with top-of-the-line equipment designed for optimal results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}