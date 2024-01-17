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

## Development

To get started you need to follow the following steps:

1. Clone the repository
2. You'll need access to a Sitecore Content Hub One tenant, and you'll need to create an API key for the development environment. To learn more, check out this guide here: [].
3. Duplicate the `.env.template` and name it `.env` and update the values with the information you collected in step #2.
4. Run `npm install` to install all the dependencies.
5. Run `npm run dev` to start the development server.

## Running Azure Table Storage (locally)

This project relies on creating outcome urls on the fly based on the users answers. To do this, we use Azure Table Storage to store the outcome urls. You can configure in your `.env` file the connection string to your Azure Table Storage account. Optionally you can run Azure Table Storage locally, which those steps are listed below:

To run Azure Table Storage locally, you'll need to install the Azure Storage Emulator. You can find the download here: https://docs.microsoft.com/en-us/azure/storage/common/storage-use-emulator

https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=npm%2Cblob-storage

### Optional

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
