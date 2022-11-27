import { PageHeader } from './PageHeader';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('PageHeader component', () => {
  it('renders as h1', () => {
    const { container } = render(
      <PageHeader title="Header1" />
    );

    const element = container.querySelector('h1');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Header1');
    expect(element).toHaveStyle('text-align:center;margin:30px 0 20px 0');
  });
});