import { MantineProvider } from '@mantine/core';
import { GameInfoProvider } from 'components/GameInfoContext/GameInfoContext';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GameInfoProvider>
      <MantineProvider theme={{ colorScheme: 'light' }}>
        <Component {...pageProps} />
      </MantineProvider>
    </GameInfoProvider>
  );
};

export default MyApp;
