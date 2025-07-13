import { useState } from "react";
import Sidebar from "./Sidebar";
import MenuPage from "./MenuPage";
import GetMenu from "./GetMenu";

interface MenuItem {
  name: string;
  price: number;
  description: string;
  section: string;
  src: string;
}

interface Quantities {
  [name: string]: number;
}

export default function MenuLayout() {
  const [activeSection, setActiveSection] = useState("Appetizer");
  const [quantities, setQuantities] = useState<Quantities>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [burgerPos, setBurgerPos] = useState({ top: 50, left: undefined, right: 0 }); // top-0 left-0
  const menus: MenuItem[] = GetMenu();

  // Handle sidebar toggle for mobile
  function handleSidebarToggle() {
    setSidebarOpen((open) => !open);
  }

  function handleSidebarClose() {
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Burger for mobile */}
      <button
        className="md:hidden fixed bg-sky-600 text-white p-2 rounded shadow-lg z-40"
        style={{
          top: burgerPos.top,
          left: burgerPos.left,
          right: burgerPos.right,
          transition: "top 0.2s, left 0.2s, right 0.2s",
        }}
        onClick={handleSidebarToggle}
        aria-label="Toggle menu"
      >
        <svg
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="flex flex-1">
        {/* Sidebar: overlay on mobile, static on desktop */}
        <Sidebar
          active={activeSection}
          setActive={setActiveSection}
          quantities={quantities}
          menus={menus}
          open={sidebarOpen}
          onClose={handleSidebarClose}
        />

        <div className="flex-1">
          <MenuPage
            activeSection={activeSection}
            quantities={quantities}
            setQuantities={setQuantities}
            menus={menus}
          />
        </div>
      </div>
    </div>
  );
}
