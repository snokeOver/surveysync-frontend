import ButtonSpinner from "./ButtonSpinner";
import useData from "../../hooks/useData";

const ActionButton = ({ buttonText, isDisable }) => {
  const { pageLoading } = useData();

  return (
    <button
      disabled={isDisable}
      className="btn btn-outline border-primary  text-primary  py-3 rounded-2xl hover:bg-primary hover:text-gray-800 hover:border-primary w-full"
    >
      {pageLoading && <ButtonSpinner />}
      {buttonText}
    </button>
  );
};

export default ActionButton;
