import { TargetProduct } from './OutcomeConditions';

export interface IProduct {
  product: TargetProduct;
  name: string;
  description: string;
  icon: string;
  url: string;
  cloud: 'ENGAGEMENT' | 'COMMERCE' | 'CONTENT';
}
