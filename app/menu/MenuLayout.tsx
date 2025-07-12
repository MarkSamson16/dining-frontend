import { useState } from "react";
import Sidebar from "./Sidebar";
import MenuPage from "./MenuPage";

export default function MenuLayout() {
  const [activeSection, setActiveSection] = useState("Appetizer");

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar active={activeSection} setActive={setActiveSection} />
      <MenuPage activeSection={activeSection} />
    </div>
  );
}
