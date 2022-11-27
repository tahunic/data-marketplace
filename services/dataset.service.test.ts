import { getAvailableRecords, getIncludedCountries } from './dataset.service';
const datasets = require('@test/mocks/datasets.mock.json');
const countries = require('@test/mocks/countries.mock.json');
const fishingDataset = datasets[0];

describe('getAvailableRecords function', () => {
  it('returns correct available records for fishing dataset per all countries', () => {
    const availableRecords = getAvailableRecords(fishingDataset, countries);
    expect(availableRecords).toEqual(2173);
  });

  it('returns 0 if countries are empty', () => {
    const availableRecords = getAvailableRecords(fishingDataset, []);
    expect(availableRecords).toEqual(0);
  });

  it('returns 0 if dataset is not provided in a country', () => {
    const availableRecords = getAvailableRecords(fishingDataset, countries.filter(c => c.countryCode === 'GB'));
    expect(availableRecords).toEqual(0);
  });

});

describe('getIncludedCountries function', () => {
  it('should return all countries where dataset is available', () => {
    const includedCountries = getIncludedCountries(fishingDataset, countries);
    expect(includedCountries.map(c => c.countryCode)).toEqual(['US', 'CA', 'AU']);
  });

  it('should return empty array if dataset is not available', () => {
    const includedCountries = getIncludedCountries(fishingDataset, countries.filter(c => c.countryCode === 'GB'));
    expect(includedCountries.map(c => c.countryCode)).toEqual([]);
  });
});