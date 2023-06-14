import { create } from "zustand";

const useUserStore = create((set) => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  return {
    isLoggedIn: false,
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
          set({ isLoggedIn: true });
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
      const state = useUserStore.getState();
      const userIndex = state.users.findIndex((user) => user.login === login);
      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        const user = { ...updatedUsers[userIndex] };
        const collection = user.collection || [];
        const index = collection.findIndex((code) => code === cardCode);
        if (index !== -1) {
          // If the card is already in the collection, remove it
          const newCollection = [...collection];
          newCollection.splice(index, 1);
          user.collection = newCollection;
          updatedUsers[userIndex] = user;
          set({ users: updatedUsers });
          console.log(`Card removed from collection for user: ${login}`);
        } else {
          // If the card is not in the collection, add it
          user.collection = [...collection, cardCode];
          updatedUsers[userIndex] = user;
          set({ users: updatedUsers });
          console.log(`Card added to collection for user: ${login}`);
        }
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } else {
        console.log(`User not found: ${login}`);
      }
    },
    setRating: (login, rating) => {
      const state = useUserStore.getState();
      const userIndex = state.users.findIndex((user) => user.login === login);
      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        const user = { ...updatedUsers[userIndex] };
        user.rate = rating;
        updatedUsers[userIndex] = user;
        set({ users: updatedUsers });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        console.log(`Rating set for user: ${login}`);
      } else {
        console.log(`User not found: ${login}`);
      }
    },
  };
});

export default useUserStore;
