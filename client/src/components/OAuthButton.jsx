import React from "react";

function OAuthButton({
  className = "",
  icon = null,
  children,
  onClick = (e) => {},
  style,
}) {
  return (
    <button
      onClick={(e) => onClick(e)}
      style={style || {}}
      className={
        className +
        " flex items-center justify-center gap-2 px-4 py-2 rounded-md border-[#ccc] border-2 active:border-[#636363] bg-white cursor-pointer hover:bg-[#eee] hover:shadow-md duration-200 ease-in-out transition-all select-none "
      }
    >
      {icon}
      {children}
    </button>
  );
}

export default OAuthButton;
