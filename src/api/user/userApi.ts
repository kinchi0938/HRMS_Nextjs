import { createApiClient } from "../base";
import { IUser } from "@/types/user.type";
import { IComment } from "@/types/comment.type";

interface CommentDTO {
  userid: string;
  text: string;
  author: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}
const api = createApiClient();

export const userApi = {
  // Get user profile
  getProfile: async (userId: string): Promise<ApiResponse<IUser>> => {
    const response = await api.get<ApiResponse<IUser>>(`/users/${userId}`);
    return response;
  },

  // Delete user
  deleteUser: async (userId: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(`/users/${userId}`);
    return response;
  },

  // Create comment
  createComment: async (
    commentData: CommentDTO
  ): Promise<ApiResponse<IComment>> => {
    const response = await api.post<ApiResponse<IComment>>(
      "/comments",
      commentData
    );
    return response;
  },
};
