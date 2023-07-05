import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { GameInfoProvider } from 'components/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';

const corporateTheme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    sitecoreRed: ['#EB1F1F','#EB1F1F','#EB1F1F','#EB1F1F','#EB1F1F','#EB1F1F','#EB1F1F','#EB1F1F','#EB1F1F','#EB1F1F'],
    sitecoreViolet: ['#5548D9','#5548D9','#5548D9','#5548D9','#5548D9','#5548D9','#5548D9','#5548D9','#5548D9','#5548D9'],
  },
  primaryColor: 'sitecoreViolet',
  headings: {
    fontFamily: 'Avenir Next LT Pro, Roboto, sans-serif',
    fontWeight: 500,
  },
  fontFamily: 'Avenir Next LT Pro, Roboto, sans-serif',
};


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Sitecore Migration Game</title>
        <link rel="icon" href={`/favicon.png`} />
      </Head>
      <GameInfoProvider>
        <MantineProvider theme={corporateTheme}>
          <Component {...pageProps} />
        </MantineProvider>
      </GameInfoProvider>
    </>
  );
};

export default MyApp;
