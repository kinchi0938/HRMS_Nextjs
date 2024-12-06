import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { checkAuth } from "@/store/features/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return { isAuthenticated, token, user };
};
