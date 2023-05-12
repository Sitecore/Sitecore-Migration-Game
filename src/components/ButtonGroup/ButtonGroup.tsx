import { Button, SimpleGrid, Tooltip } from '@mantine/core';
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
          <SimpleGrid cols={2}>
            {options?.map((o: IOption) => (
              <>
                {o.tooltip ? (
                  <Tooltip key={o.value} label={o.tooltip}>
                    <Button value={o.value} onClick={optionSelectEvent}>
                      {o.label}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button key={o.value} value={o.value} onClick={optionSelectEvent}>
                    {o.label}
                  </Button>
                )}
              </>
            ))}
          </SimpleGrid>
        </>
      )}
    </div>
  );
};
