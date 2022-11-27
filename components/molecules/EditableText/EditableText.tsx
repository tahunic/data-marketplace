import React from 'react';
import { Input, InputProps, Text } from 'theme-ui';
import { FieldLabel } from '@components/atoms/FieldLabel';

type EditableFieldProps = InputProps & {
  editMode: boolean;
  label: string;
  defaultValue?: string | number;
  invalid?: boolean;
}

export const EditableText = React.forwardRef<HTMLInputElement, EditableFieldProps>(({
  editMode = false,
  label,
  name,
  defaultValue,
  invalid,
  ...props
}, ref) => {
  return (
    <>
      <FieldLabel>{label}</FieldLabel>
      {editMode ?
        <Input
          ref={ref}
          defaultValue={defaultValue}
          sx={{
            borderColor: invalid && 'red'
          }}
          {...props}
        /> :
        <Text>{defaultValue}</Text>}
    </>
  );
});

EditableText.displayName = 'EditableText';
