import { Header } from '@components/molecules';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/dist/client/router', () => require('next-router-mock'));
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string): string => str,
    };
  },
}));

describe('Header component', () => {
  it('renders 2 nav links', () => {
    const { container } = render(<Header />);

    const wrapper = container.querySelector('div');
    expect(wrapper?.querySelectorAll('a')).toHaveLength(2);
  });

});