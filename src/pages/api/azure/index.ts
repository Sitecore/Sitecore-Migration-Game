import { NextApiRequest, NextApiResponse } from 'next';
import { AzureTableService } from 'services/AzureTable/AzureTableService';

/**
 * This is a POST request at `/api/azure` to create a new UrlEntity in Azure Table Storage.
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
      .createEntity(data.rowKey, JSON.stringify(data.json))
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, error: error });
      });
  }
};

export default handler;
