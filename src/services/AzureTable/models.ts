import { TableEntity } from '@azure/data-tables';

export interface IAzureTableOptions {
  tableName: string;
  connectionString: string;
}

export interface IUrlEntity extends TableEntity {
  json: string;
}
