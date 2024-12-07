import { userApi } from "@/api/user/userApi";
import { CommentDTO } from "@/types/comment.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  return useMutation({
    mutationFn: async (commentData: CommentDTO) => {
      const response = await userApi.createComment(commentData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch employee query
      queryClient.invalidateQueries({
        queryKey: ["employee", id],
      });
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
      // Add additional error handling if needed
    },
  });
};
