import React from "react";
import instance from "../axiosInstace";
import { getIsLoggedIn, selectCurrentToken } from "../features/auth/authSlice";
import { getGlobal, setGlobal } from "./global";
import { GET_USER_API, LOGIN_API } from "./urlUtils";

class UserService {
  login(user) {
    return instance.post(LOGIN_API, user);
  }
  getUserToken(result, isLoggedIn) {
    let data = result?.data;
    data.isLoggedIn = isLoggedIn;
    //let _obj = data;
    //console.log("Test User Info: ", result?.data.access_token);
    setGlobal(data);
    //console.log("Test User token: ", getGlobal("access_token"));
  }

  getUserInfo(){
    return instance.get(GET_USER_API).then((res) => res);
  }

  // authHeader(){
  // const token = useSelector(selectCurrentToken);
  // const isLoggedIn = useSelector(getIsLoggedIn);
  //     if (isLoggedIn && token) {
  //     return token ;
  //     } else {
  //     return ;
  //     }
  // }
}

export default new UserService();
