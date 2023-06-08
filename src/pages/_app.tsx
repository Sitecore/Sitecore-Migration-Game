import { MantineProvider } from '@mantine/core';
import { GameInfoProvider } from 'components/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Sitecore Migration Game</title>
        <link rel="icon" href={`/favicon.png`} />
      </Head>
      <GameInfoProvider>
        <MantineProvider theme={{ colorScheme: 'light' }}>
          <Component {...pageProps} />
        </MantineProvider>
      </GameInfoProvider>
    </>
  );
};

export default MyApp;
