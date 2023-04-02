import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NeedAuth = ({ children }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate("/");
        }
    }, [auth, navigate]);

    return children;
};

export default NeedAuth;
