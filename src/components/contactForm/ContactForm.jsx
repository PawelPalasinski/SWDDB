import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  //   const sendEmail = (e) => {
  //     e.preventDefault();

  //     emailjs
  //       .sendForm(
  //         process.env.REACT_APP_EMAILJS_SERVICE_ID,
  //         process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  //         e.target,
  //         process.env.REACT_APP_EMAILJS_USER_ID
  //       )
  //       .then(
  //         (result) => {
  //           console.log(result.text);
  //         },
  //         (error) => {
  //           console.log(error.text);
  //         }
  //       );
  //   };

  const sendEmail = (data) => {
    emailjs
      .send(
        import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID,
        data,
        import.meta.env.VITE_REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const onSubmit = (data) => {
    setIsSubmitted(true);
    sendEmail(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Imię i nazwisko:</label>
      <input
        id="name"
        name="name"
        type="text"
        {...register("name", { required: true })}
      />
      {errors && <span>To pole jest wymagane</span>}

      <label htmlFor="email">Adres e-mail:</label>
      <input
        id="email"
        name="email"
        type="email"
        {...register("email", { required: true })}
      />
      {errors && <span>To pole jest wymagane</span>}

      <label htmlFor="message">Wiadomość:</label>
      <textarea
        id="message"
        name="message"
        {...register("message", { required: true })}
      ></textarea>
      {errors && <span>To pole jest wymagane</span>}

      <button type="submit">Wyślij</button>
    </form>
  );
};

export default ContactForm;
