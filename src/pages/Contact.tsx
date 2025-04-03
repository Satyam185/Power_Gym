import { useRef , useState} from 'react';
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const form = useRef<HTMLFormElement | null>(null);
  const [result, setResult] = useState<string>("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.current) return;

    setResult("Sending....");

    const formData = new FormData(form.current);
    formData.append("access_key", "fefdc499-7e6f-4ddc-9432-25faea292ec6");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        form.current.reset();
        toast.success("Form Submitted Successfully."); 
      } else {
        console.log("Error:", data);
        setResult(data.message);
        toast.error("Error: " + data.message);  
      }
    } catch (error) {
      console.log("Request failed:", error);
      setResult("Error: Could not send message.");
      toast.error("Error: Could not send message.");  
    }
  };

  return (
    <div className="pt-16 bg-gray-900">
      {/* Header */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-400 text-center max-w-2xl mx-auto">
            Get in touch with us for any questions or inquiries
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Send us a Message</h2>
            <form ref={form} className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  name="user_email"
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="user_subject"
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
              >
                Send Message
              </button>
            </form>
            <p className="mt-4 text-xl text-gray-400 text-center">{result}</p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-red-500 mr-4" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Location</h3>
                  <p className="text-gray-400">
                    Anand Nagar, Gwalior<br />
                    Madhya Pradesh, 474001
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-red-500 mr-4" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Phone</h3>
                  <p className="text-gray-400">9876543210</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-red-500 mr-4" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <p className="text-gray-400">powergym2356@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-red-500 mr-4" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Hours</h3>
                  <p className="text-gray-400">
                    Monday - Friday: 5:00 AM - 10:00 PM<br />
                    Saturday: 6:00 AM - 8:00 PM<br />
                    Sunday: 7:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 bg-gray-800 rounded-lg overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14314.705829568406!2d78.159824776166!3d26.239700307081876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1743418743227!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* ToastContainer should be placed here */}
      <ToastContainer />
    </div>
  );
}
