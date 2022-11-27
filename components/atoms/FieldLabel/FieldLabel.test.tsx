import { FieldLabel } from './FieldLabel';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('FieldLabel component', () => {
  it('renders as p', () => {
    const { container } = render(
      <FieldLabel>Label1</FieldLabel>
    );

    const element = container.querySelector('p');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Label1');
  });

  it('renders as h1', () => {
    const { container } = render(
      <FieldLabel as="h1">Label1</FieldLabel>
    );

    const element = container.querySelector('h1');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Label1');
  });
});