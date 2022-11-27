import { ShowingResultsFrom } from '@components/molecules';
import { prettyDOM, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string): string => str,
    };
  },
}));

describe('ShowingResultsFrom component', () => {
  it('renders total & country names when both are provided', () => {
    const { container } = render(
      <ShowingResultsFrom
        totalResults={3}
        countryNames={'United States, Canada'}
      />
    );

    const wrapper = container.querySelector('div');
    expect(wrapper?.textContent?.includes('showing 3 results_from United States, Canada')).toBeTruthy();
  });

  it('renders correctly with 0 total results', () => {
    const { container } = render(
      <ShowingResultsFrom
        totalResults={0}
        countryNames={'United States, Canada'}
      />
    );

    const wrapper = container.querySelector('div');
    expect(wrapper?.textContent?.includes('showing 0 results_from United States, Canada')).toBeTruthy();
  });
});