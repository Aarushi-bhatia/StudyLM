import { Check, Target } from 'lucide-react'
import React from 'react'

const AboutUs = () => {
  return (
    <>
      <section id="aboutus" className="min-h-screen flex items-center justify-center text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="gradient-text">About AskYourDoc</span>
            </h2>
            <p className="text-[#D6C7BA] text-lg sm:text-xl max-w-3xl mx-auto px-4">
              We're revolutionizing how people interact with documents through the
              power of AI
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Our Mission</h3>
              <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                At AskYourDoc, we believe that information should be accessible and
                understanding should be effortless. Our mission is to bridge the gap
                between complex documents and human comprehension using advanced AI
                technology.
              </p>
              <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                We understand that reading through lengthy documents can be
                time-consuming and overwhelming. That's why we created an
                intelligent assistant that can instantly answer your questions,
                provide summaries, and help you extract the most important
                information from any document.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-[#FF8163] w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-base sm:text-lg">Our Vision</h4>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Making knowledge accessible to everyone, everywhere
                  </p>
                </div>
              </div>
            </div>
            <div className="glassmorphism rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Why Choose Us?</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3">
                  <div className="bg-[#FF8163] w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Advanced AI Technology</h4>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      State-of-the-art language models for accurate understanding
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#FF8163] w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">User-Friendly Interface</h4>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Intuitive design that anyone can use effortlessly
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#FF8163] w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Privacy First</h4>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Your documents and data remain completely secure
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#FF8163] w-6 h-6 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg">Continuous Innovation</h4>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Regular updates and new features based on user feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUs