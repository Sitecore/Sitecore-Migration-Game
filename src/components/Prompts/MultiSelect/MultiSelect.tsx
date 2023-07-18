import { Box, Button, Center, Flex, Text, Tooltip, VStack } from '@chakra-ui/react';
import { IOption } from 'models';
import { FC, useState } from 'react';

interface MultiSelectProps {
  options: IOption[];
  multiSelectSubmit?: (selected: string[]) => void;
}

export const MultiSelect: FC<MultiSelectProps> = ({ options, multiSelectSubmit }) => {
  let [selected, setSelected] = useState<string[]>([]);

  const handleButtonClick = (name: string) => {
    const newCheckedArr = [...selected];
    const index = newCheckedArr.indexOf(name);
    if (index === -1) {
      newCheckedArr.push(name);
    } else {
      newCheckedArr.splice(index, 1);
    }
    setSelected(newCheckedArr);
  };

  return (
    <>
      <Box w="100%" mt={8} mb={4} p={4} bg="#C8C8C8" borderRadius="lg" display="flex" flexDirection="row">
        <VStack>
          <Text fontSize="2xl">Select all that apply:</Text>
          <Flex direction={'row'} wrap={'wrap'} w='100%' justifyContent={'center'} > 
            {options.map((option: IOption) => (
              <>
                { /* Center all the below elements */}

                {option.tooltip ? (
                  <Tooltip key={option.id} label={option.tooltip}>
                    <Button
                      key={option.id}
                      value={option.value}
                      borderRadius={24}
                      colorScheme="purple"
                      m={1}
                      opacity={selected.includes(option.label) ? 1 : 0.5}
                      onClick={() => handleButtonClick(option.label)}
                    >
                      {option.label}
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    key={option.id}
                    value={option.value}
                    borderRadius={24}
                    colorScheme="purple"
                    m={1}
                    opacity={selected.includes(option.label) ? 1 : 0.5}
                    onClick={() => handleButtonClick(option.label)}
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
            colorScheme="purple"
            borderRadius={24}
            onClick={() => multiSelectSubmit(selected)}
            isDisabled={selected.length == 0}
          >
            Submit
          </Button>
        )}
      </Center>
    </>
  );
};
