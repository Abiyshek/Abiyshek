import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/"); // Already logged in, go to homepage
    }
  }, [navigate]);

  const handleLogin = () => {
    setError("");

    if (!username || !password) {
      setError("Username and password are required!");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (
      storedUser.username === username &&
      storedUser.password === password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/"); // Redirect to home after login
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-96 text-center transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Log in</h1>
        <h6 className="text-2xl font-bold text-gray-400 mb-6">to access Quick Mart</h6>

        {error && <p className="text-red-500 mb-4 text-lg">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="mt-4 text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
          <br />
          <button
            onClick={() => navigate("/register")}
            className="mt-2 text-blue-600 hover:underline"
          >
            New user? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
