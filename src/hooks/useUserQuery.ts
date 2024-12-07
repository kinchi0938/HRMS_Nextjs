import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { userApi } from "@/api/user/userApi";
import { IUser } from "@/types/user.type";

// Custom hooks for user-related queries
export const useUserProfile = (userId: string): UseQueryResult<IUser> => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => userApi.getProfile(userId).then((response) => response.data),
  });
};
