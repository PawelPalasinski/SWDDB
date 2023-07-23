// Login: between 3 and 20 characters

export const isValidLogin = (login) => {
  const loginRegex = /^[a-zA-Z0-9]{3,20}$/;
  return loginRegex.test(login);
};

// Password: at least 1 uppercase letter and number

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

export const isExistingUser = (users, login) => {
  return users.some((user) => user.login === login);
};
