import { CountryControl } from './CountryControl';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
const countries = require('@test/mocks/countries.mock.json');

describe('CountryControl component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <CountryControl
        countries={countries}
      />
    );

    const wrapper = container.querySelectorAll('button');
    expect(wrapper.length).toBe(4);
  });

});