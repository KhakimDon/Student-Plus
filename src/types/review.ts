import { IMediaData } from "@/types/common";

export enum EReviewStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
  DELETED = 3,
}

export interface IReviewData {
  comment: string;
  created_at: string;
  id: string;
  media_count: number;
  medias: IMediaData[];
  rating: 1 | 2 | 3 | 4 | 5;
  status: EReviewStatus;
}

export interface IReviewReply {
  comment: string;
  created_at: string;
  id: string;
}

export interface IReviewSingleData extends IReviewData {
  child: [IReviewReply] | [];
}
