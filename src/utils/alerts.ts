import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const alert = {
	success: (message: string) => toast.success(message),
	error: (message: string) => toast.error(message),
	info: (message: string) => toast.info(message),
	warning: (message: string) => toast.warning(message),
};
