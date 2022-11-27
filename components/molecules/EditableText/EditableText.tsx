import React from 'react';
import { Flex, Input, InputProps, Text } from 'theme-ui';
import { FieldLabel } from '@components/atoms/FieldLabel';

type EditableFieldProps = InputProps & {
  editMode: boolean;
  label: string;
  defaultValue?: string | number;
  invalid?: boolean;
  readonly?: boolean;
}

export const EditableText = React.forwardRef<HTMLInputElement, EditableFieldProps>(({
  editMode = false,
  label,
  name,
  defaultValue,
  invalid,
  readonly,
  ...props
}, ref) => {
  return (
    <Flex
      sx={{
        gap: '5px',
        flexDirection: 'column',
        opacity: readonly ? 0.3 : 1,
        width: '45%',
      }}
    >
      <FieldLabel>{label}</FieldLabel>
      {editMode && !readonly ?
        <Input
          ref={ref}
          defaultValue={defaultValue}
          sx={{
            borderColor: invalid && 'red'
          }}
          {...props}
        /> :
        <Text>{defaultValue}</Text>}
    </Flex>
  );
});

EditableText.displayName = 'EditableText';
