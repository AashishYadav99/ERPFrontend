import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import constantApi from "../../constantApi";
import Cookies from "js-cookie"; // Import js-cookie

const UserLoginPage = () => {
  const [loginData, setLoginData] = useState({ userId: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loginData.userId) {
      newErrors.userId = "User ID is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.userId)) {
      newErrors.userId = "Invalid email format";
    }
    if (!loginData.password) {
      newErrors.password = "Password is required";
    }
    // else if (loginData.password.length < 8) {
    //   newErrors.password = "Password must be at least 8 characters long";
    // }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch(`${constantApi.baseUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: loginData.userId,
            password: loginData.password,
          }),
        });
        console.log("response", response);

        const data = await response.json();

        if (response.ok) {
          alert("Login successful!");
          const token = data.data.token;

          Cookies.set("authToken", token, { expires: 7 }); // Expires in 7 days

          // localStorage.setItem("token", data.data.token); // Save token securely
          navigate("/module_master"); // Navigate to dashboard
        } else {
          setErrors({ apiError: data.message || "Login failed" });
        }
      } catch (error) {
        setErrors({ apiError: "Something went wrong. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(formErrors);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User ID (Email)
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={loginData.userId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.userId && (
              <p className="text-red-500 text-sm">{errors.userId}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {errors.apiError && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errors.apiError}
            </p>
          )}

          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isSubmitting ? "Logging In..." : "Login"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
