// Module Start
// JS imports
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
// Server
const app = express();

// JSON support
app.use(bodyParser.json());
// URL Encoding
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
// Routes
// Download
app.post('/save', (req, res) => {
  // Set the system Downloads path - Win/OS X support
  fs.writeFile(`${process.env[(process.platform === 'win32') ?
    'USERPROFILE' :
    'HOME']
  }/Downloads/task.recording.json`,
  // Format file in readable way
  JSON.stringify(req.body, null, 2), (error) => {
    // Error check
    if (error) {
      console.error('Something went wrong: ', error);

      return res.status(500).send('Internal Server Error');
    }

    res.send('File saved');
  });
});
// General
app.listen(process.env.PORT || 5000, (error) => {
  if (error) throw error;

  console.log(`> Ready on https://localhost:${process.env.PORT || 5000}`);
});
// Module End
