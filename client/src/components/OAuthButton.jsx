import React from "react";

function OAuthButton({ icon = null, children }) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all select-none">
      {icon}
      {children}
    </div>
  );
}

export default OAuthButton;
