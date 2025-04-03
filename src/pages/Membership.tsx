import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const plans = [
  {
    name: 'Basic',
    price: 1000,
    features: [
      'Access to gym facilities',
      'Basic equipment usage',
      'Locker room access',
      'Free WiFi',
      'Water fountain access'
    ],
    recommended: false
  },
  {
    name: 'Premium',
    price: 2000,
    features: [
      'All Basic features',
      'Unlimited group classes',
      'Access to premium equipment',
      'Free towel service',
      'One personal training session/month',
      'Nutrition consultation',
      'Guest passes (2/month)'
    ],
    recommended: true
  },
  {
    name: 'Elite',
    price: 3000,
    features: [
      'All Premium features',
      'Unlimited personal training',
      'Priority class booking',
      'Exclusive member events',
      'Massage therapy sessions',
      'Private locker',
      'Unlimited guest passes'
    ],
    recommended: false
  }
];

export default function Membership() {
  const { user, profile } = useAuth();

  return (
    <div className="pt-16 bg-gray-900">
      {/* Header */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center">Membership Plans</h1>
          <p className="mt-4 text-xl text-gray-400 text-center max-w-2xl mx-auto">
            Choose the perfect plan for your fitness journey
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-gray-800 rounded-lg p-8 relative flex flex-col justify-between h-full ${
                plan.recommended ? 'ring-2 ring-red-500' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 -translate-y-1/2 px-4 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                  Recommended
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">₹{plan.price}</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              {user && profile ? (
                profile.membership_plan === plan.name ? (
                  <div className="block w-full py-3 px-4 rounded-md text-center font-semibold bg-green-500 text-white">
                    Active Plan
                  </div>
                ) : (
                  <Link
                    to="/join"
                    className="block w-full py-3 px-4 rounded-md text-center font-semibold bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                  >
                    Change Plan
                  </Link>
                )
              ) : (
                <Link
                  to="/join"
                  className={`block w-full py-3 px-4 rounded-md text-center font-semibold transition-colors ${
                    plan.recommended
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  Get Started
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}