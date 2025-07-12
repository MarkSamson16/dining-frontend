import { useState } from "react";

const sections = {
  Appetizer: "Our appetizers are freshly made with local ingredients. Try our garlic bread or spring rolls.",
  "Main Course": "Choose from hearty meals like grilled salmon, steak, or vegetarian pasta.",
  Sides: "Choose from a variety of side dishes to elevate the taste of main dishes.",
  Drinks: "Refreshing drinks including house blend iced tea, fruit shakes, and coffee.",
  Dessert: "Finish strong with our chocolate lava cake, mango float, or halo-halo.",
};

const sectionNames = Object.keys(sections);

export default function Sidebar({ active, setActive}) {
  const [activeSection, setActiveSection] = useState("Appetizer");

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 border-r">
      <h2 className="text-xl font-semibold mb-4 text-sky-600">Menu</h2>
      <ul className="space-y-2">
        {sectionNames.map((name) => (
          <li key={name} className="relative group">
            <button
              onClick={() => setActive(name)}
              className={`w-full text-left px-3 py-2 rounded-md font-medium cursor-pointer ${
                active === name
                  ? "bg-sky-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-sky-100"
              }`}
            >
              {name}
            </button>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 p-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {sections[name]}
            </div>
          </li>
        ))}
      </ul>
    </aside>
    </div>
  );
}
