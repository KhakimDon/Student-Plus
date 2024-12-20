import { TabVariantKeys, TabVariants } from "@/types/components";

export const tabVariants: Record<TabVariants, TabVariantKeys> = {
  default: {
    wrapperClass: "bg-gray-6 p-1 rounded-lg",
    suffixClass: "",
    itemClass: "py-2 px-4",
    itemActiveClass: "",
    activeClass:
      "bg-white shadow-tab-item w-full !h-[calc(100%-8px)] !top-1/2 -translate-y-1/2 !rounded-lg",
  },
  full: {
    wrapperClass: "",
    suffixClass: "bg-red/10 border border-red/40",
    itemClass: "py-4 px-2 rounded-md w-full",
    activeClass: "h-0.5  -bottom-px bg-yellow-dark",
    itemActiveClass: "text-yellow-dark",
  },
  bordered: {
    wrapperClass: "border-b-2 border-yellow-dark !w-full max-w-xl",
    activeClass:
      "!h-full before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:rounded-xl before:rounded-b-none before:h-full before:w-[calc(100%-3px)] before:!bg-white rounded-t-xl rounded-b-none !bg-yellow-dark",
    itemClass: "py-3",
    itemActiveClass: "",
    suffixClass: "",
  },
};
