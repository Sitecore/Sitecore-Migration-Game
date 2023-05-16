import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

// Hide Access Token to CH1 behind API Proxy --- Not sure its worth hiding the edge token?!?
// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  httpProxyMiddleware(req, res, {
    target: process.env.SITECORE_CH1_ENDPOINT_URL ?? 'https://localhost:44316',
    pathRewrite: { '^/api/proxy': '/api' },
    headers: {
      'X-GQL-Token': process.env.SITECORE_CH1_CLIENT_KEY ?? '',
    },
  });
};
