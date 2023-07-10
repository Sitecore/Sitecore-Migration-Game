import { Button, SimpleGrid, Tooltip } from '@chakra-ui/react';
import { IOption } from 'models';
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
          <SimpleGrid columns={3} spacing='2px'>
            {options?.map((o: IOption) => (
              <>
                {o.tooltip ? (
                  <Tooltip key={o.id} label={o.tooltip}>
                    <Button key={o.id} value={o.value} onClick={optionSelectEvent}>
                      {o.label}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button key={o.id} value={o.value} onClick={optionSelectEvent}>
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
