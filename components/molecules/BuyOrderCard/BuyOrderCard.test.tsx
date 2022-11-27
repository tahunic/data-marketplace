import { BuyOrderCard } from './BuyOrderCard';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { format } from 'date-fns';

jest.mock('next/dist/client/router', () => require('next-router-mock'));
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string): string => str,
    };
  },
}));

describe('BuyOrderCard component', () => {
  it('renders correctly', () => {
    const date = new Date();
    const { container } = render(
      <BuyOrderCard
        id={1}
        orderName="Order 1"
        dateCreated={date}
        budget={132}
      />
    );

    const wrapper = container.querySelector('div');
    expect(wrapper?.textContent?.includes('Order 1')).toBeTruthy()
    expect(wrapper?.textContent?.includes(format(date, 'MM/dd/yyyy'))).toBeTruthy()
    expect(wrapper?.textContent?.includes('132')).toBeTruthy()
  });

});