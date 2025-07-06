import React, { useState } from "react";
import Nav from "../components/Nav";
import Welcome from "../components/Welcome";
import { AuthProvider } from "../context/AuthContext";
import Features from "../HomeComponents/Features";
import AboutUs from "../HomeComponents/AboutUs";
import FAQ from "../HomeComponents/FAQ";
import Reviews from "../HomeComponents/Reviews";
import CTA from "../HomeComponents/CTA";
import Footer from "../HomeComponents/Footer";
import VerticalMoving from "../HomeComponents/Carousal";
import WelcomeMobile from "../components/WelcomeMobile";

const Homepage = () => {

  return (
    <>
    <AuthProvider>
      <Nav />
      </AuthProvider>
    <div className="flex flex-col h-screen bg-[#2C2025]">
      
      <main className="hidden sm:block sm:flex-grow sm:p-4">
        <Welcome />
      </main>
      <div className="sm:hidden">
        <WelcomeMobile />
      </div>
      </div>
      <Features />
      <AboutUs />
      {/* <FAQ /> */}
      <Reviews />
      {/* <CTA /> */}
      <Footer />
    
    </>
  );
};

export default Homepage;
