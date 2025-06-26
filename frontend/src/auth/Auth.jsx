import React from "react";

const Auth = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] bg-white relative">
      <img
        src="/logo.png"
        className="absolute top-[25%] left-[30%] md:top-[18%] md:left-[45%] translate-x-[-50%] translate-y-[-50%] w-[250px] z-0"
      />
      <div className="bg-white p-6 md:p-8 border rounded-xl z-1 relative w-[90%] max-w-md text-center shadow-2xl">
        <h2 className="text-xl font-medium mb-2">
          {isLogin ? "Hi, welcome back!" : "Create your CareBuddy account"}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {isLogin
            ? "Please enter your credentials to continue."
            : "Join us and start your wellness journey."}
        </p>
        <div className="flex justify-left mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-xl border font-bold mr-2 shadow-md hover:shadow-lg transition ${
              isLogin ? "bg-primary border-black" : "bg-white border-black"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-xl border font-bold shadow-md hover:shadow-lg transition ${
              !isLogin ? "bg-primary border-black" : "bg-white border-black"
            }`}
          >
            SignUp
          </button>
        </div>

        <div className="text-left font-poppins font-[550] mb-4">
          {!isLogin && (
            <>
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </>
          )}

          <label className="block mb-1">Email Id:</label>
          <input
            type="email"
            placeholder="Enter Your Registered Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          <label className="block mb-1">Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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

        <p className="text-sm text-gray-500 mb-4">
          By continuing you agree with our Terms &amp; Conditions
        </p>

        <button
          onClick={handleAuth}
          className="px-6 py-2 rounded-full border border-black bg-primary font-bold transition bg-primary/90 shadow-lg"
        >
          Continue
        </button>

        <p className="mt-4 text-red-500">{message}</p>
      </div>
    </div>
  );
};

export default Auth;
