import { Clock, MessageCircle, Search, Shield, Upload, Zap } from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
    <section id="features" className="min-h-screen py-12 sm:py-16 lg:py-20 text-white bg-white dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 sm:mb-6">
            <span className="text-black dark:text-white">How to use StudyLM?</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="glassmorphism rounded-2xl p-6 sm:p-8 card-hover">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
              <Upload className="w-6 h-6 sm:w-7 sm:h-7 text-[#7182FF] font-bold" />
            </div>
            <h3 className="text-lg sm:text-xl text-black dark:text-white font-semibold mb-3 sm:mb-4">Easy Upload</h3>
            <p className="text-black/40 dark:text-white/40 text-sm sm:text-base leading-relaxed">
              Simply drag and drop your PDF documents or click to browse and
              upload instantly.
            </p>
          </div>
          
          <div className="glassmorphism rounded-2xl p-6 sm:p-8 card-hover">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#7182FF]" />
            </div>
            <h3 className="text-lg sm:text-xl text-black dark:text-white font-semibold mb-3 sm:mb-4">AI Chat Interface</h3>
            <p className="text-black/40 dark:text-white/30 text-sm sm:text-base leading-relaxed">
              Ask questions in natural language and get intelligent responses
              about your documents.
            </p>
          </div>
          
          <div className="glassmorphism rounded-2xl p-6 sm:p-8 card-hover sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-[#7182FF]" />
            </div>
            <h3 className="text-lg sm:text-xl text-black dark:text-white font-semibold mb-3 sm:mb-4">Instant Analysis</h3>
            <p className="text-black/40 dark:text-white/40 text-sm sm:text-base leading-relaxed">
              Get immediate document summaries and key insights the moment you
              upload.
            </p>
          </div>
          
         </div>
      </div>
    </section>
  )
}

export default Features