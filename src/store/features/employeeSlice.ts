import { IEmployee } from "@/types/employee.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
  currentEmployee: IEmployee | null;
  loading: boolean;
  error: string | null;
}

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    currentEmployee: null,
    loading: false,
    error: null,
  } as EmployeeState,
  reducers: {
    setEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.currentEmployee = action.payload;
    },
    addComment: (state, action) => {
      if (state.currentEmployee) {
        state.currentEmployee.comments.push(action.payload);
      }
    },
  },
});

export const { setEmployee, addComment } = employeeSlice.actions;
export default employeeSlice.reducer;
