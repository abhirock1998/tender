import { toast } from "react-toastify";

export const useNotificationHook = () => {
  const notification = {
    success: (title: string, message?: string) => {
      toast.success(message ? message : title, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
    warning: (title: string, message?: string) => {
      toast.warning(message ? message : title, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
    info: (title: string, message?: string) => {
      toast.info(message ? message : title, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
    error: (title: string, message?: string) => {
      toast.error(message ? message : title, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  };
  return notification;
};
