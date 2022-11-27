import { Pill } from './Pill';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { theme } from '@styles/theme';

describe('Loader component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Pill title="United States" />
    );

    const pill = container.querySelector('button');
    expect(pill).toBeInTheDocument();
    expect(pill).toHaveTextContent('United States');
    expect(pill).toHaveStyle(`backgroundColor: ${theme.colors?.muted}`)
  });
});