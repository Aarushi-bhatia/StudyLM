import React from "react";
import { Star } from "lucide-react";

const Carousal = () => {
  const reviews = [
    {
      id: 1,
      text: "AskYourDoc has completely transformed how I handle research papers. Instead of spending hours reading, I can get instant answers to specific questions. It's like having a research assistant available 24/7!",
      name: "Sarah Kim",
      role: "PhD Student",
      initials: "SK",
    },
    {
      id: 2,
      text: "As a lawyer, I deal with hundreds of pages of legal documents daily. AskYourDoc helps me quickly find relevant clauses and understand complex contracts. It's incredibly accurate and saves me hours every week.",
      name: "Michael Johnson",
      role: "Corporate Lawyer",
      initials: "MJ",
    },
    {
      id: 3,
      text: "I use AskYourDoc for analyzing financial reports and technical manuals. The instant summaries are spot-on, and the ability to ask follow-up questions makes it feel like chatting with an expert analyst.",
      name: "Emily Liu",
      role: "Financial Analyst",
      initials: "EL",
    },
    {
      id: 4,
      text: "Perfect for students! I upload my textbooks and lecture notes, then ask questions to prepare for exams. It's like having a personal tutor who knows every detail of my course materials.",
      name: "Alex Rodriguez",
      role: "Computer Science Student",
      initials: "AR",
    },
    {
      id: 5,
      text: "Game-changer for medical research! I can quickly extract key findings from clinical studies and cross-reference multiple papers.",
      name: "Dr. Priya Patel",
      role: "Medical Researcher",
      initials: "PP",
    },
    {
      id: 6,
      text: "AskYourDoc has streamlined our contract review process significantly. We can now process vendor agreements 3x faster while maintaining accuracy.",
      name: "James Chen",
      role: "Legal Operations Manager",
      initials: "JC",
    },
  ];

  // Triple the reviews for seamless infinite scroll
  const extendedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Horizontal scrolling container */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#2C2025] via-transparent to-transparent z-10 pointer-events-none"></div>

          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#2C2025] via-transparent to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden">
            <div className="flex animate-scroll gap-6 hover:pause">
              {extendedReviews.map((review, index) => (
                <div
                  key={`${review.id}-${Math.floor(index / reviews.length)}`}
                  className="flex-shrink-0 w-80 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-gray-200 text-sm leading-relaxed mb-4 line-clamp-4">
                    "{review.text}"
                  </p>

                  {/* User info */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {review.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">
                        {review.name}
                      </h4>
                      <p className="text-gray-400 text-xs">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-320px * ${reviews.length}));
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .hover\\:pause:hover .animate-scroll {
          animation-play-state: paused;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Carousal;
