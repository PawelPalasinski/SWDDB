import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false, // Dodana zmienna isLoggedIn
  registerUser: (username, password) => {
    // Logika rejestracji użytkownika
    // Zapisz username i password w localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    set({ isLoggedIn: true }); // Ustawienie isLoggedIn na true po rejestracji
    console.log("reg+");
  },
  loginUser: (username, password) => {
    // Logika logowania użytkownika
    // Pobierz username i password z localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
      set({ isLoggedIn: true }); // Ustawienie isLoggedIn na true po poprawnym logowaniu
      console.log("+");
    } else {
      set({ isLoggedIn: false }); // Ustawienie isLoggedIn na false przy niepoprawnych danych logowania
      console.log("-");
    }
  },
  logoutUser: () => {
    // Logika wylogowywania użytkownika
    // Usuń username i password z localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    set({ isLoggedIn: false }); // Ustawienie isLoggedIn na false przy wylogowywaniu
  },
}));

export default useAuthStore;
