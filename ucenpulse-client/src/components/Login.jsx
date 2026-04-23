import { useState } from "react";
import { apiRequest, setToken } from "../api";

export default function Login({ onLogin }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isRegisterMode) {
        await apiRequest("/auth/register", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        });

        setSuccess("Registration successful. Please log in.");
        setIsRegisterMode(false);
        setName("");
        setPassword("");
        return;
      }

      const res = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setToken(res.token);
      onLogin(res.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>{isRegisterMode ? "Register" : "Login"}</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {isRegisterMode && (
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      )}

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit">
        {isRegisterMode ? "Create Account" : "Login"}
      </button>

      <button
        type="button"
        onClick={() => {
          setIsRegisterMode(!isRegisterMode);
          setError("");
          setSuccess("");
        }}
      >
        {isRegisterMode
          ? "Already have an account? Login"
          : "Need an account? Register"}
      </button>
    </form>
  );
}