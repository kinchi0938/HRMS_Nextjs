import { setCredentials } from "@/store/features/authSlice";
import { getLocalStorage } from "@/utils/localStorage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getLocalStorage("accessToken");
    const user = JSON.parse(getLocalStorage("user") || "null");
    if (token && user) {
      dispatch(setCredentials({ user, token }));
    }
    setMounted(true);
  }, [dispatch]);

  return mounted ? children : null;
}
