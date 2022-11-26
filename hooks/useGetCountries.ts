import * as ReactQuery from 'react-query';
import { serviceRequest } from '@utils/http/requests';
import { Country } from '@data/models/Country.model';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';

export const GET_COUNTRIES_KEY = '@countries/get';

export function useGetCountries(): {
  countries: Country[];
  isLoading: boolean;
  isError: boolean;
  refetch: <TPageData>(options?: ReactQuery.RefetchOptions & ReactQuery.RefetchQueryFilters<TPageData>) =>
    Promise<ReactQuery.QueryObserverResult<Country[], unknown>>
} {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = ReactQuery.useQuery([GET_COUNTRIES_KEY], () => serviceRequest(
    () => axios.get(`${getBaseUrl()}/countries`).then((res) => res.data),
  ));

  return {
    countries: data,
    isLoading,
    isError,
    refetch,
  }
}
