import { getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

const useAuth = () => {
  return useContext(authContext);
};

const AuthProvider = ({ children }) => {
  const firebaseAuth = getAuth();
  const navigate = useNavigate();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log("AuthContext", token);
        });
        setAuth(true);
        window.localStorage.setItem("auth", "true");
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { useAuth, AuthProvider };
