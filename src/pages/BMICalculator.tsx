import React, { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [bmi, setBmi] = useState<string>("");

  const calculateBMI = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!height || !weight || !gender) {
      toast.error("Please enter valid height, weight, and gender.");
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = (parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    console.log("BMI Value:", bmiValue);
    console.log("Parsed BMI:", parseFloat(bmiValue));

    if (parseFloat(bmiValue) < 18.5) {
      toast.warning("You are underweight. Consider seeking advice from a healthcare provider.");
    } else if (parseFloat(bmiValue) >= 18.5 && parseFloat(bmiValue) < 24.9) {
      toast.success("You have normal weight. Keep maintaining a healthy lifestyle.");
    } else if (parseFloat(bmiValue) >= 25 && parseFloat(bmiValue) < 29.9) {
      toast.warning("You are overweight. Consider seeking advice from a healthcare provider.");
    } else {
      toast.error("You are in the obese range. It is recommended to seek advice from a healthcare specialist.");
    }
  };
  

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat py-10 " 
      style={{ backgroundImage: "url('/images/Untitled design.jpg')"  }}>
      <h1 className="text-2xl font-bold mb-4 text-white">BMI CALCULATOR</h1>
      <div className="w-full max-w-3xl bg-black bg-opacity-50 shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center justify-center text-white">
          <form onSubmit={calculateBMI} className="w-full flex flex-col space-y-4">
            <div>
              <label className="block text-white font-medium">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
              />
            </div>
            <div>
              <label className="block text-white font-medium">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
              />
            </div>
            <div>
              <label className="block text-white font-medium">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition">
              Calculate BMI
            </button>
          </form>
        </div>
        {bmi && (
          <div className="mt-4 text-white text-lg text-center">
            <p>Your BMI: <strong>{bmi}</strong></p>
          </div>
        )}
        <div className="flex flex-col items-center justify-center mt-6">
          <img src="/images/bmiimage.jpg" alt="BMI Illustration" className="w-40 h-40 object-cover" />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default BMICalculator;
