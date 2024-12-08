"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { useEmployee } from "@/hooks/useEmployeeQuery";
import { employeeSlice } from "@/store/features/employeeSlice";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { ProfileComments } from "@/components/profile/ProfileComments";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { data: employee, isLoading, isError } = useEmployee(id!);

  useEffect(() => {
    if (employee) {
      dispatch(employeeSlice.actions.setEmployee(employee));
    }
  }, [employee, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>User not found</div>;

  return (
    <div className="p-10 h-auto w-screen flex flex-col items-center bg-gray-100">
      <ProfileHeader />
      {employee ? <ProfileInfo employee={employee} /> : <></>}
      <ProfileActions />
      <ProfileComments />
    </div>
  );
}
