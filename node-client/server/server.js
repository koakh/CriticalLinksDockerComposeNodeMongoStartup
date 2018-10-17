'use strict';

const { MongoClient, ObjectID } = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

var host = '0.0.0.0';
var port = 3000;
var db = 'testDB';
var collection = 'testCollection';
var connectionString = `mongodb://localhost:27017/${db}`;

var app = express();

app.use(bodyParser.json());

// GET
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

//POST:/todos
app.post('/todos', (req, res) => {

  MongoClient.connect(connectionString, (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection(collection).insertOne({
      text: 'Something silly....',
      completed: false
    }, (err, result) => {
      if (err) {
        console.log('Unable to insert todo', err);
        res.status(400).send(e);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
      res.send(result.ops);
    });

    db.close();
  });
});

//GET:/todos
app.get('/todos', (req, res) => {
  MongoClient.connect(connectionString, (err, db) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection(collection).find({}).toArray()
      .then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
        res.send(docs);
      })
      .catch((err) =>
        console.log("error:", err)
      );

    db.close();
  });
});

app.listen(port, host);
console.log(`Running on http://${host}:${port}`);