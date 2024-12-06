import { useQuery } from "@tanstack/react-query";
import { employeeApi } from "@/api/employee/employee.api";

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => employeeApi.getEmployee(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};
