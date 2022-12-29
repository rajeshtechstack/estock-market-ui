import axios from "axios";
import { useSelector, useStore } from "react-redux";
import { getIsLoggedIn, selectCurrentToken } from "./features/auth/authSlice";
import { getGlobal } from "./services/global";
import store from "./services/store";

const instance = axios.create({
  baseURL: "http://44.198.58.248:2000/api/v1.0",
});

function listener() {
  // const {token} = useSelector(selectCurrentToken);
  // const {isLoggedIn} = useSelector(getIsLoggedIn);
  let token = getGlobal("access_token");
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

instance.interceptors.request.use(
  (request) => {
    const token = getGlobal("access_token");

    if (token) {
      // console.log("Test axios token :", getGlobal("access_token"));
      request.headers["Authorization"] = `Bearer ${token}`;
    }

    return request;
  },

  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
