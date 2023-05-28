import React, { useState } from "react";
import useAuthStore from "../../store/authStore";

const RegisterForm = () => {
  const registerUser = useAuthStore((state) => state.registerUser); // Pobranie funkcji registerUser ze stanu uwierzytelniania
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Username and password are required.");
      return;
    }

    // Wywołanie funkcji registerUser ze stanu uwierzytelniania
    registerUser(username, password)
      .then(() => {
        // Zarejestrowano pomyślnie
        setUsername("");
        setPassword("");
        setErrorMessage("");
      })
      .catch((error) => {
        // Obsługa błędu rejestracji
        setErrorMessage(error.message);
      });
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
