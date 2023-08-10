import { Box, Button, Center, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface LinkCardProps {
  link: string;
  title: string;
  description?: string;
}

export const LinkCard: FC<LinkCardProps> = ({ ...props }) => {
  return (
    <Box
      borderRadius="sm"
      shadow="sm"
      mr={3}
      mb={3}
      p="5"
      border={1}
      background={'white'}
      rounded={'xl'}
      display={'flex'}
      flexDirection={'column'}
      w={'250px'}
      justifyContent={'space-between'}>
      <Text fontWeight={500}>
        {props.title}
      </Text>
      {props.description && <Text>{props.description}</Text>}
      <Center>
        <Button
          leftIcon={<FiExternalLink />}
          variant={'solid'}
          width={'100%'}
          margin={3}
          top={'auto'}
          bottom={'2px'}
        >
          <Link href={props.link} target="_blank" rel="noopener noreferrer">
            Learn More
          </Link>
        </Button>
      </Center>
    </Box>
  );
};
