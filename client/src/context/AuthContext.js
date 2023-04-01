import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { validateUser } from "../api";
import { app } from "../config/firebase.config";
import { actionType } from "./reducer";
import { useStateValue } from "./StateProvider";

const authContext = createContext();

const useAuth = () => {
  return useContext(authContext);
};

const AuthProvider = ({ children }) => {
  const firebaseAuth = getAuth(app);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  // eslint-disable-next-line no-unused-vars
  const [_, dispatch] = useStateValue();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          validateUser(token)
            .then((data) => {
              dispatch({
                type: actionType.SET_USER,
                user: data.user,
              });
            })
            .catch((e) => console.log(e));
        });
        setAuth(true);
      } else {
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        setAuth(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem("auth", auth ? "true" : "false");
  }, [auth]);

  return (
    <authContext.Provider
      value={{
        auth,
        setAuth,
        firebaseAuth,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { useAuth, AuthProvider };
