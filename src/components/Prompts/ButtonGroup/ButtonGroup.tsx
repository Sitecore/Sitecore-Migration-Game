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
import { FC } from 'react';
import { FaInfo } from 'react-icons/fa';

interface IButtonGroupProps {
  options?: IOption[];
  optionSelectEvent?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ButtonGroup: FC<IButtonGroupProps> = ({ options, optionSelectEvent }) => {
  const gameInfoContext = useGameInfoContext();
  return (
    <Container maxWidth={'100%'}>
      {options && (
        <>
          <SimpleGrid templateColumns={{ base: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' }} spacing={2}>
            {options?.map((o: IOption) => (
              <>
                {o.tooltip && gameInfoContext.theme?.chakraTheme == 'fantasy' ? (
                  <>
                    <Show above="xl">
                      <Tooltip key={o.id} label={o.tooltip}>
                        <Button key={o.id} value={o.value} mx={5} onClick={optionSelectEvent} variant="solid" size="lg">
                          {o.label}
                        </Button>
                      </Tooltip>
                    </Show>
                    <Hide above="xl">
                      <HStack spacing={0}>
                        <Button key={o.id} value={o.value} mx={5} onClick={optionSelectEvent} variant="solid" size="lg">
                          {o.label}
                        </Button>
                        <Popover placement="left">
                          <PopoverTrigger>
                            <IconButton
                              variant={'iconButton'}
                              size={['md']}
                              colorScheme="neutral"
                              data-type="icon"
                              aria-label={'Start over'}
                              icon={<FaInfo size={18} />}
                            ></IconButton>
                          </PopoverTrigger>
                          <PopoverContent backgroundImage={'/fantasy/tooltip.svg'} background={'transparent'}>
                            <PopoverArrow />

                            <PopoverBody>{o.tooltip}</PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </HStack>
                    </Hide>
                  </>
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
