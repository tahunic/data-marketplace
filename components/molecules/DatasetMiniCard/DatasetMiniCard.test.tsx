import { DatasetMiniCard } from '@components/molecules';
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

describe('DatasetMiniCard component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <DatasetMiniCard
        title="Dataset 1"
        pricePerRecord={0.33}
        thumbnailSrc={'https://picsum.photos/id/1038/92/92'}
        thumbnailAlt="DatasetAlt1"
      />
    );

    const wrapper = container.querySelector('div');
    expect(wrapper?.textContent?.includes('Dataset 1')).toBeTruthy();
    expect(container.querySelector('img')).toBeInTheDocument();
    expect(container.querySelector('img')?.alt).toEqual('DatasetAlt1');
    expect(wrapper?.textContent?.includes("0.33")).toBeTruthy();
  });

});