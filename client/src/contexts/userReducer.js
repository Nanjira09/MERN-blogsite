const userReducer = (state, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload));
      // return { user: action.payload };
      return action.payload;
    case "logout":
      localStorage.removeItem("user");
      return null;
    case "update":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
