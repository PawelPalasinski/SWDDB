import React, { useState } from "react";
import useAuthStore from "../../store/authStore";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { loginUser } = useAuthStore();

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Username and password are required.");
      return;
    }

    // Sprawdzenie poprawności danych logowania

    // Symulacja sukcesu logowania
    const userData = {
      username: username,
      password: password,
    };

    // Logowanie użytkownika
    loginUser(username, password);

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
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;
