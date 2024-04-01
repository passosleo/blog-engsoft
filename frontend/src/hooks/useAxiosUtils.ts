import Axios, { AxiosResponse } from "axios";
import { HOST } from "@/frontend/services/router";
import { CustomAxiosError } from "@/frontend/services/types";
import { setRequestAuth } from "@/utils/functions/request";
import { toast } from "react-toastify";

type Props = {
  filePath: string;
  filename: string;
  withAuth?: boolean;
};

export function useAxiosUtils() {
  function handleDownload({ filePath, filename, withAuth = true }: Props) {
    const request = Axios.create({
      baseURL: HOST,
      headers: { responseType: "blob" },
    });

    if (withAuth) setRequestAuth(request);

    request.get(filePath).then((response: AxiosResponse) => {
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  function handleAxiosError(error: unknown) {
    const messageError = "Algo deu errado";
    const typedError = error as CustomAxiosError;
    const responseData = typedError.response?.data;

    const responseError = (responseData && responseData.error) as string;

    const descriptionError =
      responseError && typeof responseError === "string"
        ? responseError
        : messageError;

    toast.error(descriptionError);

    return { descriptionError };
  }

  return { handleAxiosError, handleDownload };
}
