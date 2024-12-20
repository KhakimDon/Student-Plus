import { IImage, IUserProfile, TImages } from "@/types/common";

export interface IRegion {
  id: string;
  name: string;
  soato: string;
}

export interface IDistrict {
  id: string;
  name: string;
  region_id: string;
  soato: string;
}

export interface ICompanyCategory {
  id: string;
  title: string;
  icon: TImages;
  parent: {
    id: string;
    title: string;
    icon: TImages;
    parent_id: string;
  };
}

export interface ICompanyCategoryParams {
  parent: string;
  parent__isnull: boolean;
  search: string;
  limit: number;
  offset: number;
}

export interface ICompany {
  id: string;
  name: string;
  brand_logo: TImages;
  categories: ICompanyCategory[];
  verified: boolean;
  is_active: boolean;
  review_count: number;
  view_count: number;
  old_review_rating: number;
  address: string;
  region: IRegion;
  district: IDistrict;
  employee_count: number;
}

export interface IChain {
  id: string;
  name: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
  name_kaa: string;
  name_uzc: string;
  slug: string;
  logo: TImages;
  ordering: number;
}

export interface ICompanyDetail {
  id: string;
  name: string;
  brand_logo: TImages;
  chain: IChain;
  categories: ICompanyCategory[];
  verified: boolean;
  is_active: boolean;
  review_count: number;
  view_count: number;
  old_review_rating: number;
  address: string;
  region: IRegion;
  district: IDistrict;
  employee_count: number;
  created_at: string;
  phone_number: string;
  phone_numbers: string[];
  phone_number_verified: boolean;
  fax: string;
  email: string;
  website: string;
  email_verified: false;
  legal_phone_number: string;
  legal_email: string;
  legal_address: string;
  legal_register_date: string;
  latitude: number;
  longitude: number;
}

export interface ICompanyMember {
  id: "55ee0db5-867d-4611-b481-84057271735a";
  sso_id: "3680b2fc-e843-4f9c-b394-56f019e4a654";
  user: IUserProfile;
  last_login: string;
  created_at: string;
  created_by: IUserProfile;
  role: 0;
}

export interface IMyCompany {
  brand_logo: string;
  categories: [];
  id: string;
  is_active: boolean;
  legal_name: string;
  name: string;
  verified: boolean;
  notification_count: number;
}

export interface ICompanyWorkDay {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  start: string;
  end: string;
}

export enum ECompanyWorkType {
  MANUAL,
  FULL,
}
