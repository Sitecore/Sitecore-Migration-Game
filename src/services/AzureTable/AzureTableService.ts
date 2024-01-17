import { TableClient, TableEntityResult, odata } from '@azure/data-tables';
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
    this._tableClient = TableClient.fromConnectionString(this._options.connectionString, this._options.tableName);
  }

  public getByRowKey = async (rowKey: string) => {
    const results = await this._tableClient.getEntity<IUrlEntity>(this._partitionKey, rowKey);

    consoleLogger(results);

    return results;
  };

  public getByJson = async (json: string): Promise<TableEntityResult<IUrlEntity> | undefined> => {
    const results = this._tableClient.listEntities<IUrlEntity>({
      queryOptions: {
        filter: odata`json eq '${json}'`,
      },
    });

    consoleLogger('getByJson', results);
    console.log('getByJson', results);

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
