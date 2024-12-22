
import type { CodegenConfig } from '@graphql-codegen/cli';
import env from "dotenv"

env.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql",
  documents: ['src/**/*.{tsx,ts}'],
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    },
    "./src/graphql.schema.json": {
      plugins: ["introspection"]
    }
  },
  watch: true
};

export default config;
