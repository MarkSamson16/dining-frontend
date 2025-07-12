import { useState } from "react";
import GetMenu from "./GetMenu";

const menus = GetMenu();

export default function MenuPage({ activeSection }) {
  const [quantities, setQuantities] = useState({});

  function updateQuantity(name, amount) {
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.max((prev[name] || 0) + amount, 0),
    }));
  }

  const filteredMenus = menus.filter(item => item.section === activeSection);

  if (!filteredMenus.length) {
    return (
      <div className="flex  bg-gray-50 dark:bg-gray-900">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col gap-2 h-full">
            <h1>No {activeSection} at the moment</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMenus.map((item) => (
          <MenuCard
            key={item.name}
            item={item}
            count={quantities[item.name] || 0}
            updateQuantity={updateQuantity}
          />
        ))}
      </main>
    </div>
  );
}

function MenuCard({ item, count, updateQuantity }) {
  return (
    <div className="h-fit max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col gap-2 h-full">
        <img
          className="mx-auto block w-full h-48 object-cover rounded"
          src={item.src}
          alt={item.name}
        />
        <span className="text-2xl font-medium">{item.name}</span>
        <span className="font-medium text-lg text-gray-700 dark:text-gray-300">
          ₱ {item.price}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{item.description}</span>
        <div className="mt-auto pt-2">
          <MyButton
            count={count}
            onIncrement={() => updateQuantity(item.name, +1)}
            onDecrement={() => updateQuantity(item.name, -1)}
          />
        </div>
      </div>
    </div>
  );
}

function MyButton({ count, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={onDecrement}
        className="bg-red-700 hover:bg-red-900 text-white font-medium py-2 px-4 rounded cursor-pointer"
      >
        -
      </button>

      <input
        type="text"
        className="w-16 text-center font-medium py-2 px-4 rounded bg-gray-100 dark:bg-gray-700"
        value={count}
        readOnly
      />

      <button
        onClick={onIncrement}
        className="bg-sky-500 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
