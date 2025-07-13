import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center py-10"
      style={{ backgroundImage: "url('/images/gymimage.jpg')" }}
    >
      {/* Black Overlay with Opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content Section */}
      <div className="relative z-10 max-w-4xl mx-auto p-6 text-white">
        <h2 className="text-3xl font-semibold text-center mb-4">About Us</h2>
        <p className="text-gray-300 text-lg text-center">
          Power Gym has been transforming lives for over a decade. We
          believe in empowering individuals to achieve their fitness goals
          through expert coaching, state-of-the-art equipment, and a supportive
          community.
        </p>

        <section className="mt-6">
          <h2 className="text-3xl font-semibold text-center mb-4">Our Achievements</h2>
          <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
            <li>🏆 Awarded Best Gym in the City - 2023</li>
            <li>💪 10,000+ Happy Members and Counting</li>
            <li>🏋️‍♂️ 50+ Certified Personal Trainers</li>
            <li>🔥 Hosted National-Level Fitness Competitions</li>
            <li>🥇 Transformed 500+ Lives with Weight Loss & Strength Programs</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-3xl font-semibold text-center mb-4">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Advanced Equipment</h3>
              <p className="text-gray-300">
                We provide world-class gym equipment to help you train efficiently.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Expert Coaches</h3>
              <p className="text-gray-300">
                Our certified trainers guide you with personalized fitness plans.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Flexible Memberships</h3>
              <p className="text-gray-300">
                We offer a variety of membership plans to suit your needs.
              </p>
            </div>
            <div className="bg-gray-800 bg-opacity-80 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Community & Support</h3>
              <p className="text-gray-300">
                Join a positive and motivating environment that pushes you to do better.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
