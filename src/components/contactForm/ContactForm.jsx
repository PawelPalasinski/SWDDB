import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);

  label {
    margin-bottom: 10px;
    font-size: 18px;
    color: #fff;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 25px;
    border: none;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.5);
    color: #000;
    font-size: 16px;
    resize: vertical;
  }

  button[type="submit"] {
    background-color: #e84855;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border-radius: 4px;
    padding: 12px;
    width: 100%;
    border: none;
  }

  button[type="submit"]:hover {
    background-color: #f67c92;
  }
`;

const StyledError = styled.p`
  color: red;
  margin: 0;
`;

const StyledSuccess = styled.p`
  color: green;
  margin: 0;
`;

const ContactForm = () => {
  const form = useRef();
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    if (isSending) return; // prevent multiple submissions

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setIsSending(true);

      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          form.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.text);
            setIsSent(true);
            setIsSending(false);
          },
          (error) => {
            console.log("FAILED...", error.text);
            setIsSending(false);
          }
        );
    } else {
      setErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    const { user_name, user_email, message } = form.current;

    if (!user_name.value.trim()) {
      errors.user_name = "Name is required";
    }

    if (!user_email.value.trim()) {
      errors.user_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user_email.value)) {
      errors.user_email = "Invalid email address";
    }

    if (!message.value.trim()) {
      errors.message = "Message is required";
    }

    return errors;
  };

  return (
    <StyledForm ref={form} onSubmit={sendEmail}>
      <label htmlFor="user_name">Name *</label>
      <input type="text" name="user_name" id="user_name" />
      {errors.user_name && <StyledError>{errors.user_name}</StyledError>}

      <label htmlFor="user_email">Email *</label>
      <input type="email" name="user_email" id="user_email" />
      {errors.user_email && <StyledError>{errors.user_email}</StyledError>}

      <label htmlFor="message">Message *</label>
      <textarea name="message" id="message"></textarea>
      {errors.message && <StyledError>{errors.message}</StyledError>}

      <button type="submit" disabled={isSending || isSent}>
        {isSending ? "Sending..." : isSent ? "Sent!" : "Send"}
      </button>
      {isSent && <StyledSuccess>Message sent successfully!</StyledSuccess>}
    </StyledForm>
  );
};

export default ContactForm;
