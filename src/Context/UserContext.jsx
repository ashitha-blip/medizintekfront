import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/allAPIS";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  // const admin=sessionStorage.getItem("admin")
  const fetchUserDeatails = async () => {
    console.log("in function");

    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { authorization: `Bearer ${token}` };
      const response = await getUser(reqHeader);
      console.log(response, "res in user");

      setLoggedUser(response.data[0]);
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("admin") == "Admin") {
      setIsAdminLogged(true);
    }
    if (sessionStorage.getItem("existing_User_Id")) {
      fetchUserDeatails();
      setUserLoggedIn(true);
    }
  }, []);

  const value = {
    loggedUser,
    setLoggedUser,
    userLoggedIn,
    setUserLoggedIn,
    isAdminLogged,
    setIsAdminLogged,
    fetchUserDeatails,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
