import Nav from "../components/Nav";
import Welcome from "../components/Welcome";
import { AuthProvider } from "../context/AuthContext";
import Features from "../components/Features";
import Footer from "../components/Footer";

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