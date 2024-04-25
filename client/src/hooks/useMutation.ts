import { IAxiosError } from "./types";
import { useMutation } from "@tanstack/react-query";
import { serverAPI } from "../services/axios.service";
import { useNotificationHook } from "./useNotification";

export const useMutationHooks = <MutationResponse = any, MutationRequest = any>(
  path: string,
  method?: "post" | "put" | "delete" | "patch"
) => {
  method = method || "post";
  const notify = useNotificationHook();
  return useMutation<MutationResponse, IAxiosError, MutationRequest>({
    mutationFn: async (data: any) => {
      try {
        let response: any;
        if (method === "patch") {
          response = await serverAPI.patch(
            `${path}/${data?.id}`,
            data?.payload
          );
        } else if (method === "put") {
          response = await serverAPI.put(
            `${path}/${data?.id}`,
            data?.payload || {}
          );
        } else {
          response = await serverAPI.post(path, data);
        }
        return response;
      } catch (error: any) {
        console.log("error", error);
        if (error.response) {
          const err = error.response.data as IAxiosError;
          throw err;
        } else {
          throw error;
        }
      }
    },
    onSuccess(data: any) {
      if (data.data?.success) {
        notify.success("Success", data.data?.message);
      } else {
        notify.warning("Error", data.data?.message);
      }
    },
    onError(e) {
      const errors = e.error;
      if (Array.isArray(errors)) {
        errors.map((err: any) => {
          const path = err?.path?.toString();
          notify.error("Error", `${path} ${err.message}`);
        });
      } else {
        notify.error("Error", e.message);
      }
    },
  });
};
