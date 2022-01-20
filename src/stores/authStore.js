import { makeAutoObservable } from "mobx";
import decode from "jwt-decode";
import api from "./api";

class AuthStore {
  user = null;
  constructor() {
    makeAutoObservable(this, {});
  }
  setUser = (token) => {
    localStorage.setItem("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };
  signUp = async (user) => {
    try {
      const response = await api.post("/signup", user);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };
  signIn = async (user) => {
    try {
      const response = await api.post("/signin", user);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };
  signOut = () => {
    this.user = null;
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
  };

  checkForToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // const currentTime = Date.now() // time right now
      // decode(token) gives you the user with expiration time
      // user.exp
      if (decode(token).exp > Date.now()) {
        this.setUser(token);
      }
    } else {
      this.signOut(token);
      console.log("hello");
    }
  };
}
const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
