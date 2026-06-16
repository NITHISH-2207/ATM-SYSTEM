import { useState } from "react";
import { login } from "../services/api";

function Login({ setUser, setShowLogin }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(
        accountNumber,
        pin
      );

      setUser(response.data);
    } catch (error) {
      alert("Invalid Account Number or PIN");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          ATM Login
        </h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value)
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) =>
              setPin(e.target.value)
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => setShowLogin(false)}
            className="text-indigo-600 font-semibold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
