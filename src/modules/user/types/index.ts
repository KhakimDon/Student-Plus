import { TImages } from "@/types/common";

export type UserSourceType = "web" | "android" | "ios";

export type UserSource = {
  id: number;
  device_type: UserSourceType;
  source: string;
  icon: string | null;
};

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  avatar: TImages;
  phone: string;
  pinfl: string;
  birth_date: string;
  nationality: "001" | string;
  gender: string;
  place_of_birth: string;
  place_of_living: string;
  auth_source: string;
  email: string;
  deals_count: number;
  is_active: boolean;
  is_verified: boolean;
  is_expert: boolean;
  date_joined: string;
  device: UserSource;
}
