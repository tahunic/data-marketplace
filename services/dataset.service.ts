import { Dataset } from '@data/models/Dataset.model';
import { Country } from '@data/models/Country.model';
import { StoredData } from '@data/models/StoredData.model';

export const getAvailableRecords = (dataset: Dataset, countries: Country[]): number => {
  return countries
    .flatMap((country: Country) => country.storedData)
    .filter((storedData: StoredData) => storedData.datasetId === dataset.id)
    .map((storedData: StoredData) => storedData.recordCount)
    .reduce((acc: number, currentValue: number) => acc + currentValue, 0);
}

export const getIncludedCountries = (dataset: Dataset, countries: Country[]): Country[] => {
  return countries
    .filter((country: Country) => country.storedData
      .some((sd: StoredData) => sd.datasetId === dataset.id && sd.recordCount > 0))
}

