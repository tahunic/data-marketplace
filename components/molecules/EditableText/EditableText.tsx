import React from 'react';
import { Input, InputProps, Text } from 'theme-ui';
import { FieldLabel, Flex } from '@components/atoms';

type EditableFieldProps = InputProps & {
  editMode: boolean;
  label: string;
  defaultValue?: string | number;
  textValue?: string;
  readonly?: boolean;
}

export const EditableText = React.forwardRef<HTMLInputElement, EditableFieldProps>(({
  editMode = false,
  label,
  name,
  defaultValue,
  textValue,
  readonly,
  ...props
}, ref) => {
  return (
    <Flex
      flexDirection="column"
      opacity={readonly ? 0.3 : 1}
      width="45%"
    >
      <FieldLabel>{label}</FieldLabel>
      {editMode && !readonly ?
        <Input
          ref={ref}
          defaultValue={defaultValue}
          {...props}
        /> :
        <Text>{textValue}</Text>}
    </Flex>
  );
});

EditableText.displayName = 'EditableText';
