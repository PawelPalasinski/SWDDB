import React, { useState } from "react";
import useAuthStore from "../../store/authStore";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { registerUser } = useAuthStore();

  const handleRegister = () => {
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Username and password are required.");
      return;
    }

    // Sprawdzenie czy dane rejestracji są poprawne

    // Symulacja sukcesu rejestracji
    const userData = {
      username: username,
      password: password,
    };

    // Rejestracja użytkownika
    registerUser(username, password);

    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  return (
    <div>
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
      <button onClick={handleRegister}>Register</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default RegisterForm;
