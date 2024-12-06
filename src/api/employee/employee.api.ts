import { createApiClient } from "../base";
import { IEmployee } from "@/types/employee.type";

const api = createApiClient();

export const employeeApi = {
  getEmployeeList: async () => {
    const response = await api.get<IEmployee[]>("/employee");
    return response;
  },
  getEmployee: async () => {
    const response = await api.get<IEmployee>(`/employee`);
    return response;
  },
};
