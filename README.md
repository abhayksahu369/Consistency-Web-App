
# <p align="center" id="top">ConsistencyWebApp</p>

A habit-tracking application designed to help users build and break habits by maintaining consistency. The app visualizes user progress with streaks, calendars, and daily reports.

## Features

- **Task Management**: Create and manage good and bad habits.
- **Task Analysis**: Displays current streak, max streak, and consistency through Nivo Calendar.
- **Daily Report**: View task completion and hours spent on specific dates.

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Data Visualization**: Nivo Calendar

## Installation

1. fork this repository
2. clone the repository on you device:
   ```bash
   git clone https://github.com/abhayksahu369/ConsistencyWebApp.git
   cd ConsistencyWebApp
   ```

3. setting up frontend 
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. setting up backend:
    - add you mongodb link in server\utils\dbConfig.js
    - create .env file and set up JWT_SECRET_KEY="your_key"
   ```bash
   cd..
   cd server
   npm install
   node index.js
   ```
5. you need to register first http://localhost:3000/auth/register
6. then you need to login http://localhost:3000/auth/login
7. after doing all these , you can create and see your tasks

## Usage

- Navigate to the home page to view your habits.
- Click on any task to view streaks, calendar, and analysis.
- Use the report page to view tasks completed and hours logged for a specific date.

## Contributing

Feel free to fork this repository and make contributions via pull requests.
