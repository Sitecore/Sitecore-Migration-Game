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
          <SimpleGrid columns={3} spacing="5px">
            {options?.map((o: IOption) => (
              <>
                {o.tooltip ? (
                  <Tooltip key={o.id} label={o.tooltip}>
                    <Button
                      key={o.id}
                      value={o.value}
                      borderRadius={24}
                      colorScheme="purple"
                      onClick={optionSelectEvent}
                    >
                      {o.label}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button key={o.id} value={o.value} borderRadius={24} colorScheme="purple" onClick={optionSelectEvent}>
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
