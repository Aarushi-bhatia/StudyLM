import React from 'react'

const FAQ = () => {
  return (
  <section id="faqs" className="h-screen flex items-center justify-center text-white">
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="gradient-text">Frequently Asked Questions</span>
        </h2>
        <p className="text-[#D6C7BA] text-xl">
          Everything you need to know about AskYourDoc
        </p>
      </div>
      <div className="space-y-4">
        <div className="glassmorphism rounded-2xl p-6 faq-item">
          <button
            className="flex justify-between items-center w-full text-left faq-button"
            onclick="toggleFAQ(this)"
          >
            <h3 className="text-lg font-semibold">
              What types of documents can I upload?
            </h3>
            <i
              data-lucide="chevron-down"
              className="w-5 h-5 transition-transform faq-icon"
            />
          </button>
          <div className="faq-content mt-4 hidden">
            <p className="text-gray-300">
              Currently, we support PDF documents. We're working on adding
              support for more file types including Word documents, PowerPoint
              presentations, and text files in the near future.
            </p>
          </div>
        </div>
        <div className="glassmorphism rounded-2xl p-6 faq-item">
          <button
            className="flex justify-between items-center w-full text-left faq-button"
            onclick="toggleFAQ(this)"
          >
            <h3 className="text-lg font-semibold">
              Is my data secure and private?
            </h3>
            <i
              data-lucide="chevron-down"
              className="w-5 h-5 transition-transform faq-icon"
            />
          </button>
          <div className="faq-content mt-4 hidden">
            <p className="text-gray-300">
              Absolutely. We use enterprise-grade security measures to protect
              your documents. Your files are encrypted during transmission and
              storage, and we never share your data with third parties. You can
              delete your documents at any time.
            </p>
          </div>
        </div>
        <div className="glassmorphism rounded-2xl p-6 faq-item">
          <button
            className="flex justify-between items-center w-full text-left faq-button"
            onclick="toggleFAQ(this)"
          >
            <h3 className="text-lg font-semibold">
              How accurate are the AI responses?
            </h3>
            <i
              data-lucide="chevron-down"
              className="w-5 h-5 transition-transform faq-icon"
            />
          </button>
          <div className="faq-content mt-4 hidden">
            <p className="text-gray-300">
              Our AI uses advanced language models trained on vast amounts of
              text data, providing highly accurate responses. However, we always
              recommend verifying important information from the original
              document, as AI can occasionally make mistakes.
            </p>
          </div>
        </div>
        <div className="glassmorphism rounded-2xl p-6 faq-item">
          <button
            className="flex justify-between items-center w-full text-left faq-button"
            onclick="toggleFAQ(this)"
          >
            <h3 className="text-lg font-semibold">
              Is there a file size limit?
            </h3>
            <i
              data-lucide="chevron-down"
              className="w-5 h-5 transition-transform faq-icon"
            />
          </button>
          <div className="faq-content mt-4 hidden">
            <p className="text-gray-300">
              Yes, currently we support files up to 50MB in size. This covers
              most standard documents. If you need to upload larger files,
              please contact our support team for assistance with enterprise
              solutions.
            </p>
          </div>
        </div>
        <div className="glassmorphism rounded-2xl p-6 faq-item">
          <button
            className="flex justify-between items-center w-full text-left faq-button"
            onclick="toggleFAQ(this)"
          >
            <h3 className="text-lg font-semibold">
              Can I use AskYourDoc for free?
            </h3>
            <i
              data-lucide="chevron-down"
              className="w-5 h-5 transition-transform faq-icon"
            />
          </button>
          <div className="faq-content mt-4 hidden">
            <p className="text-gray-300">
              Yes! We offer a free tier that allows you to upload and chat with
              a limited number of documents per month. For unlimited access and
              additional features, we offer premium plans starting at
              $9.99/month.
            </p>
          </div>
        </div>
        <div className="glassmorphism rounded-2xl p-6 faq-item">
          <button
            className="flex justify-between items-center w-full text-left faq-button"
            onclick="toggleFAQ(this)"
          >
            <h3 className="text-lg font-semibold">How do I get started?</h3>
            <i
              data-lucide="chevron-down"
              className="w-5 h-5 transition-transform faq-icon"
            />
          </button>
          <div className="faq-content mt-4 hidden">
            <p className="text-gray-300">
              Getting started is simple! Just create a free account, upload your
              first PDF document, and start asking questions. Our AI will
              provide instant answers and document summaries to help you
              understand your content better.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default FAQ