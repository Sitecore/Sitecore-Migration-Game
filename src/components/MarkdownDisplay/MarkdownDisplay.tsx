import { Text, Title } from '@mantine/core';
import { MDXProvider } from '@mdx-js/react';
import { GameInfoContext, GameInfoContextType } from 'components/GameInfoContext/GameInfoContext';
import { FC, useContext } from 'react';
import General from '../../data/general.mdx';

interface MarkdownDisplayProps {}

export const MarkdownDisplay: FC<MarkdownDisplayProps> = () => {
  const gameInfoContext = useContext<GameInfoContextType>(GameInfoContext);

  const components = {
    h1: (props: any) => <Title {...props} />,
    h2: (props: any) => <Title {...props} />,
    p: (props: any) => <Text {...props} />,
  };

  return (
    <MDXProvider components={components}>
      <General theme={gameInfoContext.theme} persona={gameInfoContext.persona} answers={gameInfoContext.answers} />
    </MDXProvider>
  );
};
