import { Box, Button, Center, Flex, Text, Tooltip, VStack } from '@chakra-ui/react';
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
      <Box w="100%" mt={8} mb={4} p={4} borderRadius="lg" display="flex" flexDirection="row">
        <VStack>
          <Text fontSize="2xl" variant={'answerInstruction'}>
            Select all that apply:
          </Text>
          <Flex direction={'row'} wrap={'wrap'} w="100%" justifyContent={'center'}>
            {options.map((option: IOption) => (
              <>
                {/* Center all the below elements */}

                {option.tooltip ? (
                  <Tooltip key={option.id} label={option.tooltip}>
                    <Button
                      key={option.id}
                      value={option.value}
                      m={1}
                      opacity={selectedOptions.includes(option) ? 1 : 0.5}
                      onClick={() => handleOptionSelected(option)}
                      variant={'answer2'}
                    >
                      {option.label}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    key={option.id}
                    value={option.value}
                    m={1}
                    opacity={selectedOptions.includes(option) ? 1 : 0.5}
                    onClick={() => handleOptionSelected(option)}
                    variant={'answer2'}
                  >
                    {option.label}
                  </Button>
                )}
              </>
            ))}
          </Flex>
        </VStack>
      </Box>
      <Center>
        {multiSelectSubmit && (
          <Button
            mt={4}
            onClick={() => multiSelectSubmit(selectedOptions)}
            isDisabled={selectedOptions.length == 0}
            variant={'submit'}
          >
            Submit
          </Button>
        )}
      </Center>
    </>
  );
};
