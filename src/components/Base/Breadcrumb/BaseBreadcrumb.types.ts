import { RouteLocationRaw } from "vue-router";

export interface IRoute {
  name: string;
  route?: RouteLocationRaw;
  loading?: boolean;
  target?: boolean;
}
