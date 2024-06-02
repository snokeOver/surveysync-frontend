const PrimaryButton = ({ text }) => {
  return (
    <button className="btn  py-2  md:py-3 md:px-7 rounded-sm text-primary border-primary bg-transparent hover:bg-primary hover:text-gray-100 dark:hover:border-primary">
      {text}
    </button>
  );
};

export default PrimaryButton;