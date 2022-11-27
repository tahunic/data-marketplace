import { Loader } from './Loader';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Loader component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Loader />
    );

    const div = container.querySelector('div');
    expect(div).toHaveStyle('position:absolute;width:100%;height:100%;align-items:center;justify-content:center');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});