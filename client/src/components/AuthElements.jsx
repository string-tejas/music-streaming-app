import React from "react";

export const CardContainer = ({ className, children, ...other }) => {
  return (
    <div
      className={`w-11/12 md:w-[60%] bg-blue-800 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-[50%] flex flex-col md:flex-row ${className}`}
    >
      {children}
    </div>
  );
};

export const BrandInfo = ({ className, children, ...other }) => {
  return (
    <div
      className={`hidden md:flex min-h-[100px] md:min-h-[540px] md:w-[40%] rounded-t-lg md:rounded-tr-none md:rounded-l-lg ${className}`}
      {...other}
    >
      {children}
    </div>
  );
};

export const AuthTitle = ({ className, children, ...other }) => {
  return (
    <h1
      className={`text-4xl md:text-[42px] text-white md:pt-8 pb-2 text-center px-2 font-semibold ${className}`}
      {...other}
    >
      {children}
    </h1>
  );
};

export const AuthSubtitle = ({ className, children, ...other }) => {
  return (
    <p
      className={`md:text-[17px] text-sm text-white font-light md:p-4 p-2 text-center ${className}`}
      {...other}
    >
      {children}
    </p>
  );
};

export const AuthButton = ({ className, dark = false, children, ...other }) => {
  if (dark) {
    return (
      <button
        className={`${className} capitalize rounded-full min-w-[200px] md:min-w-[190px] text-center p-1 md:px-6 md:py-1 font-normal text-[16px] md:text-[18px] hover:bg-[#33a08c] hover:text-[#ffffff] hover:shadow-lg transition-all bg-[#3cb29c] border-2 border-[#3cb29c] text-white  active:border-[#5b6560] active:bg-[#287a6b] active:text-[13px] md:active:text-[16px]`}
        {...other}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={`capitalize rounded-full min-w-[100px] md:min-w-[190px] text-center p-1 md:px-6 md:py-2 font-normal text-sm md:text-[18px] hover:bg-white hover:text-[#3cb29c] hover:shadow-lg   transition-all bg-transparent border-2 border-white text-white ${className} active:border-[#ffffff] active:bg-[#cadfdc] active:text-[13px] md:active:text-[16px]`}
      {...other}
    >
      {children}
    </button>
  );
};

export const AuthFormContainer = ({
  className,
  children,
  onFormSubmit,
  ...other
}) => {
  return (
    <form
      onSubmit={onFormSubmit}
      className={`bg-white flex-1 rounded-lg md:rounded-l-none md:rounded-r-lg flex flex-col px-6 py-8 gap-1 md:gap-2 items-center ${className}`}
      {...other}
    >
      {children}
    </form>
  );
};

export const AuthInput = ({
  icon = "",
  value,
  onChange = () => {},
  placeholder = "Input",
  type = "text",
  ...others
}) => {
  return (
    <div className="flex items-center gap-2 px-3 py-[10px] bg-gray-100 mt-3">
      {icon}
      <input
        className="w-[90%] md:w-[260px] bg-transparent outline-none ml-3 text-[#828487] text-sm md:text-[19px] focus:text-black"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        {...others}
      />
    </div>
  );
};
