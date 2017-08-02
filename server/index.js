const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;

const secret = require('./secret');

const { ladyDev } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//import {PORT, DATABASE_URL} from './secret';



// API endpoints go here!

app.get('/api/ladydevs', (req, res) => {
  ladyDev
  .find()
  .exec()
  .then(ladies => {
    res.json(ladies);
  })
  .catch(err => {
    res.status(500).json({error: 'something went wrong'});
  });
});

app.post('/api/ladydevs', (req, res) => {
  ladyDev
  .create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    knowledge: req.body.knowledge,
    learning: req.body.learning,
    futureLearning: req.body.futureLearning,
    company: req.body.company,
    position: req.body.position,
    suggestions: req.body.suggestions
  })
  .then(lady => {
    res.status(201).json(lady);
  })
  .catch(err => {
    res.status(500).json({err: 'something went wrong'});
  });
});

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
      console.log('database', databaseUrl);
      mongoose.connect(process.env.DATABASE_URL || databaseUrl, { useMongoClient: true }, err => {
        if (err) {
          console.log('err', err);
          return reject(err);
        }

        console.log('Successfully Connected to DB');

        server = app.listen(port, () => {
          resolve();
        }).on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
      });
    });
    return promise;
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
