import { MessageSquareCode } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
  <footer className="py-12 bg-white dark:bg-[#0F172A]">
    <div className="max-w-7xl mx-auto px-4 ">
          <div className="flex items-center gap-2 text-white mb-4 ">
            <MessageSquareCode className="w-6 h-6" />
            <div className="text-xl font-semibold text-black dark:text-white">StudyLM © 2025. All rights reserved.</div>

          </div>
    </div>
  </footer>
  )
}

export default Footer