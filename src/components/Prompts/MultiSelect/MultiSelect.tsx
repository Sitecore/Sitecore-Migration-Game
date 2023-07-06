import { Button, Checkbox, Group, Tooltip } from '@mantine/core';
import { IOption } from 'models';
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
                <Tooltip key={option.id} label={option.tooltip}>
                  <Checkbox value={option.value} label={option.label} />
                </Tooltip>
              ) : (
                <Checkbox key={option.id} value={option.value} label={option.label} />
              )}
            </>
          ))}
        </Group>
      </Checkbox.Group>
      {multiSelectSubmit && <Button onClick={() => multiSelectSubmit(selected)} disabled={selected.length == 0}>Next</Button>}
    </>
  );
};
