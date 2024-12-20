export enum ETestType {
  FREE = "1",
  PREMIUM = "2",
  RECOMMENDED = "3",
}

export type TTestType = "premium" | "free" | "recommended";

export interface ITestCard {
  id: number;
  title: string;
  icon: string;
  type: ETestType;
  category: string;
  attempts: number;
  price: number;
}
