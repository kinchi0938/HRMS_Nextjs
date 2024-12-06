import {
  useMutation,
  useQuery,
  UseQueryResult,
  QueryClient,
} from "@tanstack/react-query";
import { userApi } from "@/api/user/userApi";
import { IUser } from "@/types/user.type";

// Query Keys
export const userKeys = {
  all: ["users"] as const,
  profile: (id: string) => [...userKeys.all, "profile", id] as const,
  comments: (userId: string) => [...userKeys.all, "comments", userId] as const,
};

// Custom hooks for user-related queries
export const useUserProfile = (userId: string): UseQueryResult<IUser> => {
  return useQuery({
    queryKey: userKeys.profile(userId),
    queryFn: () => userApi.getProfile(userId).then((response) => response.data),
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId: string) => userApi.deleteUser(userId),
  });
};

const queryClient = new QueryClient();

export const useCreateComment = (userId: string) => {
  return useMutation({
    mutationFn: (commentData: {
      userid: string;
      username: string;
      text: string;
      author: string;
    }) => userApi.createComment({ ...commentData, userid: userId }),
    // Invalidate and refetch user profile after comment creation
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.profile(userId) });
    },
  });
};
