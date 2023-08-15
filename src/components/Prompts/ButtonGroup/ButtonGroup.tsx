import { Button, Container, SimpleGrid, Tooltip, useTheme } from '@chakra-ui/react';
import { IOption } from 'models';
import { FC } from 'react';

interface IButtonGroupProps {
  options?: IOption[];
  optionSelectEvent?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ButtonGroup: FC<IButtonGroupProps> = ({ options, optionSelectEvent }) => {
  const theme = useTheme();
  return (
    <Container mt={8} maxWidth={'100%'}>
      {options && (
        <>
          <SimpleGrid templateColumns={{ base: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }}>
            {options?.map((o: IOption) => (
              <>
                {o.tooltip ? (
                  <Tooltip key={o.id} label={o.tooltip}>
                    <Button key={o.id} value={o.value} mx={5} onClick={optionSelectEvent} variant="solid" size="lg">
                      {o.label}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button key={o.id} value={o.value} mx={5} onClick={optionSelectEvent} variant="solid" size="lg">
                    {o.label}
                  </Button>
                )}
              </>
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};
