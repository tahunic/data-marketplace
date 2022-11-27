import { EditableText } from '@components/molecules';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('DatasetCard component', () => {
  it('renders text field when not in edit mode', () => {
    const { container } = render(
      <EditableText
        label="Order name"
        editMode={false}
        defaultValue="Order 42"
      />
    );

    const label = container.querySelector('p');
    expect(label?.textContent).toEqual('Order name');

    const text = container.querySelector('span');
    expect(text?.textContent).toEqual('Order 42');

    const input = container.querySelector('input');
    expect(input).not.toBeInTheDocument();
  });

  it('renders input when in edit mode', () => {
    const { container } = render(
      <EditableText
        label="Order name"
        editMode={true}
        defaultValue="Order 42"
      />
    );

    const label = container.querySelector('p');
    expect(label?.textContent).toEqual('Order name');

    const input = container.querySelector('input');
    expect(input?.value).toEqual('Order 42');

    const text = container.querySelector('span');
    expect(text).not.toBeInTheDocument();
  });

});