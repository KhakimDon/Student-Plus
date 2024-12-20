import {
  TButtonSizes,
  TButtonVariants,
} from "@/components/Base/Button/BaseButton";
import { TClassName } from "@/types/common";

export interface ButtonProps {
  variant?: TButtonVariants;
  size?: TButtonSizes;
  loading?: boolean;
  mainClass?: TClassName;
  iconPosition?: "left" | "right";
  text?: string | number;
  icon?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export type ButtonEmits = {
  (type: "click", event?: MouseEvent): void;
};

export interface TabItem {
  label?: string;
  value: string;
  icon?: string;
  iconName?: string;
  suffixText?: string;
}

export type TabProps = {
  list: TabItem[];
  variant?: TabVariants;
};

export type TabVariantKeys = {
  wrapperClass?: string;
  activeClass?: string;
  itemClass?: string;
  suffixClass?: string;
  itemActiveClass?: string;
};

export type TabVariants = "default" | "full" | "bordered";
