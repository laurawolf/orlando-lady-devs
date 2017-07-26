const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

let secret = {
  DB_URL: process.env.DB_URL
}

// API endpoints go here!


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001, databaseUrl=secret.DB_URL) {
    return new Promise((resolve, reject) => {
      mongoose.connect(process.env.DATABASE_URL || databaseUrl, err => {
        if (err) {
          return reject(err);
        }

        server = app.listen(port, () => {
          resolve();
        }).on('error', err => {
          mongoose.disconnect();
          reject(err);
          resolve();
        });
      });
    });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
  });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
