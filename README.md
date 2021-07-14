# sql_library_manager
 TreeHouse FS Tech Degree Project #8

Project using Express, Pug, Sequelize and Sqlite3.
After loading the project, use npm start to run. Use http://localhost:3000/ for the homepage.

The app will load a populated sqlite3 database of books for browsing. It provides updating and deleting using sequelize CRUD methods. The pages are based on included mockups and markups.

For Exceeds Expectations on the Project:
The main display of the books database are paginated by a default of 6 entries per page. This is setting is stored in routes/routeCallBacks.js Line 14 is you wish to change.
A case insensitive search feature is included that will search the Title, Author, Genre and Year columns with the search terms entered. The results will be shown in a single listing and not paginated.