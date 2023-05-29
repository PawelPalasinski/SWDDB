// RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const registerUser = useAuthStore((state) => state.registerUser);
  const navigate = useNavigate();

  const handleRegistration = () => {
    if (username && password) {
      registerUser(username, password);
      setUsername("");
      setPassword("");
      setErrorMessage("Registration successful. You can now log in.");
      navigate("/SWDDB/login");
    } else {
      setErrorMessage("Please enter a username and password");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export default RegisterPage;
