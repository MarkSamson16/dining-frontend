import { useState } from "react";

const sections = {
  Appetizer: "Our appetizers are freshly made with local ingredients. Try our garlic bread or spring rolls.",
  "Main Course": "Choose from hearty meals like grilled salmon, steak, or vegetarian pasta.",
  Sides: "Choose from a variety of side dishes to elevate the taste of main dishes.",
  Drinks: "Refreshing drinks including house blend iced tea, fruit shakes, and coffee.",
  Dessert: "Finish strong with our chocolate lava cake, mango float, or halo-halo.",
};

const sectionNames = Object.keys(sections);

interface Quantities {
  [name: string]: number;
}

interface SidebarProps {
  active: string;
  setActive: (name: string) => void;
  quantities: Quantities;
  menus: Array<{ name: string; section: string }>;
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ active, setActive, quantities, menus, open = true, onClose }: SidebarProps) {
  // Calculate total quantity per section
  const sectionTotals: { [section: string]: number } = {};
  menus.forEach(menu => {
    if (quantities[menu.name]) {
      sectionTotals[menu.section] = (sectionTotals[menu.section] || 0) + quantities[menu.name];
    }
  });

  // Responsive sidebar: overlay on mobile, static on desktop
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z bg-opacity-40 top-40 right-0 md:hidden transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`z-50 md:static fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 p-4 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}
        style={{ minHeight: '100vh' }} >

        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-2 right-4 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-full p-2"
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h2 className="text-xl font-semibold mb-4 text-sky-600">Menu</h2>

        <ul className="space-y-2">
          {sectionNames.map((name) => (
            <li key={name} className="relative group flex items-center">
              <button
                onClick={() => { setActive(name); if (onClose) onClose(); }}
                className={`w-full text-left px-3 py-2 rounded-md font-medium cursor-pointer ${active === name
                    ? "bg-sky-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-sky-100"
                  }`}
              >
                {name}
                {sectionTotals[name] > 0 && (
                  <span className="ml-2 px-2 py-1 rounded-full bg-green-600 text-white text-xs font-bold shadow">
                    {sectionTotals[name]}
                  </span>
                )}
              </button>
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 p-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 sm:hidden md:block">
                {sections[name as keyof typeof sections]}
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
