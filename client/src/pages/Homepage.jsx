import Nav from "../components/Nav";
import Welcome from "../components/Welcome";
import { AuthProvider } from "../context/AuthContext";
import Features from "../HomeComponents/Features";
import Footer from "../HomeComponents/Footer";
import WelcomeMobile from "../components/WelcomeMobile";

const Homepage = () => {
  return (
    <>
      <AuthProvider>
        <Nav />
      </AuthProvider>
      <div className="flex flex-col font-myfont h-screen bg-white dark:bg-[#0F172A]">
        <main className="hidden sm:block sm:flex-grow sm:p-4">
          <Welcome />
        </main>
        <div className="sm:hidden">
          <WelcomeMobile />
        </div>
      </div>
      <Features />
      <Footer />
    </>
  );
};

export default Homepage;