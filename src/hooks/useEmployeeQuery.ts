import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "@/api/employee/employee.api";
import { IEmployeeDTO } from "@/types/employee.type";

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => employeeApi.getEmployee(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
    staleTime: 60 * 1000,
  });
};
export const useUpdateEmployeeMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IEmployeeDTO) => employeeApi.updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
};
export const useDeleteEmployeeMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => employeeApi.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
};
