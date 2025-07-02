import { Clock, MessageCircle, Search, Shield, Upload, Zap } from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
    
  <section id="features" className="h-screen max-w-7xl mx-auto  text-white ">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="gradient-text">Features</span>
        </h2>
        <p className="text-[#D6C7BA] text-xl max-w-3xl mx-auto">
          Transform how you interact with documents using cutting-edge AI
          technology
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="glassmorphism rounded-2xl p-8 card-hover">
          <div className="bg-[#FF8163] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Easy Upload</h3>
          <p className="text-gray-300">
            Simply drag and drop your PDF documents or click to browse and
            upload instantly.
          </p>
        </div>
        <div className="glassmorphism rounded-2xl p-8 card-hover">
          <div className="bg-[#FF8163] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4">AI Chat Interface</h3>
          <p className="text-gray-300">
            Ask questions in natural language and get intelligent responses
            about your documents.
          </p>
        </div>
        <div className="glassmorphism rounded-2xl p-8 card-hover">
          <div className="bg-[#FF8163] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Instant Analysis</h3>
          <p className="text-gray-300">
            Get immediate document summaries and key insights the moment you
            upload.
          </p>
        </div>
        <div className="glassmorphism rounded-2xl p-8 card-hover">
          <div className="bg-[#FF8163] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <Search className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Smart Search</h3>
          <p className="text-gray-300">
            Find specific information across your documents with intelligent
            semantic search.
          </p>
        </div>
        <div className="glassmorphism rounded-2xl p-8 card-hover">
          <div className="bg-[#FF8163] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Secure &amp; Private</h3>
          <p className="text-gray-300">
            Your documents are processed securely with enterprise-grade privacy
            protection.
          </p>
        </div>
        <div className="glassmorphism rounded-2xl p-8 card-hover">
          <div className="bg-[#FF8163] w-12 h-12 rounded-lg flex items-center justify-center mb-6">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4">24/7 Access</h3>
          <p className="text-gray-300">
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
 