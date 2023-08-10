import { Button, SimpleGrid, Tooltip, useTheme } from '@chakra-ui/react';
import { IOption } from 'models';
import { FC } from 'react';

interface IButtonGroupProps {
  options?: IOption[];
  optionSelectEvent?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ButtonGroup: FC<IButtonGroupProps> = ({ options, optionSelectEvent }) => {
  const theme = useTheme();
  return (
    <div>
      {options && (
        <>
          <SimpleGrid templateColumns={{ base: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }} spacing="5px">
            {options?.map((o: IOption) => (
              <>
                {o.tooltip ? (
                  <Tooltip key={o.id} label={o.tooltip}>
                    <Button key={o.id} value={o.value} onClick={optionSelectEvent} variant="answer">
                      {o.label}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button key={o.id} value={o.value} onClick={optionSelectEvent} variant="answer">
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
