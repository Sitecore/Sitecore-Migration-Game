import { Button, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
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
    <Card mr={3} mb={3} variant={'outlineRaised'}>
      <CardHeader>
        <Heading size="md">{props.title}</Heading>
      </CardHeader>
      <CardBody>
        {props.description && <Text>{props.description}</Text>}
        <Button leftIcon={<FiExternalLink />} variant={'solid'} colorScheme="neutral">
          <Link href={props.link} target="_blank" rel="noopener noreferrer">
            Learn More
          </Link>
        </Button>
      </CardBody>
    </Card>
  );
};
