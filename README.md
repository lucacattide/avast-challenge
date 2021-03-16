# Avast Coding Challenge

## User Story

Implement basic Electron/web application (running on localhost) for viewing and editing recorded interaction with a website.

Use the framework of your choice. The result does not have to be styled in any way.

On startup, it will fetch a `JSON` file with recorded browser-website interaction. Serving the file is up to you (`localhost` or internet).

Parse this file and show ‘records’ objects in the UI - ie. in a list.
Items should display event type, HTML tag name (or some other representative value), and formatted date+time of the event.

It should be possible to delete and reorder items.
There should be 2 buttons:

- `SAVE` button will save the currently edited file to the Downloads folder.
- `STATS` button will show simple statistics about the interaction:

  - Counts of different event types
  - Min/max/mean time delay between interactions
  - Length of the longest sequence of following input events - after filtering out focus events
  - Total time of the interaction (sum of all the events)

  Feel free to add other interesting stats about the data

  NOTE: while calculating the Stats, please bear in mind that it should be able to process thousands of events at once. Try to make the code as effective as possible (optionally note possible alternative solutions in comments)

Don’t spend too much time with it - especially with UI. Feel free to interpret uncertain information in your way. We’ll discuss it later.

You can hand it in in any form as well - git repository or simple zip file. Please, send it by Monday EOD.

Don’t hesitate to contact us in case of any questions on ondrej.masek@avast.com or jan.svehla@avast.com.

Good luck!

## Development Notes

- Features:
  - State management
- Only a CSS reset default stylesheet has been implemented in order to properly render the app front-end on each supported browser. No Layout/Template has been provided, according to the specifications
- The app state has been shaped as a single source of truth, in order to improve the global rendering performance
- The app has been structured across 3 different components - as well as the main `App`:
  - `RecordActions`: Manages `SAVE` and `STATS` actions
  - `RecordStats`: Renders the events statistics - as indicated in the User Story - including **2 BONUS** stats:
    - Total events by context: returns the number of the events related to the Browser and the DOM nodes respectively
    - Total events: Returns the total fetched events
  - `RecordView`: Renders the fetched events collection
- The events data are being fetched through a dedicated handler, in order to properly get and then render them
- The sorting actions are managed via a dedicated `order` parameter, to keep track of the records sequence
- An _Express_ server has been implemented (available in `backend/server.js`) in order to manage the `SAVE` action, following the user story requirements. The `Downloads` path - both for Windows and OS X environments - is correctly supported
- Improvements:
  - The sorting system might be upgraded in a drag and drop version, to avoid the redundancy of the actions buttons per row, as well as providing a better UX. Another alternative, might be represented by implementing the same actions on a global level - such as in a separated toolbar - passing the `order` record parameter - and other ones eventually - as an argument for each action
  - Some of the calculations are managed by iterating the fetched data. The data load of these computations, might be reduced by introducing a pagination system, in order to set the actions only on a restricted set of records

More details are indicated inside the code comments - where needed. For any further in-depth consideration, please contact me on info@lucacattide.dev or feel free to open an issue.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn dev`

Runs the app in concurrent mode (client/server).

Client: Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
Server: Listening on [http://localhost:5000](http://localhost:5000).

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Testing

### Code Coverage

![Branches](./coverage/badge-branches.svg 'Coverage - Branches') ![Branches](./coverage/badge-functions.svg 'Coverage - Functions') ![Branches](./coverage/badge-lines.svg 'Coverage - Lines') ![Branches](./coverage/badge-statements.svg 'Coverage - Statements')
