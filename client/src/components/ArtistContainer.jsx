import React from "react";

const ArtistContainer = ({ children, style, noBottomGap = false }) => {
    return (
        <div
            style={{
                width: "max(280px, 90%)",
                margin: "auto",
                display: "grid",
                paddingBottom: noBottomGap ? "0" : "8rem",
                ...style,
            }}
            className="grid-cols-1 md:grid-cols-4 justify-items-center lg:grid-cols-6 gap-x-12 gap-y-6 pb-8"
        >
            {children}
        </div>
    );
};

export default ArtistContainer;
