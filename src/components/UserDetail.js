import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const UserDetail = () => {
  const { darkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error when starting a new fetch

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setError("Failed to load user details. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 bg-transparent rounded-lg shadow-lg border-2 ${
        darkMode
          ? "bg-dark text-light border-dark"
          : "bg-light text-dark border-light"
      } transition-all`}
    >
      <h1 className="text-3xl font-semibold mb-4">{user.name}</h1>
      <p className="text-lg mb-2">
        Email: <span className="font-medium">{user.email}</span>
      </p>
      <p className="text-lg mb-2">
        Phone: <span className="font-medium">{user.phone}</span>
      </p>
      <p className="text-lg mb-2">
        Company: <span className="font-medium">{user.company.name}</span>
      </p>
      <p className="text-lg mb-4">
        Website:{" "}
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noreferrer"
          className="text-link hover:text-link-hover"
        >
          {user.website}
        </a>
      </p>

      <button
        onClick={() => navigate("/")}
        className={`mt-6 px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-300 border-2 ${
          darkMode
            ? "bg-teal-500 text-light hover:bg-teal-400 border-teal-500"
            : "bg-blue-500 text-light hover:bg-blue-400 border-blue-500"
        }`}
      >
        Go Back
      </button>
    </div>
  );
};

export default UserDetail;
