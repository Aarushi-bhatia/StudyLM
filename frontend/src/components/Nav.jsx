import { useState } from "react";
import { FileCheck, MessageSquareCode, X } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Auth from "../auth/Auth";
import { useEffect } from "react";

const navlinks = [
  { navs: "/#home", name: "Home" },
  { navs: "/#features", name: "Features" },
  { navs: "/#aboutus", name: "About Us" },
  { navs: "/#faqs", name: "FAQs" },
  { navs: "/#reviews", name: "Review" },
];

const Nav = ({ uploadedFile, handleResetDocument }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");
    if (token && name) {
      setUsername(name);
    } else {
      setUsername("");
    }
  }, [location]);

  const isChatRoute = location.pathname === "/chat";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    setUsername("");
    navigate("/");
  };

  return (
    <main className="top-0 sticky z-10 bg-none px-[3%] pt-6">
      <nav className="flex justify-between items-center px-6 md:px-12 py-3 bg-transparent sticky top-0 z-50 rounded-2xl border border-none shadow-[0_12px_24px_rgba(0,0,0,0.25)] backdrop-blur-md">
        {/* left */}
        <div className="flex items-center gap-2 text-white">
          {/* <img src="/logo.png" alt="" className="w-10 h-10" /> */}
          <MessageSquareCode />
          <div className="text-2xl font-bold text-[#FFFFF]">AskYourDoc</div>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {/* Hamburger icon */}
          <span>{isOpen ? <>&#x2715;</> : <>&#9776;</>}</span>
        </button>

        {/* Navigation Links */}
        {!isChatRoute && (
          <div className="absolute md:static inset-x-0 md:flex md:justify-center mx-auto">
            <ul
              className={`flex-col md:flex md:flex-row md:justify-center gap-6 text-lg font-semibold text-gray-300 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent px-6 md:px-0 py-4 md:py-0 transition-all duration-300 ease-in ${
                isOpen ? "flex" : "hidden"
              }`}
            >
              {navlinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.navs}
                    className="block py-2 md:py-0 hover:text-secondary transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="md:hidden">
                <a
                  href="/auth"
                  className="block px-6 py-1 text-lg border/10 border-gray-800 rounded-full text-gray-300 font-[550] bg-primary hover:opacity-90 transition shadow-[0_4px_12px_rgba(0,0,0,0.2)] text-center"
                >
                  Login / Signup
                </a>
              </li>
            </ul>
          </div>
        )}
        <div className="hidden md:flex items-center">
          <div className="max-w-4xl mx-auto flex align-right justify-between">
            {uploadedFile && (
              <div className="flex items-center mt-2 space-x-2 bg-green-500/20 px-3 py-2 rounded-lg border border-green-500/30">
                <FileCheck className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300 truncate max-w-32">
                  {uploadedFile.name}
                </span>
                <button
                  onClick={handleResetDocument}
                  className="text-green-300 hover:text-green-500 cursor-pointer"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          {username ? (
            <div className="flex items-center gap-4">
              <span className="px-6 py-1 text-lg font-semibold text-white/80">
                {username}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-2xl text-sm font-semibold text-white bg-red-500/10 border border-red-600/20 hover:bg-red-600/20 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="/auth"
              className="px-6 py-1 text-lg border/10 border-white rounded-full text-white font-[550] bg-[#FF8163] hover:opacity-90 transition shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            >
              Login / Signup
            </a>
          )}
        </div>
      </nav>
    </main>
  );
};

export default Nav;
