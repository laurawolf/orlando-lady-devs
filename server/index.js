const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const { LadyDev } = require('./models/lady-dev');
const devSecret = require('./secret');

mongoose.Promise = global.Promise;

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  DB_URL: process.env.DB_URL,
};

if (process.env.NODE_ENV !== 'production') {
  secret = devSecret;
}

global.secret = secret;

const ladyRoutes = require('./routes/lady-dev-routes');
const authRoutes = require('./routes/auth-routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/auth', authRoutes);
app.use('/api/ladydevs', ladyRoutes);

// API endpoints go here!

app.use(passport.initialize());

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port = 3001, databaseUrl = secret.DB_URL) {
  return new Promise((resolve, reject) => {
    console.log('database', databaseUrl);
    mongoose.connect(process.env.DATABASE_URL || databaseUrl, { useMongoClient: true }, err => {
      if (err) {
        console.log('err', err);
        return reject(err);
      }

      console.log('Successfully Connected to DB');

      server = app.listen(port, () => {
        resolve();
      }).on('error', error => {
        mongoose.disconnect();
        reject(error);
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
