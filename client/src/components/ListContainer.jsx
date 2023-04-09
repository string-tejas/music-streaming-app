import React from "react";

const ListContainer = ({ children, className }) => {
    return <div className={className + " px-6  pb-8"}>{children}</div>;
};

export default ListContainer;
