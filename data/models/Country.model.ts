import { StoredData } from '@data/models/StoredData.model';

export type Country = {
  countryCode: string;
  name: string;
  storedData: StoredData[];
}
