import { CountrySelectable } from '@store/countries';
import { DatasetSelectable } from '@data/models/Dataset.model';

export const getForecastedRecordCount = (
  datasets: DatasetSelectable[],
  countries: CountrySelectable[],
): number | undefined => {
  const selectedCountries = countries.filter(country => country.selected);
  const selectedDatasets = datasets.filter(dataset => dataset.selected);

  return selectedCountries.reduce((acc, currentValue) => {
    const recordCountsPerSelectedCountries = currentValue.storedData
      .filter(storedData => selectedDatasets.map(d => d.id).includes(storedData.datasetId))
      .map(storedData => storedData.recordCount);
    const totalRecordCountPerCountry = recordCountsPerSelectedCountries
      .reduce((recordCountsAcc, currentRecordCount) => recordCountsAcc + currentRecordCount, 0);
    return acc + totalRecordCountPerCountry;
  }, 0);
}
