import { TClassName } from "@/types/common";

export type TableStatusColors = "green" | "gray" | "red" | "yellow";

export interface TableHead {
  title: string;
  key: string;
  hasSort?: boolean;
  sortValue?: string;
}

export interface TableAction {
  label?: string | number;
  icon?: string;
  role?: boolean;
  class?: TClassName;
  event: string;
}

export interface TableStatusIndicator {
  show: boolean;
  key: string;
  colors: {
    label: string;
    value: string | boolean | number;
    color: TableStatusColors;
  }[];
}
