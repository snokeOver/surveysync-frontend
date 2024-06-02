const Container = ({ children, nopad }) => {
  return (
    <div
      className={`max-w-[1620px]  mx-auto xl:px-20 md:px-10 sm:px-2  bg-base-300  ${
        nopad !== "true" ? "md:py-10 py-5" : "py-0"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
