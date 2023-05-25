import { Text, Title } from '@mantine/core';
import { MDXProvider } from '@mdx-js/react';
import { IAnswer } from 'models';
import { FC } from 'react';
import General from '../../data/general.mdx';

interface MarkdownDisplayProps {
  theme: string;
  persona: string;
  answers: IAnswer[];
}

export const MarkdownDisplay: FC<MarkdownDisplayProps> = ({ theme, persona, answers }) => {
  const components = {
    h1: (props: any) => <Title {...props} />,
    h2: (props: any) => <Title {...props} />,
    p: (props: any) => <Text {...props} />,
  };

  return (
    <MDXProvider components={components}>
      <General theme={theme} persona={persona} answers={answers} />
    </MDXProvider>
  );
};
