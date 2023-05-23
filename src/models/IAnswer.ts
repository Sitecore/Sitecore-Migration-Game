export interface IAnswer {
  promptId: string;
  prompt: string;
  value: string[]; // changing to be filled with Ids not value, likely going to remove
  valuePrettyText: string[];
}
