import React, { useState } from "react";
import useUserStore from "../store/userStore";

const RegisterPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [rating, setRating] = useState(0);

  const handleAddUser = () => {
    useUserStore.getState().addUser(login, password);
    setLogin("");
    setPassword("");
  };

  const handleLogin = () => {
    useUserStore.getState().handleLogin(login, password);
    setLogin("");
    setPassword("");
  };

  const handleLogout = () => {
    useUserStore.getState().handleLogout();
  };

  const handleAddToCollection = () => {
    const loggedInUser = useUserStore.getState().loggedInUser;
    if (loggedInUser) {
      useUserStore
        .getState()
        .handleAddOrRemoveFromCollection(loggedInUser.login, cardCode, 0);
    }
    setCardCode("");
  };

  const handleRemoveFromCollection = () => {
    const loggedInUser = useUserStore.getState().loggedInUser;
    if (loggedInUser) {
      useUserStore
        .getState()
        .handleAddOrRemoveFromCollection(loggedInUser.login, cardCode, 0);
    }
    setCardCode("");
  };

  const handleSetRating = () => {
    const loggedInUser = useUserStore.getState().loggedInUser;
    if (loggedInUser) {
      const cardIndex = loggedInUser.collection.findIndex(
        (card) => card.cardCode === cardCode
      );
      if (cardIndex !== -1) {
        const updatedCollection = [...loggedInUser.collection];
        updatedCollection[cardIndex].rate = rating;
        useUserStore
          .getState()
          .setRating(loggedInUser.login, updatedCollection);
      }
    }
    setCardCode("");
    setRating(0);
  };

  const renderCardList = () => {
    const loggedInUser = useUserStore.getState().loggedInUser;
    if (loggedInUser) {
      return (
        <ul>
          {loggedInUser.collection.map((card) => (
            <li key={card.cardCode}>
              {card.cardCode} - {card.rate}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div>
      <h2>User Store Test Component</h2>
      <div>
        <h3>Add User</h3>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <div>
        <h3>Login/Logout</h3>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <h3>Add/Remove from Collection</h3>
        <input
          type="text"
          placeholder="Card Code"
          value={cardCode}
          onChange={(e) => setCardCode(e.target.value)}
        />
        <button onClick={handleAddToCollection}>Add to Collection</button>
        <button onClick={handleRemoveFromCollection}>
          Remove from Collection
        </button>
      </div>
      <div>
        <h3>Set Rating</h3>
        <input
          type="text"
          placeholder="Card Code"
          value={cardCode}
          onChange={(e) => setCardCode(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <button onClick={handleSetRating}>Set Rating</button>
      </div>
      <div>
        <h3>Card List</h3>
        {renderCardList()}
      </div>
    </div>
  );
};

export default RegisterPage;
