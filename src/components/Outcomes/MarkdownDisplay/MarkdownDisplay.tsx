import { Text, Title } from '@mantine/core';
import { MDXProvider } from '@mdx-js/react';
import { useGameInfoContext } from 'components/ui';
import { FC } from 'react';

interface MarkdownDisplayProps {}

export const MarkdownDisplay: FC<MarkdownDisplayProps> = () => {
  const gameInfoContext = useGameInfoContext();

  const components = {
    h1: (props: any) => <Title {...props} />,
    h2: (props: any) => <Title {...props} />,
    p: (props: any) => <Text {...props} />,
  };

  return <MDXProvider components={components}></MDXProvider>;
};
