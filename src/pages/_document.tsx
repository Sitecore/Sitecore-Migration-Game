import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta
          property="og:image"
          content={`https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/knowledge-center/digital-marketing-resources/migrating-to-xm-cloud/gettyimages-898545250.jpg?mw=310&md=20230901T160358Z&hash=CA7AE4A53096E607A51CA4C172B0E5D8&t=544x310`}
        />
        <meta
          name="twitter:image"
          content={"https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/knowledge-center/digital-marketing-resources/migrating-to-xm-cloud/gettyimages-898545250.jpg?mw=310&md=20230901T160358Z&hash=CA7AE4A53096E607A51CA4C172B0E5D8&t=544x310"}
        />
        <meta name="og:title" content="Find your way to Sitecore's Composable DXP with confidence!"></meta>
        <meta name="og:description" content="Sitecore Migration Advisor"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
