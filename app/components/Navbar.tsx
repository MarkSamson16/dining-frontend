import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-sky-600">
                    MyRestaurant
                </Link>
                <div className="space-x-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-sky-600 font-medium"
                                : "text-gray-700 dark:text-gray-300 hover:text-sky-500"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/menu"
                        className={({ isActive }) =>
                            isActive
                                ? "text-sky-600 font-medium"
                                : "text-gray-700 dark:text-gray-300 hover:text-sky-500"
                        }
                    >
                        Menu
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
