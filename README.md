E-Commerce app full stack


Getting Started

These instructions will get your project up and running on your local machine for development and testing purposes. Follow these steps to install all required dependencies.
Prerequisites

Before you begin, ensure you have Node.js installed on your machine. This will provide you with npm, the package manager for Node.js, which is used to install the project's dependencies.
Installation

To set up the project for development on your local machine, follow these steps:

    Install root dependencies: Navigate to the root directory of the project and run the following command. This installs the dependencies required for the project's server-side.

bash

npm install

    Install client dependencies: Next, navigate to the client directory from the root of the project and run the following command. This installs the dependencies required for the project's client-side.

bash

cd client
npm install

Configuration

    Environment Variables: Create a .env file in the root directory of the project. This file should contain all the necessary environment variables required for the project to run. Below is an example template for the .env file:

env

# Example .env file
PORT=8080
MONGO_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here

Replace the placeholder values with your actual data.
Running the Project

After installing the dependencies and setting up the .env file, you're ready to run the project. The specific commands to start your project will depend on how it's set up, but typically, you can start the server-side and client-side with the following commands:

For the server-side (run this in the root directory):

bash

npm start

For the client-side (run this inside the client directory):

bash

npm start