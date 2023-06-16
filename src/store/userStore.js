import { create } from "zustand";

const useUserStore = create((set) => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  return {
    isLoggedIn: false,
    loggedInUser: null,
    users: storedUsers,
    addUser: (login, password) => {
      const newUser = {
        login,
        password,
        collection: [],
        rate: 0,
      };
      set((state) => ({ users: [...state.users, newUser] }));
      console.log(`User added: ${login}`);
      localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
    },

    handleLogin: (login, password) => {
      const state = useUserStore.getState();
      const isLoggedIn = state.isLoggedIn;
      if (!isLoggedIn) {
        const user = state.users.find((user) => user.login === login);
        if (user && user.password === password) {
          set({ isLoggedIn: true, loggedInUser: user }); // Ustawienie loggedInUser
          console.log(`Logged in as: ${login}`);
          return user;
        } else {
          console.log("Invalid login or password");
          return null;
        }
      } else {
        console.log("User is already logged in");
        return null;
      }
    },

    handleLogout: () => {
      const state = useUserStore.getState();
      const isLoggedIn = state.isLoggedIn;
      if (isLoggedIn) {
        set({ isLoggedIn: false });
        console.log("Logged out successfully");
      } else {
        console.log("User is already logged out");
      }
    },

    handleAddOrRemoveFromCollection: (login, cardCode) => {
      set((state) => {
        const userIndex = state.users.findIndex((user) => user.login === login);
        if (userIndex !== -1) {
          const updatedUsers = [...state.users];
          const user = { ...updatedUsers[userIndex] };
          const collection = user.collection || [];
          const index = collection.findIndex((code) => code === cardCode);
          if (index !== -1) {
            // Jeśli karta jest już w kolekcji, usuń ją
            const newCollection = [...collection];
            newCollection.splice(index, 1);
            user.collection = newCollection.length > 0 ? newCollection : null;
            updatedUsers[userIndex] = user;
            // Aktualizuj kolekcję w localStorage
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            return { users: updatedUsers };
          } else {
            // Jeśli karta nie jest w kolekcji, dodaj ją
            const newCollection = collection
              ? [...collection, cardCode]
              : [cardCode];
            user.collection = newCollection;
            updatedUsers[userIndex] = user;
            // Aktualizuj kolekcję w localStorage
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            return { users: updatedUsers };
          }
        } else {
          console.log(`Nie znaleziono użytkownika: ${login}`);
          return state;
        }
      });
      console.log(`Dodano/usunięto kartę z kolekcji dla użytkownika: ${login}`);
    },

    setRating: (login, rating) => {
      set((state) => {
        const userIndex = state.users.findIndex((user) => user.login === login);
        if (userIndex !== -1) {
          const updatedUsers = [...state.users];
          const user = { ...updatedUsers[userIndex] };
          user.rate = rating;
          updatedUsers[userIndex] = user;
          // Aktualizuj kolekcję w localStorage
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          return { users: updatedUsers };
        } else {
          console.log(`Nie znaleziono użytkownika: ${login}`);
          return state;
        }
      });
      console.log(`Ustawiono ocenę dla użytkownika: ${login}`);
    },
  };
});

export default useUserStore;
