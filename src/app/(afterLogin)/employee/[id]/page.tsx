"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import ProfileInfo from "@/components/ProfileInfo";
import { useEmployee } from "@/hooks/useEmployeeQuery";
import CommentSection from "@/components/CommentSection";
import { useCreateCommentMutation } from "@/hooks/useCreateCommentMutation";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data: employee, isLoading, isError, error } = useEmployee(id!);
  const handleDelete = async () => {};

  const createCommentMutation = useCreateCommentMutation();

  const handleCommentSubmit = (text: string) => {
    createCommentMutation.mutate({
      text,
      username: employee!.username,
      author: user!.username,
    });
    router.refresh();
  };

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
          onEdit={() => router.push(`/employee/edit/${id}`)}
          onDelete={() => setShowDeleteModal(true)}
        />
      ) : (
        <></>
      )}

      <CommentSection
        comments={employee?.comments}
        onSubmitComment={handleCommentSubmit}
        isSubmitting={createCommentMutation.isPending}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
