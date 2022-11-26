import * as ReactQuery from 'react-query';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';
import { Dataset } from '@data/models/Dataset.model';
import { StoredData } from '@data/models/StoredData.model';
import { Country } from '@data/models/Country.model';
import { API_ROUTES } from '@data/routes';

export const GET_DATASETS_KEY = '@datasets/get';

export function useGetDatasets(countryFilter: Country[]): {
  datasets: Dataset[];
  isLoading: boolean;
  isError: boolean;
  refetch: <TPageData>(options?: ReactQuery.RefetchOptions & ReactQuery.RefetchQueryFilters<TPageData>) =>
    Promise<ReactQuery.QueryObserverResult<Dataset[]>>
} {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = ReactQuery.useQuery([GET_DATASETS_KEY], () =>
      axios.get(`${getBaseUrl()}/${API_ROUTES.DATASETS}`).then((res) => res.data),
  );

  const datasets = data
    ?.map((dataset: Dataset) => ({
      ...dataset,
      availableRecords: countryFilter
        .flatMap((country: Country) => country.storedData)
        .filter((storedData: StoredData) => storedData.datasetId === dataset.id)
        .map((storedData: StoredData) => storedData.recordCount)
        .reduce((acc: number, currentValue: number) => acc + currentValue, 0),
      includedCountries: countryFilter
        .filter((country: Country) => country.storedData
          .some((sd: StoredData) => sd.datasetId === dataset.id && sd.recordCount > 0))
    }))
    ?.filter((dataset: Dataset) => Number(dataset.availableRecords) > 0) ?? [];

  return {
    datasets,
    isLoading,
    isError,
    refetch,
  }
}
