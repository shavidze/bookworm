import api from "../api";
import { userLoggedIn } from "./auth";

export const signup = data => dispatch =>
  api.user.signUp(data).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });
