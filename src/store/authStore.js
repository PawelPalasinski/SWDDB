// authStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  registerUser: (username, password) => {
    // Logika rejestracji użytkownika
    // Zapisz username i password w localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    set({ isLoggedIn: true }); // Ustawienie isLoggedIn na true po rejestracji
    console.log("Registration successful");
  },
  loginUser: (username, password) => {
    // Logika logowania użytkownika
    // Pobierz username i password z localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
      set({ isLoggedIn: true }); // Ustawienie isLoggedIn na true po poprawnym logowaniu
      console.log("Login successful");
    } else {
      set({ isLoggedIn: false }); // Ustawienie isLoggedIn na false przy niepoprawnych danych logowania
      console.log("Invalid username or password");
    }
  },
  logoutUser: () => {
    // Logika wylogowywania użytkownika
    set({ isLoggedIn: false }); // Ustawienie isLoggedIn na false przy wylogowywaniu
    console.log("Logout successful");
  },
}));

export default useAuthStore;
