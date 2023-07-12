# Sitecore Migration Game

Web based Migration Game

## Installing the Sitecore Block Corporate Theme

The corporate theme in this app uses the [Block Design System](https://blok.sitecore.com/) created by Sitecore. You must be a Sitecore Employee to obtain an API key and develop with the corporate theme active. This theme is not required to develop locally and make pull requests.

Follow the steps in [Getting Started with Blok](https://sitecore.atlassian.net/wiki/spaces/SDS/pages/4326523430/) to obtain an API key and setup downloads from the private repository. Below are the additional steps required in the app to use the coporate theme: 

1. In the `_app.tsx` file add the following import at the top `import sitecoreTheme from '@sitecore-ui/chakra-theme';`
2. Still in `_app.tsx` modify `<ChakraProvider>` to `<ChakraProvider theme={sitecoreTheme}>`, this makes the Sitecore Corporate theme your default theme. 
