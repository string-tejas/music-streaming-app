import React from "react";

const SongContainer = ({ children, style, noBottomGap = false }) => {
    return (
        <div
            style={{
                width: "max(280px, 90%)",
                margin: "auto",
                display: "grid",
                paddingBottom: noBottomGap ? "0" : "8rem",
                ...style,
            }}
            className="grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-14 pb-8"
        >
            {children}
        </div>
    );
};

export default SongContainer;
