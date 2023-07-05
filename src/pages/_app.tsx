import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { GameInfoProvider } from 'components/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';

const corporateTheme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    sitecoreRed: ['#eb1f1f','#d41c1c','#bc1919','#a51616','#8d1313','#761010','#5e0c0c','#460909','#2f0606','#170303'],
    sitecoreViolet: ['#5548d9','#4d41c3','#443aae','#3b3298','#332b82','#2b246d','#221d57','#191641','#110e2b','#080716'],
  },
  primaryColor: 'sitecoreViolet',
  primaryShade: 0,
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
