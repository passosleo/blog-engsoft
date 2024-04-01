import { useLocalStorage } from "@/frontend/hooks/useLocalStorage";
import { AxiosInstance } from "axios";

export function setRequestAuth(request: AxiosInstance) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getStoredData } = useLocalStorage();
  const session = getStoredData("session");
  const token = session?.token;

  if (token) {
    request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}
