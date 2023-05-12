import { Button, Checkbox, Group, Tooltip } from '@mantine/core';
import { IOption } from 'models/Definitions';
import { FC, useState } from 'react';

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
            <>
              {option.tooltip ? (
                <Tooltip label={option.tooltip}>
                  <Checkbox key={option.value} value={option.value} label={option.label} />
                </Tooltip>
              ) : (
                <Checkbox key={option.value} value={option.value} label={option.label} />
              )}
            </>
          ))}
        </Group>
      </Checkbox.Group>
      {multiSelectSubmit && <Button onClick={() => multiSelectSubmit(selected)}>Next</Button>}
    </>
  );
};
