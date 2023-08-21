import { Button, Center, Container, SimpleGrid, Text, Tooltip, VStack } from '@chakra-ui/react';
import { IOption } from 'models';
import { FC, useState } from 'react';

interface MultiSelectProps {
  options: IOption[];
  multiSelectSubmit?: (selectedOptions: IOption[]) => void;
}

export const MultiSelect: FC<MultiSelectProps> = ({ options, multiSelectSubmit }) => {
  let [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);

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

  return (
    <>
      <Container maxWidth={'100%'}>
        <VStack>
          <Text fontSize="2xl" variant={'answerInstruction'}>
            Select all that apply:
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="md" columnGap={10}>
            {options.map((option: IOption) => (
              <>
                {/* Center all the below elements */}
                {option.tooltip ? (
                  <Tooltip key={option.id} label={option.tooltip}>
                    <Button
                      key={option.id}
                      value={option.value}
                      m={1}
                      isActive={selectedOptions.includes(option) ? true : false}
                      onClick={() => handleOptionSelected(option)}
                      variant={{ base: 'outline', md: 'solid' }}
                      whiteSpace={'normal'}
                      flexWrap={'wrap'}
                    >
                      {option.label}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    key={option.id}
                    value={option.value}
                    m={1}
                    isActive={selectedOptions.includes(option) ? true : false}
                    onClick={() => handleOptionSelected(option)}
                    variant={{ base: 'outline', md: 'solid' }}
                  >
                    {option.label}
                  </Button>
                )}
              </>
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
