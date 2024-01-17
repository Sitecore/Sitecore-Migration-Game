import { NextApiRequest, NextApiResponse } from 'next';
import { AzureTableService } from 'services/AzureTable/AzureTableService';

/**
 * This is a POST request at `/api/azure/get` to get a UrlEntity in Azure Table Storage.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {void}
 */
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const tableService = new AzureTableService();
  const data = req.body;

  if (req.method === 'POST') {
    tableService
      .getByJson(JSON.stringify(data))
      .then((result) => {
        res.status(200).json({ success: true, result: result });
      })
      .catch((error) => {
        res.status(500).json({ success: false, error: error });
      });
  }
};

export default handler;
