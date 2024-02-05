import {
  Button,
  Center,
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
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useGameInfoContext } from 'components/Contexts';
import { IOption } from 'models';
import React, { FC, useEffect, useState } from 'react';
import { FaInfo } from 'react-icons/fa';

interface MultiSelectProps {
  options: IOption[];
  multiSelectSubmit?: (selectedOptions: IOption[]) => void;
  currentPrompt?: string;
}

export const MultiSelect: FC<MultiSelectProps> = ({ currentPrompt, options, multiSelectSubmit }) => {
  let [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
  const gameInfoContext = useGameInfoContext();

  // Need to reset the selected options when the prompt changes
  useEffect(() => {
    setSelectedOptions([]);
  }, [currentPrompt]);

  const handleOptionSelected = (option: IOption) => {
    const newCheckedArr = [...selectedOptions];
    const index = newCheckedArr.indexOf(option);
    if (index === -1) {
      newCheckedArr.push(option);
    } else {
      newCheckedArr.splice(index, 1);
    }
    setSelectedOptions(newCheckedArr);
  };

  const buttonWidth = '88%';

  return (
    <>
      <Container maxWidth={'100%'}>
        <VStack>
          <Text fontSize="2xl" variant={'answerInstruction'}>
            Select all that apply:
          </Text>
          <SimpleGrid
            columns={{ base: 1, lg: 2, xl: 3 }}
            spacing="md"
            columnGap={10}
            alignItems={'left'}
            marginLeft={{ base: gameInfoContext.theme?.chakraTheme == 'fantasy' ? '8px' : '0', sm: 0, md: 5, lg: -5 }}
          >
            {options.map((option: IOption, idx) => (
              <React.Fragment key={idx}>
                {option.tooltip ? (
                  <>
                    <Show above="xl">
                      <Tooltip key={option.id} label={option.tooltip}>
                        <Button
                          key={option.id}
                          value={option.value}
                          m={1}
                          isActive={selectedOptions.includes(option) ? true : false}
                          onClick={() => handleOptionSelected(option)}
                          variant={{ base: 'solid' }}
                        >
                          {option.label}
                        </Button>
                      </Tooltip>
                    </Show>
                    <Hide above="xl">
                      <HStack spacing={0} width={'100%'} justifyContent={'space-between'}>
                        <Container width={{ base: buttonWidth, xl: '100%' }}>
                          <Button
                            key={option.id}
                            value={option.value}
                            m={1}
                            isActive={selectedOptions.includes(option) ? true : false}
                            onClick={() => handleOptionSelected(option)}
                            variant={{ base: 'solid' }}
                            width="100%"
                          >
                            {option.label}
                          </Button>
                        </Container>

                        <Popover placement="top-start">
                          <PopoverTrigger>
                            <IconButton
                              variant={'iconButton'}
                              size={['sm']}
                              data-type="icon"
                              aria-label={'Start over'}
                              icon={<FaInfo size={14} />}
                            ></IconButton>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody>{option.tooltip}</PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </HStack>
                    </Hide>
                  </>
                ) : (
                  <Container width={'100%'}>
                    <Button
                      key={option.id}
                      value={option.value}
                      m={1}
                      width={{ base: buttonWidth, xl: '100%' }}
                      isActive={selectedOptions.includes(option) ? true : false}
                      onClick={() => handleOptionSelected(option)}
                      variant={{ base: 'solid' }}
                    >
                      {option.label}
                    </Button>
                  </Container>
                )}
              </React.Fragment>
            ))}
          </SimpleGrid>
        </VStack>

        {multiSelectSubmit && (
          <Center>
            <Button
              mt={4}
              mx={4}
              onClick={() => multiSelectSubmit(selectedOptions)}
              isDisabled={selectedOptions.length == 0}
              variant={'solid'}
              size={'lg'}
            >
              Submit
            </Button>
          </Center>
        )}
      </Container>
    </>
  );
};
