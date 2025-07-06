import { MessageSquareCode } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
  <footer className="bg-black/20 py-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white mb-4">
            <MessageSquareCode className="w-6 h-6" />
            <div className="text-2xl font-bold">AskYourDoc</div>
          </div>
          <p className="text-gray-300 mb-4">
            Revolutionizing document interaction with AI-powered chat
            technology.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-300 hover:text-[#FF8163] transition"
            >
              <i data-lucide="twitter" className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[#FF8163] transition"
            >
              <i data-lucide="linkedin" className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[#FF8163] transition"
            >
              <i data-lucide="github" className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#features"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                API
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                Integrations
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#aboutus"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                Press
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#faqs"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-[#FF8163] transition"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p className="text-gray-300">
          © 2025 AskYourDoc. All rights reserved. Built with ❤️ for document
          enthusiasts.
        </p>
      </div>
    </div>
  </footer>
  )
}

export default Footer