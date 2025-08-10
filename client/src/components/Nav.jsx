import { useState } from "react";
import { FileCheck, MessageSquareCode, Moon, Sun, X } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useDarkMode from "../hooks/useDarkMode";
import SunMoonToggle from "./SunMoonToggle";

const navlinks = [
  { navs: "/#home", name: "Home" },
  { navs: "/#features", name: "Features" },
  // { navs: "/#aboutus", name: "About Us" },
  // { navs: "/#faqs", name: "FAQs" },
  // { navs: "/#reviews", name: "Review" },
];

const Nav = ({ uploadedFile, handleResetDocument }) => {
  const { isDark, toggleDarkMode } = useDarkMode();
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
    <main className="top-0 sticky z-30 bg-none px-[3%] bg-background text-text">
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-white dark:bg-[#0F172A] bg-background text-text sticky top-0 z-50 rounded-2xl border border-none ">
        {/* left */}
        <div className="flex items-center gap-2 text-text text-black">
          <img
            src="/logo-black.png"
            alt="Logo"
            className="w-10 h-10 dark:hidden"
          />
          <img
            src="/logo-white.png"
            alt="Logo"
            className="w-10 h-10 hidden dark:block"
          />

          <div
            className="text-2xl font-bold text-black text-text cursor-pointer"
            onClick={() => navigate("/")}
          >
            StudyLM
          </div>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden  text-white z-30 text-2xl focus:outline-none"
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
              className={`flex-col rounded-lg md:flex md:flex-row md:justify-center gap-6 text-lg font-semibold text-white absolute md:static top-full left-0 w-full md:w-auto bg-[#2C2025] md:bg-transparent px-6 md:px-0 py-4 md:py-0 transition-all duration-300 ease-in ${
                isOpen ? "flex" : "hidden"
              }`}
            >
              {navlinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.navs}
                    className="block py-2 md:py-0 text-black dark:text-white hover:text-secondary transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="md:hidden">
                <a
                  href="/auth"
                  className="block px-6 py-1 text-lg border border-black/40 rounded-full text-white font-[550] bg-white hover:opacity-90 transition text-center"
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
          <div className="">
            <button
              onClick={toggleDarkMode}
              className="cursor-pointer flex items-center justify-center mx-4"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <Moon className="w-5 h-5 text-white drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]" />
              ) : (
                <Sun className="w-5 h-5 text-black drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]" />
              )}
              {/* <SunMoonToggle /> */}
            </button>
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
              className="px-6 py-1 text-lg border border-black/30 rounded-2xl text-black font-[550] bg-white hover:opacity-90 transition"
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
