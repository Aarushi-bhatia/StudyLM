import { Check, Target } from 'lucide-react'
import React from 'react'

const AboutUs = () => {
  return (
    <>
  <section id="aboutus" className="h-screen flex items-center justify-center text-white ">
    <div className="max-w-7xl mx-auto z-10 ">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="gradient-text">About AskYourDoc</span>
        </h2>
        <p className="text-[#D6C7BA] text-xl max-w-3xl mx-auto">
          We're revolutionizing how people interact with documents through the
          power of AI
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-semibold mb-6">Our Mission</h3>
          <p className="text-gray-300 text-lg mb-6">
            At AskYourDoc, we believe that information should be accessible and
            understanding should be effortless. Our mission is to bridge the gap
            between complex documents and human comprehension using advanced AI
            technology.
          </p>
          <p className="text-gray-300 text-lg mb-6">
            We understand that reading through lengthy documents can be
            time-consuming and overwhelming. That's why we created an
            intelligent assistant that can instantly answer your questions,
            provide summaries, and help you extract the most important
            information from any document.
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-[#FF8163] w-16 h-16 rounded-lg flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Our Vision</h4>
              <p className="text-gray-300">
                Making knowledge accessible to everyone, everywhere
              </p>
            </div>
          </div>
        </div>
        <div className="glassmorphism rounded-2xl p-8">
          <h3 className="text-2xl font-semibold mb-6">Why Choose Us?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#FF8163] w-6 h-6 rounded-full flex items-center justify-center mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Advanced AI Technology</h4>
                <p className="text-gray-300 text-sm">
                  State-of-the-art language models for accurate understanding
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-[#FF8163] w-6 h-6 rounded-full flex items-center justify-center mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">User-Friendly Interface</h4>
                <p className="text-gray-300 text-sm">
                  Intuitive design that anyone can use effortlessly
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-[#FF8163] w-6 h-6 rounded-full flex items-center justify-center mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Privacy First</h4>
                <p className="text-gray-300 text-sm">
                  Your documents and data remain completely secure
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-[#FF8163] w-6 h-6 rounded-full flex items-center justify-center mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">Continuous Innovation</h4>
                <p className="text-gray-300 text-sm">
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