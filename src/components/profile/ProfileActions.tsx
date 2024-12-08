import { useDeleteEmployeeMutation } from "@/hooks/useEmployeeQuery";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteConfirmModal from "../DeleteConfirmModal";

export const ProfileActions = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteMutation = useDeleteEmployeeMutation(id);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      router.push("/employee");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[550px] h-auto rounded-xl bg-white shadow-lg mt-2 pt-3">
      <div className="flex flex-row items-center justify-center">
        <button
          className="flex justify-center mx-5 rounded-md bg-blue-500 hover:bg-blue-400 max-w-sm w-full py-3 px-5 mb-5 text-sm font-semibold text-white outline-none"
          onClick={() => router.push(`/employee/edit/${id}`)}
        >
          Edit
        </button>
        <button
          className="mx-5 rounded-md bg-red-500 hover:bg-red-400 max-w-sm w-full py-3 px-5 mb-5 text-sm font-semibold text-white outline-none"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </button>
      </div>
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
};
