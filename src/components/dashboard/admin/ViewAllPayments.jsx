import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";
import SinglePaymentRow from "./SinglePaymentRow";

const ViewAllPayments = () => {
  const {
    data: allPayments,
    isPending,
    error,
  } = useGetData({ apiRoute: "all-payments" });

  return (
    <InitialPageStructure
      pageName="Payments"
      pageTitle="All Successfull Payments"
      error={error}
      isPending={isPending}
      data={allPayments || []}
      emptyDataMsg="No Payments To Show!"
      totalName="Payment"
    >
      {/* Table section */}
      <TableViewStructure
        data={allPayments || []}
        tabCols={[
          "Transaction ID",
          "Time & Date",
          "User Name",
          "Amount",
          "Package",
          "Current Role",
        ]}
        actionBtnNumbers={0}
      >
        {allPayments &&
          allPayments.map((singlePayment, index) => (
            <SinglePaymentRow
              index={index}
              key={singlePayment._id}
              singlePayment={singlePayment}
            />
          ))}
      </TableViewStructure>
    </InitialPageStructure>
  );
};

export default ViewAllPayments;
