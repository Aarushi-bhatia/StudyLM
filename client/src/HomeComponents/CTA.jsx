import React from 'react'

const CTA = () => {
  return (
  <section className="h-screen flex items-center justify-center  text-white ">
    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <h2 className="text-4xl lg:text-5xl font-bold mb-6">
        Ready to <span className="gradient-text">Transform</span> Your Document
        Workflow?
      </h2>
      <p className="text-[#D6C7BA] text-xl mb-10 max-w-2xl mx-auto">
        Join thousands of professionals who have already revolutionized how they
        interact with documents
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#"
          className="inline-block text-lg bg-[#FF8163] text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition"
        >
          Start Free Trial
        </a>
        <a
          href="#features"
          className="inline-block text-lg border border-[#FF8163] text-[#FF8163] px-8 py-4 rounded-full font-medium hover:bg-[#FF8163] hover:text-white transition"
        >
          Learn More
        </a>
      </div>
    </div>
  </section>
  )
}

export default CTA