import * as ReactQuery from 'react-query';
import { serviceRequest } from '@utils/http/requests';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';
import { Dataset } from '@data/models/Dataset.model';
import { StoredData } from '@data/models/StoredData.model';
import { Country } from '@data/models/Country.model';
import { API_ROUTES, ROUTES } from '@data/routes';
import { useCountries } from '@store/countries';

export const GET_DATASETS_KEY = '@datasets/get';

export function useGetDatasets(): {
  datasets: Dataset[];
  isLoading: boolean;
  isError: boolean;
  refetch: <TPageData>(options?: ReactQuery.RefetchOptions & ReactQuery.RefetchQueryFilters<TPageData>) =>
    Promise<ReactQuery.QueryObserverResult<Dataset[]>>
} {
  const { countries, selectedCountries } = useCountries();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = ReactQuery.useQuery([GET_DATASETS_KEY], () =>
      axios.get(`${getBaseUrl()}/${API_ROUTES.DATASETS}`).then((res) => res.data),
    { enabled: countries?.length > 0 }
  );

  const datasets = data
    ?.map((dataset: Dataset) => ({
      ...dataset,
      availableRecords: selectedCountries
        .flatMap((country: Country) => country.storedData)
        .filter((storedData: StoredData) => storedData.datasetId === dataset.id)
        .map((storedData: StoredData) => storedData.recordCount)
        .reduce((acc: number, currentValue: number) => acc + currentValue, 0),
      includedCountries: selectedCountries
        .filter((country: Country) => country.storedData.some((sd: StoredData) => sd.datasetId === dataset.id))
    }))
    ?.filter((dataset: Dataset) => Number(dataset.availableRecords) > 0) ?? [];

  return {
    datasets,
    isLoading,
    isError,
    refetch,
  }
}
