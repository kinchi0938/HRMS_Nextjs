import { createApiClient } from "../base";
import { IUser } from "@/types/user.type";
import { CommentDTO, IComment } from "@/types/comment.type";
import { ApiResponse } from "@/types/api.type";

const api = createApiClient();

export const userApi = {
  // Get user profile
  getProfile: async (userId: string): Promise<ApiResponse<IUser>> => {
    const response = await api.get<ApiResponse<IUser>>(`/employee/${userId}`);
    return response;
  },

  // Create comment
  createComment: async (
    commentData: CommentDTO
  ): Promise<ApiResponse<IComment>> => {
    const response = await api.post<ApiResponse<IComment>>(
      "/comment",
      commentData
    );
    return response;
  },
};
