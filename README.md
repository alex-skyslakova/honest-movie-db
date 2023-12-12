# React Project 2023 - HonestDB

## Database of movies and their user ratings.

### Project assignment

Purpose of this project is to create a database portal where users can 
browse movies based on their categories and ratings and write their
own reviews to the movies which will reflect to the overall rating of the 
movie. To write reviews and receive personalized recommendations, users 
have to register to the portal with their discord credentials. All created
reviews are public and will be visible to other registered and non-registered
users. Users can view other user profiles and see what badges they earned
and what movies they like the most. 

### Team members

* Alexandra Skysľaková
* Kristián Malák
* Lukáš Majdan

### website url

https://honest-movie-db-pv247.vercel.app/

# Project setup

* ```git clone``` or download the project
* Install latest version of npm
* Install latest version of node
* run ```npm install``` in the project directory
* run ```npx prisma generate``` in the ```src/``` directory
* follow up with the database setup

# DB setup (WebStorm)
* open Database tab
* click on + and then select Data Source from Path
* select path to /honest-movie-db/dev.db and SQLite as driver
* if needed, download missing drivers and test connection
* you should see new dev.db data source in Database tab, which should contain tables with seeding data

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
