import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserDetail from "./components/UserDetail";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const App = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen transition-colors duration-300 ease-in-out`}
    >
      <Router>
        <header className="p-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">User Management App</h1>
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${
              darkMode
                ? "bg-yellow-500 text-black shadow-lg hover:bg-yellow-400"
                : "bg-gray-800 text-white shadow-md hover:bg-gray-700"
            }`}
          >
            {/* Icons for Dark/Light Mode */}
            {darkMode ? (
              <FaSun className="text-yellow-500 text-xl" />
            ) : (
              <FaMoon className="text-blue-500 text-xl" />
            )}
            {/* Optional: Adding text to enhance user understanding */}
            <span className="hidden md:block text-sm">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
