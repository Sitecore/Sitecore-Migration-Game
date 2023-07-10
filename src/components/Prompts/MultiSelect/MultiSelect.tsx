import { Box, Button, Center, Checkbox, CheckboxGroup } from '@chakra-ui/react';
import { Group, Tooltip } from '@mantine/core';
import { IOption } from 'models';
import { FC, useState } from 'react';

interface MultiSelectProps {
  options: IOption[];
  multiSelectSubmit?: (selected: string[]) => void;
}

export const MultiSelect: FC<MultiSelectProps> = ({ options, multiSelectSubmit }) => {
  let [selected, setSelected] = useState<string[]>([]);

  const handleCheckbox = (name: string) => {
    const newCheckedArr = [...selected];
    const index = newCheckedArr.indexOf(name);
    if (index === -1) {
      newCheckedArr.push(name);
    } else {
      newCheckedArr.splice(index, 1);
    }
    setSelected(newCheckedArr);
  }

  return (
    <>
      <Box w="100%" mt={8} mb={4} p={4} bg='#C8C8C8' opacity='0.9' borderRadius='lg' display='flex' alignItems='center' flexDirection='column'>
        <CheckboxGroup>
          <Group mt="xs">
            {options.map((option: IOption) => (
              <>
                {option.tooltip ? (
                  <Tooltip key={option.id} label={option.tooltip}>
                    <Checkbox value={option.value} onChange={() => handleCheckbox(option.label)}>{option.label}</Checkbox>
                  </Tooltip>
                ) : (
                  <Checkbox key={option.id} value={option.value} onChange={() => handleCheckbox(option.label)}>{option.label}</Checkbox>
                )}
              </>
            ))}
          </Group>
        </CheckboxGroup>
      </Box>
      <Center>
        {multiSelectSubmit && <Button mt={4} onClick={() => multiSelectSubmit(selected)} isDisabled={selected.length == 0}>Submit</Button>}
      </Center>
    </>
  );
};
