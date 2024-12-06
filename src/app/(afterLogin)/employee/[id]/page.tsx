"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  useUserProfile,
  useDeleteUser,
  useCreateComment,
} from "@/hooks/useUserQuery";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import ProfileInfo from "@/components/ProfileInfo";
import CommentSection from "@/components/CommentSection";
import { authApi } from "@/api/auth/auth.api";
import { useQuery } from "@tanstack/react-query";
import { employeeApi } from "@/api/employee/employee.api";
import { useEmployee } from "@/hooks/useEmployeeQuery";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data: user, isLoading: isUserLoading } = useUserProfile(id as string);
  const deleteUserMutation = useDeleteUser();
  const createCommentMutation = useCreateComment(id as string);

  const { data: employee, isLoading, isError, error } = useEmployee(id!);

  const handleDelete = async () => {};

  const handleCommentSubmit = async (text: string) => {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-10 h-auto w-screen flex flex-col items-center bg-gray-100">
      <h3 className="truncate text-3xl font-bold mb-5 max-w-[550px]">
        Profile of {employee?.firstName} {employee?.lastName}
      </h3>

      {employee ? (
        <ProfileInfo
          employee={employee}
          onEdit={() => router.push(`/edit/${id}`)}
          onDelete={() => setShowDeleteModal(true)}
        />
      ) : (
        <></>
      )}
      {/* 
      <CommentSection
        comments={user.comments}
        onSubmitComment={handleCommentSubmit}
        isSubmitting={createCommentMutation.isPending}
      /> */}

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
