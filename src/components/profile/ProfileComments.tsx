import { useAuth } from "@/hooks/useAuth";
import { useCreateCommentMutation } from "@/hooks/useCreateCommentMutation";
import { useSelector } from "react-redux";
import CommentSection from "../CommentSection";
import { RootState } from "@/store/store";

export const ProfileComments = () => {
  const { user } = useAuth();
  const { username, comments } = useSelector(
    (state: RootState) =>
      state.employee.currentEmployee || { username: "", comments: [] }
  );
  const createCommentMutation = useCreateCommentMutation();

  const handleCommentSubmit = (text: string) => {
    createCommentMutation.mutate({
      text,
      username,
      author: user!.username,
    });
  };

  return (
    <CommentSection
      comments={comments}
      onSubmitComment={handleCommentSubmit}
      isSubmitting={createCommentMutation.isPending}
    />
  );
};
