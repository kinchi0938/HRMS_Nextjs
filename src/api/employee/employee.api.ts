import { createApiClient } from "../base";
import { IEmployee } from "@/types/employee.type";

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

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
  // Delete Employee
  deleteEmployee: async (empolyeeId: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(
      `/employee/${empolyeeId}`
    );
    return response;
  },
};
