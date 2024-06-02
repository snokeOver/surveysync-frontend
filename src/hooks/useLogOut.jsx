import useAuth from "./useAuth";
import useData from "./useData";

const useLogOut = () => {
  const { setToastMessage, setPageLoading } = useData();
  const { logOut, setUser } = useAuth();

  const userLogOut = async () => {
    setPageLoading(true);
    try {
      const result = await logOut();
      setToastMessage("Log Out Success");
      setUser(null);
    } catch (err) {
      console.error("Log out error:", err.message);
      setToastMessage("Log Out Failed");
    } finally {
      setPageLoading(false);
    }
  };

  return userLogOut;
};

export default useLogOut;
