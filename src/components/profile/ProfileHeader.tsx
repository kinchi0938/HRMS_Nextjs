import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const ProfileHeader = () => {
  const { firstName, lastName } = useSelector(
    (state: RootState) =>
      state.employee.currentEmployee || { firstName: "", lastName: "" }
  );

  return (
    <h3 className="truncate text-3xl font-bold mb-5 max-w-[550px]">
      Profile of {firstName} {lastName}
    </h3>
  );
};
