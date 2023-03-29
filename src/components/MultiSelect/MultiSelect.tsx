import { Button, Checkbox, Group } from '@mantine/core';
import { IOption } from 'models/Definitions';
import { FC } from 'react';

interface MultiSelectProps {
  options: IOption[];
}

export const MultiSelect: FC<MultiSelectProps> = ({ options }) => {
  return (
    <>
      <Checkbox.Group label="" description="Select all that apply">
        <Group mt="xs">
          {options.map((option: IOption) => (
            <Checkbox value={option.value} label={option.text} />
          ))}
        </Group>
      </Checkbox.Group>
      <Button>Next</Button>
    </>
  );
};
