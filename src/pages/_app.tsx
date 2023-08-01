import { ChakraProvider } from '@chakra-ui/react';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import fantasyTheme from 'chakra/theme/fantasy/Theme';
import { GameInfoProvider } from 'components/ui';
import { AppProps } from 'next/app';
import { Fondamento } from 'next/font/google';
import Head from 'next/head';

const mantineCorporateTheme: MantineThemeOverride = {
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

const fondamento = Fondamento({ weight: '400', subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-fondamento: ${fondamento.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <title>Sitecore Migration Adventure</title>
        <link rel="icon" href={`/favicon.png`} />
      </Head>
      <Analytics />
      <GameInfoProvider>
        <MantineProvider theme={mantineCorporateTheme}>
          <ChakraProvider theme={fantasyTheme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </MantineProvider>
      </GameInfoProvider>
    </>
  );
};

export default MyApp;
