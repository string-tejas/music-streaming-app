import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../config/firebase.config";

const authContext = createContext();

const useAuth = () => {
  return useContext(authContext);
};

const AuthProvider = ({ children }) => {
  const firebaseAuth = getAuth(app);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log("AuthContext", userCred);
        setAuth(true);
        window.localStorage.setItem("auth", "true");
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
      }
    });
  }, []);

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
