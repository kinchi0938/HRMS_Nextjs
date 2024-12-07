import { ApiResponse } from "@/types/api.type";
import { createApiClient } from "../base";
import { IEmployee, IEmployeeDTO } from "@/types/employee.type";

const api = createApiClient();

export const employeeApi = {
  getEmployeeList: async () => {
    const response = await api.get<IEmployee[]>("/employee");
    return response;
  },
  getEmployee: async (id: string) => {
    const response = await api.get<IEmployee>(`/employee/${id}`);
    return response;
  },
  updateEmployee: async (id: string, data: IEmployeeDTO) => {
    const response = await api.put<IEmployeeDTO>(`/employee/edit/${id}`, data);
    return response;
  },
  deleteEmployee: async (empolyeeId: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(
      `/employee/${empolyeeId}`
    );
    return response;
  },
};
