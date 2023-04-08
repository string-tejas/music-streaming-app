import React, { useEffect, useState } from "react";
import { Heading } from "../Landing";
import SectionHeading from "../../components/SectionHeading";
import { useStateValue } from "../../context/StateProvider";
import "./RequestArtist.css";
import { requestArtist } from "../../api";
import AlertError from "../../components/AlertError";
import AlertSuccess from "../../components/AlertSuccess";
import images from "../../assets/images";

const RequestArtist = () => {
    const [{ user }] = useStateValue();
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);

    console.log("user : ", user);

    const onSubmit = () => {
        const data = {
            user: user._id,
            isApproved: false,
        };

        console.log("data obj :", data);

        requestArtist(data)
            .then((data) => setsuccess(true))
            .catch((error) => seterror(true));
    };

    return (
        <>
            <Heading />
            <div
                className="h-[calc(100vh-52px)]  box-border"
                style={{
                    background: `linear-gradient(rgba(75, 75, 75, 0.5), rgba(0, 0, 0, 0.954)), url(${images.artist})`,
                    backgroundSize: "cover",
                }}
            >
                <SectionHeading style={{ marginTop: "0px", paddingTop: "40px", color: "lightblue", fontWeight: "500" }}>
                    Join the community of Amazing Artists
                </SectionHeading>
                {success ? <AlertSuccess msg="Artist request has been sent" /> : <> </>}
                {error ? <AlertError msg="Error in sending request" /> : <> </>}

                <div className="ml-8 md:ml-16 bg-white max-w-[300px] md:max-w-[500px] px-8 py-6 rounded-lg mt-12">
                    <h3 className="artist-content">
                        {" "}
                        <b>Name :</b> {user && user.name ? user.name : ""}{" "}
                    </h3>
                    <h3 className="artist-content">
                        {" "}
                        <b>Current Role :</b> {user && user.role ? user.role : ""}{" "}
                    </h3>
                    <h3 className="artist-content">
                        {" "}
                        <b>Email </b>: {user && user.email ? user.email : ""}{" "}
                    </h3>
                    <br />
                    <button className="submit-btn" onClick={onSubmit}>
                        Submit Request{" "}
                    </button>
                </div>
            </div>
        </>
    );
};

export default RequestArtist;
