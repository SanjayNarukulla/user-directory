import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Reset error state when starting the fetch request

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok"); // Handle network issues
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again later."); // Set error state if fetch fails
        setLoading(false); // Set loading to false after fetch attempt
      });
  }, []);

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} py-8`}
    >
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center px-6">
            <input
              type="text"
              placeholder="Search by name"
              className={`px-4 py-2 rounded-xl focus:outline-none shadow-md w-full md:w-1/3 border-2 ${
                darkMode
                  ? "border-gray-700 bg-gray-800 text-white"
                  : "border-gray-300 bg-gray-100 text-black"
              }`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className={`mt-4 md:mt-0 md:ml-4 px-6 py-2 rounded-lg text-lg font-semibold border-2 ${
                darkMode
                  ? "bg-yellow-500 text-black border-yellow-500 hover:bg-yellow-400 hover:border-yellow-400"
                  : "bg-gray-800 text-white border-gray-800 hover:bg-gray-700 hover:border-gray-700"
              } transition-all duration-200`}
            >
              Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 py-8">
            {currentUsers.map((user) => (
              <Link
                key={user.id}
                to={`/user/${user.id}`}
                className={`p-6 bg-transparent rounded-xl shadow-xl hover:scale-105 transition-all duration-300 border-2 ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
                <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                <p className="text-sm text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-400">{user.address.city}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-5 py-2 rounded-full text-lg font-semibold border-2 ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
                  : darkMode
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "bg-gray-800 text-white border-gray-800"
              } transition-all duration-200`}
            >
              Previous
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num + 1}
                onClick={() => handlePageChange(num + 1)}
                className={`px-5 py-2 rounded-full text-lg font-semibold border-2 ${
                  currentPage === num + 1
                    ? "bg-blue-500 text-white border-blue-500"
                    : darkMode
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "bg-gray-800 text-white border-gray-800"
                } transition-all duration-200`}
              >
                {num + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-5 py-2 rounded-full text-lg font-semibold border-2 ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
                  : darkMode
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "bg-gray-800 text-white border-gray-800"
              } transition-all duration-200`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
