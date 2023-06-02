import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import styled from "styled-components";

const RegisterPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegisterTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const RegisterForm = styled.form`
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

const RegisterButton = styled.button`
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
    <RegisterPageWrapper>
      <RegisterTitle>Register</RegisterTitle>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <RegisterForm>
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
        <RegisterButton onClick={handleRegistration}>Register</RegisterButton>
      </RegisterForm>
    </RegisterPageWrapper>
  );
};

export default RegisterPage;
