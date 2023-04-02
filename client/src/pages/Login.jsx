import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiMail } from "react-icons/fi";
import { BiLock } from "react-icons/bi";
import OAuthButton from "../components/OAuthButton";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FullContainer } from "../components/Scaffold";
import {
    AuthButton,
    AuthFormContainer,
    AuthInput,
    AuthSubtitle,
    AuthTitle,
    BrandInfo,
    CardContainer,
} from "../components/AuthElements";
import images from "../assets/images";

const Login = () => {
    const provider = new GoogleAuthProvider();
    const { setAuth, firebaseAuth } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const loginWithEmailPassword = async () => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCred) => {
                console.log("Login", userCred);
                setAuth(true);
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
                setMessage(error.message);
                setAuth(false);
            });
    };

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCredentials) => {
            if (userCredentials) {
                window.localStorage.setItem("auth", "true");
                setAuth(true);
            }
        });
    };

    return (
        <FullContainer style={{ background: `url(${images.wavyBg})` }}>
            <CardContainer>
                <BrandInfo
                    style={{ background: `rgb(7 65 159) url(${images.pattern}) ` }}
                    className={"flex flex-col items-center justify-center bg-[rgb(59 130 246)]"}
                >
                    <AuthTitle style={{ textShadow: "2px 0 0 black" }}>Welcome Back!</AuthTitle>
                    <AuthSubtitle
                        style={{
                            fontWeight: "500",
                            border: "2px dotted white",
                            padding: "8px",
                            margin: "13px",
                        }}
                    >
                        Unleash the Beat with Just One Click! <br /> Login to Your Music World!
                    </AuthSubtitle>
                    <AuthSubtitle>Don't have an account ?</AuthSubtitle>
                    <Link to="/register">
                        <AuthButton style={{ letterSpacing: "1.3" }}>Register</AuthButton>
                    </Link>
                </BrandInfo>
                <AuthFormContainer
                    onFormSubmit={(e) => {
                        e.preventDefault();
                        loginWithEmailPassword();
                    }}
                >
                    <AuthTitle style={{ color: "rgb(59 130 246)" }}>Login</AuthTitle>

                    <span className="text-gray-600 text-[15px]  mb-3">Enter your credentails:</span>

                    <AuthInput
                        icon={<FiMail style={{ color: "#9ca3af", fontSize: "18px" }} />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={"Email"}
                        required
                    />
                    <AuthInput
                        icon={<BiLock style={{ color: "#9ca3af", fontSize: "20px" }} />}
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={"Password"}
                        required
                    />
                    <AuthButton dark className="mt-4" type="submit" onClick={loginWithEmailPassword}>
                        Submit
                    </AuthButton>

                    <span className="text-gray-600 text-[15px] mb-1">Or</span>

                    <OAuthButton
                        style={{
                            borderRadius: "200px",
                            padding: "6px 14px",
                            margin: "2px 0px 16px 0px",
                        }}
                        onClick={loginWithGoogle}
                        icon={<FcGoogle />}
                    >
                        Sign in with Google
                    </OAuthButton>
                    <span className="text-gray-600 text-[15px] mb-3 block md:hidden">
                        Don't have an account ?{" "}
                        <Link to="/register" className="text-blue-600">
                            Register
                        </Link>
                    </span>
                    {message}
                </AuthFormContainer>
            </CardContainer>
        </FullContainer>
    );
};

export default Login;
