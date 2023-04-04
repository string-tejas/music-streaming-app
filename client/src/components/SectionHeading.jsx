import React from "react";

const SectionHeading = ({ children, style }) => {
    return (
        <h1 className="text-2xl md:text-3xl flex items-center font-semibold mb-4 ml-8 mt-6 md:ml-20" style={style}>
            {children}
        </h1>
    );
};

export default SectionHeading;
