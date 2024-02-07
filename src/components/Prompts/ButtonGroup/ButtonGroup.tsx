import {
  Button,
  Container,
  HStack,
  Hide,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Show,
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react';
import { useGameInfoContext } from 'components/Contexts';
import { IOption } from 'models';
import React, { FC } from 'react';
import { FaInfo } from 'react-icons/fa';

interface IButtonGroupProps {
  options?: IOption[];
  optionSelectEvent?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ButtonGroup: FC<IButtonGroupProps> = ({ options, optionSelectEvent }) => {
  const gameInfoContext = useGameInfoContext();

  const buttonWidth = '80%';

  return (
    <Container maxWidth={'100%'}>
      {options && (
        <>
          <SimpleGrid templateColumns={{ base: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }} spacing={2}>
            {options?.map((o: IOption, idx) => (
              <React.Fragment key={idx}>
                {o.tooltip ? (
                  <>
                    <Show above="xl">
                      <Tooltip key={o.id} label={o.tooltip}>
                        <Button key={o.id} value={o.value} m={1} onClick={optionSelectEvent} variant="solid" size="lg">
                          {o.label}
                        </Button>
                      </Tooltip>
                    </Show>
                    <Hide above="xl">
                      <HStack spacing={0} width={'100%'} justifyContent={'space-between'}>
                        <Button key={o.id} value={o.value} m={1} onClick={optionSelectEvent} width={{ base: buttonWidth, xl: '100%' }} variant="solid" size="lg">
                          {o.label}
                        </Button>

                        <Popover placement="top-start" closeOnBlur>
                          <PopoverTrigger>
                            <IconButton
                              variant='solid'
                              size={['md']}
                              colorScheme="neutral"
                              data-type="icon"
                              aria-label={'Start over'}
                              icon={<FaInfo size={18} />}
                            ></IconButton>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody color="black">{o.tooltip}</PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </HStack>
                    </Hide>
                  </>
                ) : (
                  <Button key={o.id} value={o.value} width={{ base: buttonWidth, xl: '100%' }} m={1} onClick={optionSelectEvent} variant="solid" size="lg">
                    {o.label}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};
