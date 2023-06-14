import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// import useAuthStore from "../../store/authStore";
// import useCollectionStore from "../../store/collectionStore";

import useUserStore from "../../store/userStore";

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 0;
  text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
  font-size: 12px;
  margin-top: -24px;
`;

const LoginForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 50%;
min-width: 300px;
margin: 0 auto;
padding: 30px;
background: rgba(255, 255, 255, 0.3);
border-radius: 20px;
backdrop-filter: blur(10px);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
border: 1px solid rgba(255, 255, 255, 0.18);
height: auto;
label {
  margin-bottom: 10px;
  font-size: 18px;
  color: #fff;
  text-shadow: 1px 1px 2px #000, 0 0 1em #ffd700, 0 0 0.2em #000;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 25px;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.5);
  color: #000;
  font-size: 16px;
  resize: vertical;
`;

const LoginButton = styled.button`
  background-color: #ffd700;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 2em;
  padding: 12px;
  width: 100%;
  border: none;
  text-shadow: 1px 1px 2px #000, 0 0 1em #000, 0 0 0.2em #000;

  &:hover {
    background-color: #fff;
    color: #ffd700;
  }
`;

const LoginPage = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const loginUser = useAuthStore((state) => state.loginUser);
  // const navigate = useNavigate();

  // const handleLogin = () => {
  //   loginUser(username, password);
  //   setUsername("");
  //   setPassword("");
  //   setErrorMessage("Invalid username or password");

  //   const collectionStore = useCollectionStore("user_id");
  //   // Inicjalizacja kolekcji dla danego użytkownika
  //   const initialCollectionData = []; // lub inne początkowe dane kolekcji
  //   collectionStore.initializeCollection(initialCollectionData);

  //   navigate("/SWDDB/card-collection");
  // };

  const errorMessage = "Invalid username or password";

  const userStore = useUserStore();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    userStore.handleLogin(login, password);
  };

  const handleRegister = () => {
    userStore.addUser(login, password);
  };

  return (
    <LoginPageWrapper>
      {/* {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} */}
      <LoginForm>
        <InputField
          type="text"
          // value={username}
          value={login}
          // onChange={(e) => setUsername(e.target.value)}
          onChange={(e) => setLogin(e.target.value)}
        />
        <InputField
          type="password"
          value={password}
          // onChange={(e) => setPassword(e.target.value)}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton
          type="button"
          // onClick={handleLogin}
          onClick={handleLogin}
        >
          Login
        </LoginButton>
        <LoginButton
          type="button"
          // onClick={handleLogin}
          onClick={handleRegister}
        >
          Register
        </LoginButton>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;
