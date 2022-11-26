export type Country = {
  countryCode: string;
  name: string;
  storedData: Data[];
}

type Data = {
  datasetId: number;
  recordCount: number;
}
