import { useState } from "react";
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

export default function MenuPage({
  activeSection,
  quantities,
  setQuantities,
  menus,
}: {
  activeSection: string;
  quantities: Quantities;
  setQuantities: React.Dispatch<React.SetStateAction<Quantities>>;
  menus: MenuItem[];
}) {
  const [showModal, setShowModal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [checkedOut, setCheckedOut] = useState<(MenuItem & { qty: number })[]>([]);

  function updateQuantity(name: string, amount: number) {
    setQuantities((prev: Quantities) => {
      const current = prev[name] || 0;
      const next = Math.max(current + amount, 0);
      if (next === 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: next };
    });
  }

  function handleCheckout() {
    const checked = Object.entries(quantities)
      .filter(([_, qty]) => (qty as number) > 0)
      .map(([name, qty]) => {
        const item = menus.find(m => m.name === name);
        return item ? { ...item, qty: qty as number } : null;
      })
      .filter((i): i is MenuItem & { qty: number } => i !== null);
    if (checked.length === 0) {
      setCheckedOut([]);
      setShowModal(true);
      return;
    }
    setCheckedOut(checked);
    setShowModal(true);
  }

  function handleCancel() {
    setShowModal(false);
  }

  function handleProceed() {
    setShowModal(false);
    setShowInvoice(true);
  }

  function handleCloseInvoice() {
    setShowInvoice(false);
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
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <main className="flex-1 w-full p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {filteredMenus.map((item) => (
          <MenuCard
            key={item.name}
            item={item}
            count={quantities[item.name] || 0}
            updateQuantity={updateQuantity}
          />
        ))}
      </main>
      <button
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all cursor-pointer"
        onClick={handleCheckout}
      >
        Checkout
      </button>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="bg-white dark:bg-gray-100 rounded-lg shadow-lg max-w-md w-full p-6 m-2">
            <h2 className="text-xl font-bold mb-4">Checkout Items</h2>
            {checkedOut.length === 0 ? (
              <div className="mb-4 text-gray-700 dark:text-gray-300">No items to checkout.</div>
            ) : (
              <>
                <ul className="mb-4">
                  {checkedOut.map(item => (
                    <li key={item.name} className="flex justify-between py-1">
                      <span>{item.name} <span className="text-gray-500">(₱ {item.price})</span></span>
                      <span className="font-medium">x{item.qty}</span>
                    </li>
                  ))}
                </ul>
                {/* Total */}
                <div className="mb-4 text-right text-lg font-semibold text-gray-800 dark:text-gray-700">
                  Total: ₱ {checkedOut.reduce((sum, item) => sum + item.price * item.qty, 0)}
                </div>
              </>
            )}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-800 cursor-pointer${checkedOut.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleProceed}
                disabled={checkedOut.length === 0}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Invoice Modal */}
      {showInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="bg-white dark:bg-gray-100 rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Invoice / Receipt</h2>
            <ul className="mb-4">
              {checkedOut.map(item => (
                <li key={item.name} className="flex justify-between py-1">
                  <span>{item.name}</span>
                  <span className="font-medium">x{item.qty} &times; ₱ {item.price}</span>
                  <span className="font-medium">₱ {item.price * item.qty}</span>
                </li>
              ))}
            </ul>
            <div className="mb-4 text-right text-lg font-semibold text-gray-800 dark:text-gray-700">
              Total: ₱ {checkedOut.reduce((sum, item) => sum + item.price * item.qty, 0)}
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
                onClick={handleCloseInvoice}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuCard({ item, count, updateQuantity }: { item: MenuItem; count: number; updateQuantity: (name: string, amount: number) => void }) {
  return (
    <div className="h-fit w-full max-w-sm p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col gap-2 h-full">
        <img
          className="mx-auto block w-full h-40 sm:h-48 object-cover rounded"
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

function MyButton({ count, onIncrement, onDecrement }: { count: number; onIncrement: () => void; onDecrement: () => void }) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={onDecrement}
        className="bg-rose-500 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded cursor-pointer"
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
