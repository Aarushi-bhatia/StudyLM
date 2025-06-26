import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = () => {
    // Handle login/signup here
  };

  return (

    <div className="flex justify-center items-center h-[100vh] bg-[#2C2025] relative">
         <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_#E2745B_0%,_transparent_60%)] blur-3xl opacity-50 -top-30 left-200 z-0"></div>

      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_#E2745B_0%,_transparent_35%)] blur-3xl opacity-50 top-90 left-50 z-0"></div>

      <div className="bg-[#2C2025] p-6 md:p-8 border border-gray-400 rounded-xl z-1 relative w-[90%] max-w-md text-center shadow-2xl">
        <h2 className="text-xl text-gray-100  font-medium mb-2">
          {isLogin ? "Hi, welcome back!" : "Create your account"}
        </h2>
        <p className="text-sm text-gray-200 mb-4">
          {isLogin
            ? "Please enter your credentials to continue."
            : "Join us and explore your PDFs like never before."}
        </p>
        <div className="flex justify-left mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-xl border font-bold mr-2 shadow-md hover:shadow-lg transition ${
              isLogin ? "bg-[#FF8163] text-gray-100  border-gray-400/10" : "text-gray-100 border-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-xl border font-bold shadow-md hover:shadow-lg transition ${
              !isLogin ? "bg-[#FF8163]  text-gray-100  border-gray-400/10" : "text-gray-100 border-gray-400"
            }`}
          >
            SignUp
          </button>
        </div>

        <div className="text-left font-poppins font-[550] mb-4">
          {!isLogin && (
            <>
              <label className="block text-gray-100 mb-1">Name:</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full text-gray-100 p-2 mb-4 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </>
          )}

          <label className="block text-gray-100 mb-1">Email Id:</label>
          <input
            type="email"
            placeholder="Enter Your Registered Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-gray-100  p-2 mb-4 border rounded-lg border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          <label className="block text-gray-100 mb-1">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-gray-100  p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          {!isLogin && (
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mr-2 w-4 h-4 rounded border border-gray-400 bg-white checked:bg-black appearance-none checked:appearance-auto"
              />
              <label className="text-sm text-gray-500">
                I agree to the Terms & Conditions
              </label>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-300 mb-4">
          By continuing you agree with our Terms &amp; Conditions
        </p>

        <button
          onClick={handleAuth}
          className="px-6 py-2 text-gray-100  rounded-full border/10 border-gray-200 bg-bg-[#FF8163] font-bold transition bg-[#FF8163]/90 shadow-lg"
        >
          Continue
        </button>

        <p className="mt-4 text-red-500">{message}</p>
      </div>
    </div>
  );
};

export default Auth;
