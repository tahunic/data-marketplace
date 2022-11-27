import { DatasetCard } from '@components/molecules';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
const countries = require('@test/mocks/countries.mock.json');

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string): string => str,
    };
  },
}));

describe('DatasetCard component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <DatasetCard
        title="Dataset 1"
        description="Description for Dataset 1"
        pricePerRecord={0.33}
        thumbnailSrc={'https://picsum.photos/id/1038/92/92'}
        thumbnailAlt="DatasetAlt1"
        availableRecords={216}
        countries={countries.map(country => country.countryCode)}
      />
    );

    const wrapper = container.querySelector('div');
    expect(wrapper?.textContent?.includes('Dataset 1')).toBeTruthy();
    expect(wrapper?.textContent?.includes('Description for Dataset 1')).toBeTruthy();
    expect(container.querySelector('img')).toBeInTheDocument();
    expect(container.querySelector('img')?.alt).toEqual('DatasetAlt1');
    expect(wrapper?.textContent?.includes("216")).toBeTruthy();
  });

});