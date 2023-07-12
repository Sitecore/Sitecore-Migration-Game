import { ChakraProvider } from '@chakra-ui/react';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { GameInfoProvider } from 'components/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';

const corporateTheme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    sitecoreRed: [
      '#F69A9A',
      '#F37979',
      '#F16262',
      '#EE4141',
      '#EF4C4C',
      '#ED3535',
      '#eb1f1f',
      '#BC1919',
      '#991414',
      '#761010',
    ],
    sitecoreViolet: [
      '#C4BFF2',
      '#B3ADEE',
      '#A29AEA',
      '#9188E6',
      '#8076E3',
      '#665ADD',
      '#5548d9',
      '#443AAE',
      '#3B3298',
      '#2B246D',
    ],
  },
  primaryShade: 6,
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
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </MantineProvider>
      </GameInfoProvider>
    </>
  );
};

export default MyApp;
