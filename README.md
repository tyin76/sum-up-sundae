<img src="frontend/src/media/SumUpSundaeTextLogo.svg" alt="SumUpSundae Logo" style="width: 100%;" />

# Sum-Up Sundae

A Full-stack web application that allows users to join or create groups, record short weekly recap videos, and view friends’ updates every Sunday.

## Overview
Sum-Up Sundae is designed to foster regular communication within groups. Each member can upload a short video summarizing their week, and watch other members’ videos as soon as they’re posted.

## Key Features
- **Group Management**: Multi-user groups that can be joined or created by sending a group code or creating a new group.  
- **Weekly Video Upload**: An intuitive flow for uploading a weekly recap video.  
- **Video Viewing**: Users can view their group members’ videos and keep up with each other’s weekly highlights.  
- **Authentication**: Google-based sign-in to streamline the login process.  

## Prerequisites
- Node.js & npm (or Yarn)
- A Firebase project with Google authentication configured
- A MongoDB instance running locally or in the cloud.

## Prerequisites

- Node.js and npm (or yarn) installed.
- A Firebase project for user authentication.
- A MongoDB instance running locally or in the cloud.

## Setup

1. **Clone the Repository**  
   ```
   git clone https://github.com/tyin76/sum-up-sundae.git
   ```

2. **Install Dependencies**  
   - In the `frontend` directory:  
     ```
     npm install  
     ```
     or  
     ```
     yarn install  
     ```
   - In the `backend` directory:  
     ```
     npm install  
     ```
     or  
     ```
     yarn install  
     ```

3. **Configure Environment Variables**  
   - In `frontend/.env`, set Firebase environment variables.  
   - In `backend/.env`, set MongoDB connection string and any other required keys.

4. **Run the Application**  
   - Start the Node.js server in `backend`:  
     ```
     npm start  
     ```
   - Start the React client in `frontend`:  
     ```
     npm start  
     ```


## Usage
1. **Sign In with Google**: Click “Sign In,” and log in with your Google account.  
2. **Create or Join a Group**: Enter a group code or create a new group to start sharing videos.  
3. **Upload Video**: On Sundays, upload a short video summarizing your week.  
4. **Watch Friends' Videos**: Access the group view to see all members’ weekly submissions in a grid layout.  

## Directory Structure

- **frontend**  
  Contains the React client. 
  - `src/` includes pages, components, providers, and API integration.  
  - `public/` includes static files such as `index.html`.
- **backend**  
  Contains the Node.js/Express server.  
  - `routes/` defines API endpoints for user, group, and video asset operations.
  - `models/` includes Mongoose models for MongoDB.

## Contributing
1. Fork the repository.  
2. Create a new branch for your changes.  
3. Submit a pull request describing your changes in detail.

## Copyright Information
Copyright © 2025 Fegico Chen, Terence Yin, Hieu Le, Jake Yeo
