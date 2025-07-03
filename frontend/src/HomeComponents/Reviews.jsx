import React from "react";
import Carousal from "./Carousal";

const Reviews = () => {
  return (
    <section
      id="reviews"
      className="min-h-screen flex items-center justify-center text-white py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-xl  sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div>
          <div className="text-center mb-8 sm:mb-4 lg:mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
              <span className="gradient-text">What Our Users Say</span>
            </h2>
            <p className="text-[#D6C7BA] sm:text-xl lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
              Join thousands of satisfied users who have transformed their
              document workflow
            </p>
          </div>
          <div className="mx-8 sm:mx-0">
          <Carousal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;