import React, { useState, useEffect } from "react";
import useUserStore from "../store/userStore";

const RegisterPage = () => {
  const loggedInUser = useUserStore((state) => state.loggedInUser);
  const collection = loggedInUser?.collection || [];

  useEffect(() => {
    // Funkcja wywoływana po każdej zmianie w kolekcji
    console.log("Kolekcja została zaktualizowana:", collection);
  }, [collection]); // Nasłuchiwanie zmian w kolekcji

  return (
    <div>
      <h2>Kolekcja dla użytkownika: {loggedInUser?.login}</h2>
      <ul>
        {collection.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
export default RegisterPage;
