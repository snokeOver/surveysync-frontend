import useGetData from "../../../hooks/useGetData";
import ChartView from "../shared/ChartView";
import InitialPageStructure from "../shared/InitialPageStructure";

const UserStatistics = () => {
  const {
    data: userStatistics,
    isPending,
    error,
  } = useGetData({ apiRoute: "user-statistics" });

  return (
    <InitialPageStructure
      pageName="Dashboard"
      pageTitle="User Statistics"
      error={error}
      isPending={isPending}
      emptyDataMsg="Your chart is empty!"
    >
      <ChartView userStatistics={userStatistics} />
    </InitialPageStructure>
  );
};

export default UserStatistics;
