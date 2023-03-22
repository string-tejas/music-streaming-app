export const FullContainer = ({ children, className, ...other }) => {
  return (
    <div className={`w-screen h-screen bg-red-200 ${className}`} {...other}>
      {children}
    </div>
  );
};
