interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-screen flex justify-center items-center bg-gray-400 bg-opacity-50">
      <div className="relative p-5 bg-white">
        <h3 className="mb-8 block text-2xl font-medium text-[#07074D]">
          Are you Sure?
        </h3>
        <div className="flex">
          <button
            className="mx-5 rounded-md bg-blue-500 hover:bg-blue-400 max-w-sm w-full py-3 px-5 mb-5 text-sm font-semibold text-white outline-none"
            onClick={onClose}
          >
            No, I don't want to Delete
          </button>
          <button
            className="mx-5 rounded-md bg-red-500 hover:bg-red-400 max-w-sm w-full py-3 px-5 mb-5 text-sm font-semibold text-white outline-none"
            onClick={onConfirm}
          >
            Yes, I want to Delete
          </button>
        </div>
      </div>
    </div>
  );
}
