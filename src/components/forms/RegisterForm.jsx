import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import styled from "styled-components";

const RegisterPageWrapper = styled.div`
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

const RegisterForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 50%;
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

const RegisterButton = styled.button`
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
