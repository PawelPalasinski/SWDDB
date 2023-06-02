import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import styled from "styled-components";

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputField = styled.input`
  width: 300px;
  height: 40px;
  padding: 8px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LoginButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: #ffd700;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0c809;
  }
`;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const loginUser = useAuthStore((state) => state.loginUser);
  const navigate = useNavigate();

  const handleLogin = () => {
    loginUser(username, password);
    setUsername("");
    setPassword("");
    setErrorMessage("Invalid username or password");
    navigate("/SWDDB/collection");
  };

  return (
    <LoginPageWrapper>
      <LoginTitle>Login</LoginTitle>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <LoginForm>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;
