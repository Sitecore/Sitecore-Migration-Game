import { Button, Group } from '@mantine/core';
import { IOption } from 'models/Definitions';
import { FC } from 'react';

interface IButtonGroupProps {
  options?: IOption[];
  optionSelectEvent?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ButtonGroup: FC<IButtonGroupProps> = ({ options, optionSelectEvent }) => {
  return (
    <div>
      {options && (
        <>
          <Group>
            {options?.map((o: IOption) => (
              <Button key={o.value} value={o.targetId} onClick={optionSelectEvent}>
                {o.text}
              </Button>
            ))}
          </Group>
        </>
      )}
    </div>
  );
};
