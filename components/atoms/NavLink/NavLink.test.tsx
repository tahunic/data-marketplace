import { NavLink } from './NavLink';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('NavLink component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <NavLink to="/" />
    );

    const a = container.querySelector('a');
    expect(a).toBeInTheDocument();
  });

  it('renders active links correctly', () => {
    const { container } = render(
      <NavLink to="/" active={true} />
    );

    const a = container.querySelector('a');
    expect(a).toBeInTheDocument();
    expect(a).toHaveStyle('font-weight:400');
  });

  it('renders inactive links correctly', () => {
    const { container } = render(
      <NavLink to="/" active={false} />
    );

    const a = container.querySelector('a');
    expect(a).toBeInTheDocument();
    expect(a).toHaveStyle('font-weight:200');
  });
});