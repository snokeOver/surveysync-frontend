import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useData from "./useData";
import useSweetAlert from "./useSweetAlert";

const useUpdateData = () => {
  const queryClient = useQueryClient();
  const sAxios = useSAxios();
  const { setToastMsg, setActnBtnLoading } = useData();
  const makeAlert = useSweetAlert();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, apiName, payload }) => {
      const { data } = await sAxios.patch(`/api/${apiName}/${id}`, payload);
      return data;
    },
    onSuccess: (data, variables) => {
      const { itemName } = variables;
      setToastMsg(`suc ${itemName} updated successfully !`);
      setActnBtnLoading(false);

      // Invalidate queries or refetch data
      queryClient.invalidateQueries("my-surveys");
    },
    onError: (data, variables) => {
      const { itemName } = variables;
      setToastMsg(`err Failed to update this ${itemName} !`);
      setActnBtnLoading(false);
    },
  });

  const handleUpdateData = async (id, itemName, apiName, payload) => {
    console.log("Receiced APIName:", apiName);
    setActnBtnLoading(true);
    try {
      const result = await makeAlert(`Yes, Delete this ${itemName}!`);
      if (result.isConfirmed) {
        await mutateAsync({ id, itemName, apiName, payload });
      }
    } catch (err) {
      console.log(err.message);
      setActnBtnLoading(false);
    }
  };
  return handleUpdateData;
};

export default useUpdateData;
