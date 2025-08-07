import React, { useState, useEffect } from "react";
import {
  MessageSquareCode,
} from "lucide-react";

const PDFWidget = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0.5);
  const [particlePositions, setParticlePositions] = useState([]);

  const mockMessages = [
    { type: "user", text: "Analyze this research paper", avatar: "👤" },
    {
      type: "bot",
      text: "Found 12 key insights about quantum computing...",
      avatar: "🤖",
    },
    { type: "user", text: " What about the methodology?", avatar: "👤" },
    {
      type: "bot",
      text: "The paper uses novel ML approaches for...",
      avatar: "🤖",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % mockMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glowInterval = setInterval(() => {
      setGlowIntensity((prev) => 0.3 + Math.sin(Date.now() * 0.003) * 0.4);
    }, 50);
    return () => clearInterval(glowInterval);
  }, []);

  useEffect(() => {
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setParticlePositions(particles);

    const animateParticles = () => {
      setParticlePositions((prev) =>
        prev.map((p) => ({
          ...p,
          x: (p.x + p.vx + 400) % 400,
          y: (p.y + p.vy + 300) % 300,
        }))
      );
    };

    const particleInterval = setInterval(animateParticles, 100);
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div className="relative transform hover:-translate-y-2 transition-all duration-700 ease-out">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {particlePositions.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-black rounded-full opacity-30"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              transform: `translateZ(0)`,
            }}
          />
        ))}
      </div>

      {/* Main Mac Window with Glass Effect */}
      <div className="relative w-[420px] bg-white backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Enhanced Mac Title Bar */}
        <div className="relative flex items-center justify-between px-6 py-3 bg-gray-900/40 via-slate-800/80 to-gray-900/80 border-b border-white/10 backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full ">
              <MessageSquareCode className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-semibold bg-purple-400 to-pink-400 bg-clip-text text-transparent">
                StudyLM
              </span>
            </div>
          </div>
        </div>

        {/* Content Area with Enhanced Design */}
        <div className="relative p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <h3 className="text-2xl font-bold bg-black bg-clip-text text-transparent">
                AI Study Assistant
              </h3>
            </div>
            <div className="flex items-center space-x-2"></div>
          </div>

          {/* Enhanced Chat Preview */}
          <div className="relative bg-white rounded-xl p-4 mb-6 h-60 overflow-hidden border border-white/10">
            <div className="space-y-3 h-full overflow-hidden">
              {mockMessages.slice(0, currentMessage + 1).map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 ${
                    msg.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  } animate-fade-in`}
                >
                  <div className="text-lg">{msg.avatar}</div>
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs font-medium ${
                      msg.type === "user"
                        ? "bg-[#7182FF] text-white shadow-lg "
                        : "bg-black/30 text-gray-100 shadow-lg"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {currentMessage < mockMessages.length - 1 && (
                <div className="flex items-start space-x-2">
                  <div className="text-lg">🤖</div>
                  <div className="bg- px-3 py-2 rounded-2xl border border-black/30">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></div>
                      <div
                        className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFWidget;