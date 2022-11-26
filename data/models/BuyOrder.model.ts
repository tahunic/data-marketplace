export type BuyOrder = {
  id: number;
  name: string;
  createdAt: Date;
  datasetIds: number[];
  countries: string[];
  budget: number;
}
