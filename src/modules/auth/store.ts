import { defineStore } from "pinia";

import { useApi } from "@/composables/useApi";
import router from "@/router";
import { IAuthTokens, IAuthUser } from "@/types/auth";
import { IFetchOptions } from "@/types/common";
import { ACCESS_ACTION, ACCESS_NAME } from "@/types/permission";

// import { $ResetPinia } from "@/utils/functions/common";

interface IState {
  tokens: {
    access?: string;
    refresh?: string;
  };
  user?: IAuthUser;
  preloader: boolean;
  accessPolices?: Record<ACCESS_NAME, ACCESS_ACTION[] | undefined>;
  oneId?: string | null;
  blockedTime: number;
}

export const useAuthStore = defineStore("auth", {
  state: (): IState => ({
    tokens: {},
    user: undefined,
    preloader: false,
    accessPolices: undefined,
    oneId: null,
    blockedTime: 0,
  }),
  getters: {
    isAuthenticated: (state) =>
      !!state.tokens?.access || !!state.tokens?.refresh,
    getTokens: (state) => state.tokens,
    hasUser: (state) => Object.keys(state.user || {}).length > 0,
    authUser: (state) => state.user,
  },
  actions: {
    initTokens() {
      const access = localStorage.getItem("access_token");
      const refresh = localStorage.getItem("refresh_token");
      if (access) this.tokens.access = access;
      if (refresh) this.tokens.refresh = refresh;
    },
    refreshToken() {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<Pick<IAuthTokens, "access">>("/auth/TokenRefresh/", {
            refresh: this.getTokens?.refresh,
          })
          .then((data) => {
            this.setTokens(data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout() {
      // $ResetPinia().all();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // return router.push({ name: "AuthLogin" });
    },
    setTokens(tokens: Partial<IAuthTokens>) {
      if (tokens?.access) {
        this.tokens.access = tokens.access;
        localStorage.setItem("access_token", tokens.access);
      }
      if (tokens?.refresh) {
        this.tokens.refresh = tokens.refresh;
        localStorage.setItem("refresh_token", tokens.refresh);
      }
    },
    getProfile(options?: Pick<IFetchOptions, "force">) {
      return new Promise((resolve, reject) => {
        if (!options?.force && this.hasUser) {
          resolve(this.user);
          return;
        }
        useApi()
          .$get<IAuthUser>("/users/GetProfile/")
          .then((data) => {
            this.user = data;
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    login(data: { username: string; password: string }) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post("/auth/login/", data)
          .then((data) => {
            this.setTokens(data);
            this.getProfile();
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
