import { IUserProfile, TImages } from "@/types/common";

export interface IProductDetail {
  id: string;
  company: {
    id: string;
    name: string;
    slug: string;
    brand_logo: TImages;
    verified: true;
  };
  name: string;
  image: TImages;
  old_review_rating: number;
  review_count: number;
  author_model: null;
  author: IUserProfile;
  created_at: string;
}
