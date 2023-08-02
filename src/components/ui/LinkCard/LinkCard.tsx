import { Button, Flex, Paper, Text } from '@mantine/core';
import { FC } from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface LinkCardProps {
  link: string;
  title: string;
  description?: string;
}

export const LinkCard: FC<LinkCardProps> = ({ ...props }) => {
  return (
    <Paper withBorder radius="sm" shadow="sm" p="md">
      <Flex justify="flex-end" align="flex-start" direction="column" gap="md">
        <Text weight={500}>{props.title}</Text>
        {props.description && <Text>{props.description}</Text>}

        <Button
          leftIcon={<FiExternalLink />}
          component="a"
          href={props.link}
          variant="light"
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
        >
          Learn More
        </Button>
      </Flex>
    </Paper>
  );
};
