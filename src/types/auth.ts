import { Image } from "@/types/common";

export interface IAuthTokens {
  id: string;
  access: string;
  refresh: string;
}

type TUserRole = "admin" | "review_moderator";

export interface IAuthUser {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  role: TUserRole;
  avatar: Image;
  birth_date: string | null;
  phone: string | null;
  username: string;
  email: string;
  gender: "male" | "female";
  country_code: string | null;
  devices_count: number;
  is_notification_enabled: boolean;
  is_verified: boolean;
  language: string;
  left_time_to_change_username: string | null;
  default_account_id: string | null;
  auth_source: "internal" | "external";
  has_changed_password: boolean;
}

export interface IAccess {
  id: string;
}

export interface IOneId {
  one_id_url: string;
}
