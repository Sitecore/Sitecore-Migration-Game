import { RestError, TableClient, TableEntityResult, odata } from '@azure/data-tables';
import { consoleLogger } from 'utils/consoleLogger';
import { IAzureTableOptions, IUrlEntity } from './models';

export class AzureTableService {
  private _options: IAzureTableOptions = {
    tableName: process.env.AZURE_TABLE_NAME || '',
    connectionString: process.env.AZURE_TABLE_CONNECTION_STRING || '',
  };
  private _tableClient: TableClient;
  private _partitionKey = 'Primary';

  constructor() {
    if (this._options.tableName == '' || this._options.connectionString == '') {
      throw new Error(
        'You must provide a table name and connection string to use Azure Table Storage which is a pre-requisite for this app. To learn more about using it, refer to the readme.'
      );
    }

    this._tableClient = TableClient.fromConnectionString(this._options.connectionString, this._options.tableName);
  }

  public getByRowKey = async (rowKey: string) => {
    // Unfortunately, the Azure SDK doesn't return undefined when a resource isn't found but instead errors out.
    try {
      const results = await this._tableClient.getEntity<IUrlEntity>(this._partitionKey, rowKey);

      consoleLogger(results);

      return results;
    } catch (error: any) {
      const restError = error as RestError;

      if (restError.name === 'ResourceNotFoundError') {
        return undefined;
      }

      consoleLogger(error);
    }
  };

  public getByJson = async (json: string): Promise<TableEntityResult<IUrlEntity> | undefined> => {
    const results = this._tableClient.listEntities<IUrlEntity>({
      queryOptions: {
        filter: odata`json eq '${json}'`,
      },
    });

    consoleLogger('getByJson', results);

    let firstEntity: TableEntityResult<IUrlEntity> | undefined;
    for await (const entity of results) {
      firstEntity = entity;
      break;
    }

    return firstEntity;
  };

  public createEntity = async (rowKey: string, json: string) => {
    const entity: IUrlEntity = {
      partitionKey: this._partitionKey,
      rowKey: rowKey,
      json: json,
    };

    const results = await this._tableClient.createEntity<IUrlEntity>(entity);

    consoleLogger(results);

    return results;
  };
}
