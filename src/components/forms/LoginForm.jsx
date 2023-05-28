import React, { useState } from "react";
import useAuthStore from "../../store/authStore";

const LoginForm = () => {
  const loginUser = useAuthStore((state) => state.loginUser); // Pobranie funkcji loginUser ze stanu uwierzytelniania
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Username and password are required.");
      return;
    }

    // Wywołanie funkcji loginUser ze stanu uwierzytelniania
    loginUser(username, password)
      .then(() => {
        // Zalogowano pomyślnie
        setUsername("");
        setPassword("");
        setErrorMessage("");
      })
      .catch((error) => {
        // Obsługa błędu logowania
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
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;
