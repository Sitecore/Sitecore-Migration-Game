# Introduction

Welcome to the open source project for the Sitecore Migration app. The purpose of this application is to help customers and partners alike in guiding them to their ideal migration path. The "choose your own adventure" story approach to the questions represents a fun way to learn about the migration process, and the various tools and techniques that can be used to help you along the way.

## Prerequisites to run the application

- Node 16.17.0 or higher
- NPM 8.15.0 or higher
- Next.js 13.4.1
- Cypress 16.6.0
- Sitecore Content Hub One (to drive the data for the application)
- Sitecore CDP/Personalize (not required)
- Azure Table Storage (either using the emulator or a live account)
  - Azurite for Local Development with Azure Table Storage (Version 3.29.0)

## Development

To get started you need to follow the following steps:

1. Clone the repository
2. You'll need access to a Sitecore Content Hub One tenant, and you'll need to create an API key for the development environment. To learn more, check out this guide here: [].
3. Duplicate the `.env.template` and name it `.env` and update the values with the information you collected in step #2.
4. Run `npm install` to install all the dependencies.
5. Run `npm run dev` to start the development server.

## Running Azure Table Storage

This project relies on creating outcome urls on the fly based on the users answers. To do this, we use Azure Table Storage to store the outcome urls. You can configure in your `.env` file the connection string to your Azure Table Storage account. The environment variables needed to connect to Azure Table Storage consist of:

- AZURE_TABLE_NAME
- AZURE_TABLE_CONNECTION_STRING

The name of the table should always be `Urls` to match up with the code.

### Running Azure Table Storage Locally

You can run Azure Table Storage locally, but not required. Below are the steps to run Azure Table Storage locally.

1. Install the Azure Storage Emulator (azurite). You can follow these instructions: (https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=npm%2Cblob-storage). Or you can install azurite globally by running `npm install -g azurite`.
2. Ensure you are able to run the command `azurite` in your terminal. If you are not able to run this command, you may need to add the path to your `azurite` executable to your PATH environment variable.
3. Update your `.env` file with the following values:

```
AZURE_TABLE_NAME=Urls
AZURE_TABLE_CONNECTION_STRING='UseDevelopmentStorage=true'
```

4. Run `npm run dev:azurite` which will start the Next.js development server and azurite local service simultaneously.

> This will start the Azure Table Storage emulator and the development server at the same time. You can now run the application locally.

5. If this is the first time running the above command, you will need to create the table in Azure Table Storage manually (after you've run step 4). You can do this by connecting to the local emulator using Azure Storage Explorer. You can download Azure Storage Explorer here: https://azure.microsoft.com/en-us/features/storage-explorer/
6. Once you have downloaded Azure Storage Explorer, install it, and then open the tool.
7. Along the left side of the tool is the "Explorer", you should see an option for "Emulator & Attached" which you should expand.
8. You should then see an option for "Emulator - Default Ports" which you should expand.
9. You should then see an option for "Tables", which you should right click on and select "Create Table".
10. Enter the name of the table as `Urls` and click "Create".
11. You should now see the table in the list of tables and now be able to run the application locally. Navigate to your website in the browser (ie. http://localhost:3000).

### Running Cypress Tests

We use Cypress to create End-to-End and Component Test use cases.

**To Open the Cypress Testing Console**

1. Clone the repository
2. Run a `npm install` to install all the dependencies.
3. If you have `npm run dev` running in a different terminal, please stop before running the next command.
4. Run `npm run cypress` which will run `npm run dev and npx cypress open` in parallel.
5. Select the test you want to run from the Cypress UI.

**To Run the E2E Tests Headlessly and Locally**

1. Run `npm run dev` to start the app in localhost:3000
2. Run `npx cypress run` to run the E2E tests on your local machine
3. View the terminal output to see passing or failing tests (no browser will open)

**To Run the Component Tests Locally**

1. Run `npx cypress run --component`
2. View terminal output for passing or failing tests
