import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getIsLoggedIn,
  selectCurrentToken,
  selectCurrentUser,
} from "./authSlice";
import { getGlobal } from "../../services/global";

const RequireAuth = () => {
  const token = getGlobal("access_token");
  //const user = useSelector(selectCurrentUser)
  const isLoggedIn = getGlobal("isLoggedIn");
  const location = useLocation();
  //console.log("Current token: ", token);
  //console.log("Current user: ", user)
  // console.log("IsLoggedIn : ", isLoggedIn)
  return token && isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
