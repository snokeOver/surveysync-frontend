import useGetData from "../../../hooks/useGetData";
import ChartView from "../shared/ChartView";

import InitialPageStructure from "../shared/InitialPageStructure";

const SurveyorStatistics = () => {
  const {
    data: userStatistics,
    isPending,
    error,
  } = useGetData({ apiRoute: "user-statistics" });

  return (
    <InitialPageStructure
      pageName="Dashboard"
      pageTitle="Surveyor Statistics"
      error={error}
      isPending={isPending}
      emptyDataMsg="Your chart is empty!"
    >
      <ChartView userStatistics={userStatistics} />
    </InitialPageStructure>
  );
};

export default SurveyorStatistics;
