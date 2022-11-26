import { Country } from '@data/models/Country.model';

export type Dataset = {
  id: number;
  name: string;
  label: string;
  thumbnailUrl: string;
  description: string;
  costPerRecord: number;
  availableRecords?: number;
  includedCountries: Country[];
}
