import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const planPrices = {
  'Basic': 1000,
  'Premium': 2000,
  'Elite': 3000
};

export default function Join() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    plan: '',
    emergencyContact: '',
    emergencyPhone: '',
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentConfirmation = async () => {
    if (!transactionId.trim()) {
      setError('Please enter the transaction ID');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const paymentAmount = planPrices[formData.plan as keyof typeof planPrices];

      // Simulate payment verification
      // In reality, this would be an API call to your payment processor
      const isPaymentValid = true; // Replace with actual verification

      if (!isPaymentValid) {
        throw new Error('Payment verification failed. Please ensure you have sent the correct amount.');
      }
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        // Check for user already exists error
        if (authError.message === 'User already registered') {
          throw new Error('This email is already registered. Please log in or use a different email address.');
        }
        throw authError;
      }

      if (!authData.user) throw new Error('No user data returned');

      // 2. Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            emergency_contact: formData.emergencyContact,
            emergency_phone: formData.emergencyPhone,
            membership_plan: formData.plan,
          }
        ]);

      if (profileError) throw profileError;

      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          plan: formData.plan,
          phone: formData.phone,
          transactionId,
          amount: paymentAmount
        }),
      });

      setPaymentConfirmed(true);
      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 bg-gray-900 min-h-screen">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-white mb-4">Registration Successful!</h3>
            <p className="text-gray-300 mb-4">
              Congratulations! You have successfully purchased the {formData.plan} membership plan.
              You will be redirected to the homepage in a few seconds.
            </p>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full animate-[progress_3s_ease-in-out]"></div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && !paymentConfirmed && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 h-300 rounded-lg max-w-sm  mx-4">
            <h3 className="text-2xl font-bold text-white mb-4">Complete Payment</h3>

            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <p className="text-gray-300 mb-2">Selected Plan: <span className="text-white font-semibold">{formData.plan}</span></p>
              <p className="text-gray-300">Amount to Pay: <span className="text-white font-semibold">₹{planPrices[formData.plan as keyof typeof planPrices]}</span></p>
            </div>

            <p className="text-gray-300 mb-6">
              Please scan the QR code below to complete your payment. Make sure to send the exact amount shown above.
            </p>


            {/* QR Code placeholder - Replace src with actual QR code */}
            <div className="bg-white p-4 rounded-lg mb-6 flex justify-center">
              <img src="/images/QrCode.jpg" alt="" className="w-20 h-20"  />

            </div>

            <div className="mb-6">
              <label htmlFor="transactionId" className="block text-sm font-medium text-gray-400 mb-2">
                Transaction ID
              </label>
              <input
                type="text"
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter the transaction ID from your payment"
                className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            <button
              onClick={handlePaymentConfirmation}
              className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Payment'}
            </button>

            <p className="mt-4 text-sm text-gray-400 text-center">
              Please ensure you have sent the exact amount before confirming. Incorrect payments may result in delayed activation.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center">Complete Registration</h1>
          <p className="mt-4 text-xl text-gray-400 text-center max-w-2xl mx-auto">
            Fill in your details to get started
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= num ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
              >
                {num}
              </div>
              {num < 3 && (
                <div
                  className={`h-1 w-24 ${step > num ? 'bg-red-500' : 'bg-gray-700'
                    }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-gray-800 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-400 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                      minLength={6}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Membership Plan</h2>
                <div className="space-y-4">
                  {['Basic', 'Premium', 'Elite'].map((planOption) => (
                    <label
                      key={planOption}
                      className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${formData.plan === planOption
                          ? 'border-red-500 bg-gray-700'
                          : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                        }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={planOption}
                        checked={formData.plan === planOption}
                        onChange={handleInputChange}
                        className="sr-only"
                        required
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white font-medium">{planOption}</span>
                          <span className="ml-2 text-gray-400">₹{planPrices[planOption as keyof typeof planPrices]}/month</span>
                        </div>
                        {formData.plan === planOption && (
                          <ArrowRight className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Emergency Contact</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-400 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-400 mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                  disabled={loading}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Processing...' : step === 3 ? 'Proceed to Payment' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
