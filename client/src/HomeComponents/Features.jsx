import { Clock, MessageCircle, Search, Shield, Upload, Zap } from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
    <section id="features" className="min-h-screen py-12 sm:py-16 lg:py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Features</span>
          </h2>
          <p className="text-[#D6C7BA] text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-4">
            Transform how you interact with documents using cutting-edge AI
            technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="glassmorphism rounded-2xl p-6 sm:p-8 card-hover">
            <div className="bg-[#FF8163] w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
              <Upload className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Easy Upload</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Simply drag and drop your PDF documents or click to browse and
              upload instantly.
            </p>
          </div>
          
          <div className="glassmorphism rounded-2xl p-6 sm:p-8 card-hover">
            <div className="bg-[#FF8163] w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">AI Chat Interface</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Ask questions in natural language and get intelligent responses
              about your documents.
            </p>
          </div>
          
          <div className="glassmorphism rounded-2xl p-6 sm:p-8 card-hover sm:col-span-2 lg:col-span-1">
            <div className="bg-[#FF8163] w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Instant Analysis</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Get immediate document summaries and key insights the moment you
              upload.
            </p>
          </div>
          
          <div className="glassmorphism rounded-2xl p-6 sm:p-8 card-hover">
            <div className="bg-[#FF8163] w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
              <Search className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Smart Search</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Find specific information across your documents with intelligent
              semantic search.
            </p>
          </div>
          
          <div className="glassmorphism rounded-2xl p-6 sm:p-8 card-hover">
            <div className="bg-[#FF8163] w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Secure & Private</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Your documents are processed securely with enterprise-grade privacy
              protection.
            </p>
          </div>
          
          <div className="glassmorphism rounded-2xl p-6 sm:p-8 card-hover sm:col-span-2 lg:col-span-1">
            <div className="bg-[#FF8163] w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">24/7 Access</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Access your document conversations anytime, anywhere, from any
              device.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features