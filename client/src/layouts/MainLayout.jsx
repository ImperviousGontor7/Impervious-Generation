import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full">
      <Header />

      <main className="mt-[clamp(35px,5vw,90px)]">
        <Navbar />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}