
# DCSSB-Stats

This is a project designed to work together with [DCS Server Bot](https://github.com/Special-K-s-Flightsim-Bots/DCSServerBot)'s RestAPI to allow your community to see their statistics and the top players on your servers.

## Features

- Top players on the home screen - Configurable in env file
- Player search
- Player statistics
- List your servers on the `/servers` page
  - This required modification of the current RestAPI. To get this page to work, you will need to modify `/plugins/restapi/commands.py` to add the new endpoint.
    - You can find the modified `commands.py` file in my [forked repository](https://github.com/smileyhogue/DCSServerBot/blob/master/plugins/restapi/commands.py)

### TODO

- Dynamic NavBar configurable in a config file
- Better styling

## Getting Started

1. **Clone the Repository**
   
   Start by cloning the `dcssb-stats-webpage-master` repository to your local machine.

   ```bash
   git clone https://github.com/YourGitHubUsername/dcssb-stats-webpage-master.git
   cd dcssb-stats-webpage-master
   ```

2. **Install Dependencies**
   
   This project uses Node.js. Make sure you have it installed. Then run:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   
   Copy the `.env.example` file to create a `.env` file in the root directory. Modify the variables in the `.env` file according to your setup.

   ```bash
   cp .env.example .env
   ```

   Specifically, modify the `API_DOMAIN=https://api.example.com` to be the URL or IP:Port of the DCS Server Bot API.

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   This will start the development server on `http://localhost:3000`.

## Customization & Configuration

- **Top Players Configuration**: To customize the top players displayed on the home screen, modify the appropriate variables in the `.env` file.
  
- **Dynamic NavBar**: The feature to have a dynamic NavBar configurable via a file is still in development. Check the TODO section for updates.

## Contributing

Before making contributions, please open an issue to discuss your intended changes.

1. **Fork the Repository**: Start by forking the `dcssb-stats-webpage-master` repository.
  
2. **Clone Your Fork**: 

   ```bash
   git clone https://github.com/YourGitHubUsername/dcssb-stats-webpage-master.git
   cd dcssb-stats-webpage-master
   ```

3. **Create a New Branch**:

   ```bash
   git checkout -b new-feature-branch-name
   ```

4. **Make Your Changes**: Implement your changes, enhancements, or bug fixes.

5. **Run Tests & Linting**: Ensure that your changes don't introduce any errors.

   ```bash
   npm run test
   npm run lint
   ```

6. **Commit Your Changes**:

   ```bash
   git add .
   git commit -m "Describe your changes here"
   ```

7. **Push to Your Fork**:

   ```bash
   git push origin new-feature-branch-name
   ```

8. **Submit a Pull Request**: Go to the GitHub page of your fork and click on "Create Pull Request".

Thank you for your contributions!

