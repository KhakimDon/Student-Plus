import {BaseToast} from "@/components/Base";
import useToast from "vue-toastification";

export const useCustomToast = () => {
    const toast = useToast()

    const showToast = (
        title: string,
        type: "success" | "error" | "warning" | "info"
    ) => {
        toast({
            component: BaseToast,
            props: {
                title,
                type,
            },
        });
    };

    return {showToast};
};
