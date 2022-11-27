import { Button } from './Button';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Button component', () => {
  it('renders a button', () => {
    render(
      <Button>Add new</Button>
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Add new');
  });

  it('shows a spinner when in loading state', () => {
    render(
      <Button loading={true}>Add new</Button>
    );
    waitFor(() => expect(screen.getByTestId('loading-spinner')).toBeInTheDocument())
    waitFor(() => expect(screen.findByRole('button')).not.toBeInTheDocument());
  });
});