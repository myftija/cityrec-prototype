# CityRec

CityRec is a prototype travel recommender system for cities. It was developed to conduct a user study in the scope of a Master’s thesis at the Technical University of Munich (TUM).

Some screenshots of the application are shown below:

![](/other/screenshots/screen1.png) 
![](/other/screenshots/screen2.png) 
![](/other/screenshots/screen3.png) 

## Running the application

1. Clone the repo
2. Use the sample database dump to create the necessary MongoDB collections, by running this command: `mongorestore other/dump` (only a fraction of the cities dataset is provided in this dump)
3. Update `mongoURI` in the `db.js` file to point to your MongoDB instance
4. Install the project dependencies using `yarn` or `npm`
5. Run `yarn dev` for a development build

Note that a large part of this prototype was developed during a very short period of time due to time limitations, therefore, there is room for improvement in the code quality and structure in some parts of the implementation.