import { Button, Checkbox, Group } from '@mantine/core';
import { IOption } from 'models/Definitions';
import { ChangeEvent, FC, useState } from 'react';

interface MultiSelectProps {
  options: IOption[];
  multiSelectSubmit?: (selected: string[]) => void;
}

export const MultiSelect: FC<MultiSelectProps> = ({ options, multiSelectSubmit }) => {
  let [selected, setSelected] = useState<string[]>([]);

  return (
    <>
      <Checkbox.Group label="" description="Select all that apply" onChange={setSelected}>
        <Group mt="xs">
          {options.map((option: IOption) => (
            <Checkbox key={option.value} value={option.value} label={option.text} />
          ))}
        </Group>
      </Checkbox.Group>
      {multiSelectSubmit && <Button onClick={() => multiSelectSubmit(selected)}>Next</Button>}
    </>
  );
};
