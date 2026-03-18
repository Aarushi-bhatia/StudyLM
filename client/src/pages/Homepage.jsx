import Nav from "../components/layout/Navbar.jsx";
import Welcome from "../components/home/Welcome.jsx";
import { AuthProvider } from "../context/AuthContext";
import Features from "../components/home/Welcome.jsx";
import Footer from "../components/layout/Footer.jsx";

const Homepage = () => {
  return (
    <>
      <AuthProvider>
        <Nav />
      </AuthProvider>
      <div className="flex flex-col font-myfont h-screen bg-white dark:bg-[#0F172A]">
        <main className="block flex-grow p-4">
          
          <Welcome />
        </main>
      </div>
      <Features />
      <Footer />
    </>
  );
};

export default Homepage;
