
# Catch Fever Game

Catch Fever is a fun game developed using React, Vite, Redux Toolkit, and SCSS. It features a boat that needs to catch random images falling from the top. The boat can be controlled using the left and right arrow keys. The score increases or decreases based on successful catches. The game also includes a scoreboard where players can save their scores and view them later.

# features

  - Boat controlled by left and right arrow keys.
  - Random images falling from the top.
  - Score that increases or decreases based on successful catches.
  - Scoreboard to save and view player scores.
  - Backend server using Node.js and Express.js.
  - MongoDB database to store player scores and names.
  - Environment variable configuration using dotenv.

## Technologies Used

- **Frontend:**
  - React: A JavaScript library for building user interfaces.
  - Vite: A fast frontend build tool for modern web development.
  - Redux Toolkit: A set of tools and best practices for efficient Redux development.
  - SCSS: A CSS preprocessor that enhances the styling capabilities of CSS.

- **Backend:**
  - Node.js: A JavaScript runtime environment that allows running JavaScript on the server.
  - Express.js: A web application framework for Node.js that simplifies server-side development.
  - MongoDB: A NoSQL database for storing player scores and names.
  - dotenv: A module for loading environment variables from a .env file.

## Prerequisites
Before running the game, ensure you have the following installed on your machine:
- Node.js (version v18.15.0 or higher)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/laxmanketheth/catch-fever-game.git
   ```
2. Install the dependencies:
   ```
   cd catch-fever-game
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the project's root directory.
   - Add the following variables to the `.env` file:
     ```
     MONGODB_URI=your-mongodb-uri
     ```
4. Start the frontend and backend servers:
	 - **Backend:**
   ```
   node index.js
   ```
- **Frontend:**
   ```
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173` to play the game.

## Usage

- Move the boat left: Press the left arrow key.
- Move the boat right: Press the right arrow key.
- Catch/Avoid falling images with the boat to increase/decrease your score.
- you can see highest Score/ your current score on the same screen.
- To view the scoreboard, visit the scoreboard page.
  
