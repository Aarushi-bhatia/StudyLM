import React from "react";
import Carousal from "./Carousal";

const Reviews = () => {
  return (
    <section
      id="reviews"
      className="h-screen flex items-center justify-center  text-white "
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div>
        <div className="text-center mb-6">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">What Our Users Say</span>
          </h2>
          <p className="text-[#D6C7BA] text-xl">
            Join thousands of satisfied users who have transformed their
            document workflow
          </p>
          </div>
          <Carousal />
        </div>
        {/* Stats Section */}
        {/* <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-3xl lg:text-4xl font-bold text-[#FF8163] mb-2">
            50K+
          </div>
          <div className="text-gray-300">Documents Processed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl lg:text-4xl font-bold text-[#FF8163] mb-2">
            10K+
          </div>
          <div className="text-gray-300">Happy Users</div>
        </div>
        <div className="text-center">
          <div className="text-3xl lg:text-4xl font-bold text-[#FF8163] mb-2">
            99.9%
          </div>
          <div className="text-gray-300">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-3xl lg:text-4xl font-bold text-[#FF8163] mb-2">
            4.9/5
          </div>
          <div className="text-gray-300">User Rating</div>
        </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default Reviews;
