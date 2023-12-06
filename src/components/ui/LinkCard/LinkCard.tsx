import { Button, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import { useEngageTracker } from 'components/Contexts';
import * as GTag from 'lib/GTag';
import Link from 'next/link';
import { FC } from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface LinkCardProps {
  link: string;
  title: string;
  description?: string;
  buttonText?: string;
}

export const LinkCard: FC<LinkCardProps> = ({ ...props }) => {
  const tracker = useEngageTracker();

  const handleExternalLinkClick = async (e: any) => {
    await tracker?.TrackEvent('external_link_click', { url: props.link });

    GTag.event('external_link_click', 'External Link', props.link);
  };

  return (
    <Card mr={3} mb={3} variant={'outlineRaised'}>
      <CardHeader>
        <Heading size="md">{props.title}</Heading>
      </CardHeader>
      <CardBody>
        {props.description && <Text>{props.description}</Text>}
        <Link href={props.link} target="_blank" rel="noopener noreferrer">
          <Button
            leftIcon={<FiExternalLink />}
            variant={'solid'}
            colorScheme="neutral"
            onClick={(e) => handleExternalLinkClick(e)}
          >
            {props.buttonText ? props.buttonText : 'Learn more'}
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};
