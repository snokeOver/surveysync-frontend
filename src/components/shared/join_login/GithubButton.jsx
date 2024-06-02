import { FaGithub } from "react-icons/fa";
import useData from "../../../hooks/useData";
import ButtonSpinner from "../ButtonSpinner";
const GithubButton = ({ btnTitle }) => {
  const { gitBtnLoading } = useData();
  return (
    <button
      disabled={gitBtnLoading}
      className="btn bg-transparent  border-primary hover:bg-none dark:hover:bg-none rounded-sm py-2 w-full "
    >
      {gitBtnLoading && <ButtonSpinner />} <FaGithub className="text-xl" />
      {btnTitle}
    </button>
  );
};

export default GithubButton;
