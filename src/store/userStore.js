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
      let updatedUsers;
      set((state) => {
        const userIndex = state.users.findIndex((user) => user.login === login);
        if (userIndex !== -1) {
          updatedUsers = [...state.users];
          const user = { ...updatedUsers[userIndex] };
          const collection = user.collection || [];
          const index = collection.findIndex((code) => code === cardCode);
          if (index !== -1) {
            // If the card is already in the collection, remove it
            const newCollection = [...collection];
            newCollection.splice(index, 1);
            user.collection = newCollection.length > 0 ? newCollection : null; // Update collection value to null if empty
            updatedUsers[userIndex] = user;
            return { users: updatedUsers };
          } else {
            // If the card is not in the collection, add it
            const newCollection = collection
              ? [...collection, cardCode]
              : [cardCode]; // Check if collection is null before adding a new card
            user.collection = newCollection;
            updatedUsers[userIndex] = user;
            return { users: updatedUsers };
          }
        } else {
          console.log(`User not found: ${login}`);
          return state;
        }
      });
      console.log(`Card added/removed from collection for user: ${login}`);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
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

    // getButtonText: (cardCode) => {
    //   const state = useUserStore.getState();
    //   const loggedInUser = state.loggedInUser;
    //   const collection = loggedInUser.collection || [];
    //   const index = collection.findIndex((code) => code === cardCode);
    //   if (index !== -1) {
    //     return "DEL";
    //   } else {
    //     return "ADD";
    //   }
    // },
  };
});

export default useUserStore;
