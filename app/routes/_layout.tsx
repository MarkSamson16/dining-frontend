import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LayoutRoute() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}