import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Nav from "../components/Nav";

const Auth = () => {
  const navigate = useNavigate();

  const backend_IP = import.meta.env.VITE_BACKEND_IP;

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    setMessage("");

    if (!email || !password || (!isLogin && !name)) {
      setMessage("Please fill in all required fields.");
      return;
    }

    if (!isLogin && !agreed) {
      setMessage("You must agree to the Terms & Conditions.");
      return;
    }

    try {
      if (isLogin) {
        // Login flow
        const response = await fetch(`${backend_IP}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Something went wrong.");
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        setMessage("Logged in successfully ✅");
        navigate("/chat");
      } else {
        const response = await fetch(`${backend_IP}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Something went wrong.");
          return;
        }

        // After successful signup, attempt login
        const loginRes = await fetch(`${backend_IP}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginRes.json();

        if (!loginRes.ok) {
          setMessage("Account created successfully! Please log in.");
          setIsLogin(true); // Switch to login mode
          return;
        }

        localStorage.setItem("token", loginData.token);
        localStorage.setItem("username", loginData.user.username);
        setMessage("Signed up and logged in ✅");
        navigate("/chat");
      }
    } catch (err) {
      setMessage("Server error. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
     <AuthProvider>
        <Nav />
      </AuthProvider>
    <div className="flex justify-center items-center h-[100vh] bg-background text-text -mt-10">
      <div className="bg-background text-text p-6 md:p-8 border border-gray-400 rounded-xl z-1 relative w-[90%] max-w-md text-center shadow-2xl">
        <h2 className="text-xl text-black dark:text-gray-100  font-medium mb-2">
          {isLogin ? "Hi, welcome back!" : "Create your account"}
        </h2>
        <p className="text-sm text-black dark:text-gray-200 mb-4">
          {isLogin
            ? "Please enter your credentials to continue."
            : "Join us and explore your PDFs like never before."}
        </p>
        <div className="flex justify-left mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-xl border font-bold mr-2 shadow-md hover:shadow-lg transition ${
              isLogin
                ? "bg-[#7182FF] text-black dark:text-gray-100  border-gray-400/10"
                : "text-black dark:text-gray-100 border-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-xl border font-bold shadow-md hover:shadow-lg transition ${
              !isLogin
                ? "bg-[#7182FF]  text-black dark:text-gray-100  border-gray-400/10"
                : "text-black dark:text-gray-100 border-gray-400"
            }`}
          >
            SignUp
          </button>
        </div>

        <div className="text-left font-poppins font-[550] mb-4">
          {!isLogin && (
            <>
              <label className="block text-black dark:text-gray-100 mb-1">
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full text-black dark:text-gray-100 p-2 mb-4 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </>
          )}

          <label className="block text-black dark:text-gray-100 mb-1">
            Email Id:
          </label>
          <input
            type="email"
            placeholder="Enter Your Registered Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-black dark:text-gray-100  p-2 mb-4 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          <label className="block text-black dark:text-gray-100 mb-1">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-black dark:text-gray-100  p-2 border  border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          {!isLogin && (
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mr-2 w-4 h-4 rounded border border-gray-400 bg-white checked:bg-black appearance-none checked:appearance-auto"
              />
              <label className="text-sm text-black dark:text-gray-500">
                I agree to the Terms & Conditions
              </label>
            </div>
          )}
        </div>

        <p className="text-sm text-black dark:text-gray-300 mb-4">
          By continuing you agree with our Terms &amp; Conditions
        </p>

        <button
          onClick={handleAuth}
          className="px-6 py-2 text-black dark:text-gray-100  rounded-full border/10 border-gray-200 bg-[#7182FF] font-bold transition bg-[#7182FF]/90 shadow-lg"
        >
          Continue
        </button>

        <p className="mt-4 text-red-500">{message}</p>
      </div>
    </div>
    </>
  );
};

export default Auth;
