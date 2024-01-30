# TV Series Viewer
## Description
TV Series Viewer is a React application that allows users to search for TV series and view detailed information about each show. It uses the [TVMaze API](https://api.tvmaze.com/) to fetch and display series data. 

 ## Features
* Search for TV series by name.
* View a list of series matching the search query.
* View detailed information about a specific series, including ratings, genres, and summaries.
* Responsive design with support for mobile devices.
* Support for Browsers like Chrome, Safari, Mozilla, Firefox.

## Installation
To get started with the TVMaze Series Viewer:

1. Clone the repository:
```bash
git clone [repository URL]
```
2. Navigate to the project directory:
```bash
cd [project directory]
```
3. Install dependencies
```bash
npm install
```
4. run the application
```bash
npm run dev
```

## Usage
* On the home page, use the search bar to find TV series.
* Click on any series in the list to view more details.
* In the detailed view, you can see the ratings, summary, and genres and cast members details.
* Use the back button to return to the previously search results.

Following features are the considerations to include in the application for bigger time scope : 
1. Cast Info Layout can be styled better for better responsiveness and match the figma design.
2. Replace MUI Ratings with a better library or have custom filled star icons based on rating.
3. React suspense for series list page to load all the images or show a load spinner while loading the images.
4. Add Pagination logic to include more search results
5. Add More test cases for the components
6. Better Error Handling for API call fail 
7. Search button on Enter key press should trigger the search