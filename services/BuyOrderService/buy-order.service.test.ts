import { getForecastedRecordCount } from './buy-order.service';
const datasets = require('@test/mocks/datasets.mock.json');
const countries = require('@test/mocks/countries.mock.json');

describe('getForecastedRecordCount function', () => {
  it('returns correct value', () => {
    const datasetsSelectable = datasets.map(dataset => ({ ...dataset, selected: true }));
    const countriesSelectable = countries.map(country => ({ ...country, selected: true }));
    const availableRecords = getForecastedRecordCount(datasetsSelectable, countriesSelectable);
    expect(availableRecords).toEqual(19104);
  });

  it('returns 0 if no countries are selected', () => {
    const datasetsSelectable = datasets.map(dataset => ({ ...dataset, selected: true }));
    const countriesSelectable = countries.map(country => ({ ...country, selected: false }));
    const availableRecords = getForecastedRecordCount(datasetsSelectable, countriesSelectable);
    expect(availableRecords).toEqual(0);
  });

  it('returns 0 if no datasets are selected', () => {
    const datasetsSelectable = datasets.map(dataset => ({ ...dataset, selected: false }));
    const countriesSelectable = countries.map(country => ({ ...country, selected: true }));
    const availableRecords = getForecastedRecordCount(datasetsSelectable, countriesSelectable);
    expect(availableRecords).toEqual(0);
  });

  it('returns correct value for specific countries and all datasets', () => {
    const datasetsSelectable = datasets.map(dataset => ({ ...dataset, selected: true }));
    const countriesSelectable = countries
      .filter(country => ['US', 'GB'].includes(country.countryCode))
      .map(country => ({ ...country, selected: true }));
    const availableRecords = getForecastedRecordCount(datasetsSelectable, countriesSelectable);
    expect(availableRecords).toEqual(9050);
  });

  it('returns correct value for specific datasets and all countries', () => {
    const datasetsSelectable = datasets
      .filter(dataset => ['fishing', 'shipping'].includes(dataset.name))
      .map(dataset => ({ ...dataset, selected: true }));
    const countriesSelectable = countries.map(country => ({ ...country, selected: true }));
    const availableRecords = getForecastedRecordCount(datasetsSelectable, countriesSelectable);
    expect(availableRecords).toEqual(5667);
  });
});