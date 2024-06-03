const express = require('express');
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const cors = require('cors');
const fs = require('fs');
const generateId = require('./helper');
const MongoClient = require('mongodb').MongoClient;

let db = null;
let books = null;

const app = express();

app.use(fileUpload());
app.use(cors());

new MongoClient('mongodb://localhost:27017').connect().then(item => {
  db = item.db('accessible-reader-db');
  books = item.db('accessible-reader-db').collection('books');
})


app.get('/books', (req, res) => {
  books.find().toArray().then(items => {
    res.send(items);
  });
});

app.get('/books/:id', (req, res) => {
  books.findOne({ _id: req.params.id }).then(book => {
    pdfParse(book.path).then(result => {
      res.send({
        text: result.text.replaceAll('\n', '<br>'),
        ...book
      });
    });
  });
 
});

app.post('/books', (req, res) => {
  const file = req.files;

  if (!file && !file.inputFile) {
    res.status(400);
    res.end();
  }

  const newId = generateId();
  const [ name, extension ] = file.inputFile.name.split('.');
  const path = './content/' + newId + '.' + extension;

  books.insertOne({
    _id: newId,
    name,
    path,
    bookmarks: [],
    notes: []
  }).then(() => {
    fs.writeFile(path, file.inputFile.data, 'binary', (err) => {
      if(err) {
        throw err;
      } else {
        res.send(newId);
      }
    });     
  })
});

app.put('/books/:id', (req, res) => {
  let itemToUpdate = {
    bookmarks: [],
    notes: []
  };

  if (req.query && req.query.entry) {
    itemToUpdate = req.query.entry;
  }

  books.updateOne({ _id: req.params.id }, { $set : itemToUpdate }).then((item) => {
    res.send(item);
  })
});

app.listen(9090);