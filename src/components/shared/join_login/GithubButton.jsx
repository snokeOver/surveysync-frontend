import { FaGithub } from "react-icons/fa";
const GithubButton = ({ btnTitle }) => {
  return (
    <button className="btn bg-transparent  border-primary hover:bg-none dark:hover:bg-none rounded-sm py-2 w-full ">
      <FaGithub className="text-xl" /> {btnTitle}
    </button>
  );
};

export default GithubButton;
