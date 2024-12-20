import { RouteLocation } from "vue-router";

interface IMenuConstructor {
  heading: string;
  route: RouteLocation;
  svgIcon?: string;
  count?: number;
}

export interface IMenu extends IMenuConstructor {
  svgIcon: string;
  svgIconTag?: string;
  sub?: ISubMenu[];
  access?: string;
  show?: boolean;
}

export type ISubMenu = IMenuConstructor;

export const menu = (): IMenu[] => [
  {
    heading: "dashboard",
    svgIcon: "icon-presention-chart",
    route: { name: "Dashboard" },
  },
  {
    heading: "users",
    svgIcon: "icon-user",
    route: { name: "Users" },
    sub: [
      {
        heading: "physics_user",
        route: { name: "Users" },
        count: 123,
      },
    ],
  },
];
