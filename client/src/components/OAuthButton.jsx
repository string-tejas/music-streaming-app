import React from "react";

function OAuthButton({ icon = null, children }) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border-[#ccc] border-2 active:border-[#777] bg-white cursor-pointer hover:bg-[#eee] hover:shadow-md duration-200 ease-in-out transition-all  select-none ">
      {icon}
      {children}
    </div>
  );
}

export default OAuthButton;
