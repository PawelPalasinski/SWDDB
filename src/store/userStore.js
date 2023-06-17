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
      set((state) => ({
        users: [...state.users, newUser],
        loggedInUser: newUser,
        isLoggedIn: true,
      }));
      console.log(`User added: ${login}`);
      localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
    },

    handleLogin: (login, password) => {
      const state = useUserStore.getState();
      const isLoggedIn = state.isLoggedIn;
      if (!isLoggedIn) {
        const user = state.users.find((user) => user.login === login);
        if (user && user.password === password) {
          set({ isLoggedIn: true, loggedInUser: user });
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
        set({ isLoggedIn: false, loggedInUser: null });
        console.log("Logged out successfully");
      } else {
        console.log("User is already logged out");
      }
    },

    handleAddOrRemoveFromCollection: (login, cardCode, rating) => {
      set((state) => {
        const userIndex = state.users.findIndex((user) => user.login === login);
        if (userIndex !== -1) {
          const updatedUsers = [...state.users];
          const user = { ...updatedUsers[userIndex] };
          const collection = user.collection || [];
          const cardIndex = collection.findIndex(
            (card) => card.cardCode === cardCode
          );
          if (cardIndex !== -1) {
            // Karta już istnieje w kolekcji, usuń ją
            collection.splice(cardIndex, 1);
          } else {
            // Karta nie istnieje w kolekcji, dodaj ją
            const newCard = { cardCode, rate: rating };
            collection.push(newCard);
          }
          user.collection = collection.length > 0 ? collection : null;
          updatedUsers[userIndex] = user;
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          return { users: updatedUsers };
        } else {
          console.log(`Nie znaleziono użytkownika: ${login}`);
          return state;
        }
      });
      console.log(`Dodano/usunięto kartę z kolekcji dla użytkownika: ${login}`);
    },

    setRating: (login, rating) => {
      set((state) => {
        const updatedUsers = state.users.map((user) => {
          if (user.login === login) {
            return { ...user, rate: rating };
          }
          return user;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { users: updatedUsers };
      });
      console.log(`Ustawiono ocenę dla użytkownika: ${login}`);
    },
  };
});

export default useUserStore;
