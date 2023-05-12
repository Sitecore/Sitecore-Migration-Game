declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;

  export = Schema;
}

declare module '*.gql';

// declare module '*.gql' {
//   var _a: typeof import('.').gql;
//   export { _a as default };
// }
