import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IAxiosError } from "./types";
import { serverAPI } from "../services/axios.service";

export const useQueryHook = (
  key: any,
  options?: UseQueryOptions<any, IAxiosError, any, any[]>
) => {
  return useQuery({
    queryKey: options?.queryKey ?? [key],
    queryFn: async () => {
      try {
        const response = await serverAPI.get(key);
        return response.data.data;
      } catch (err: any) {
        console.log("Error in useQuery Hook", err);
        throw err;
      }
    },
    ...options,
  });
};
