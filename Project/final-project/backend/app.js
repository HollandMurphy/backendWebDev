const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const csv = require('csvtojson');

const Inventory = require('./models/inventory');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  }
});

const upload = multer({ storage: storage });
const type = upload.single('soldInventory');
const csvFilePath = './backend/uploads/soldInventory.csv';

const session = require('express-session');

const app = express();

// Load Routes
const inventory = require('./routes/inventory');
const user = require('./routes/user');

// DB Config
const db = require('./config/database');

// Mongoose Connection
mongoose.connect(db.mongoURI, {
  useMongoClient: true
})
.then( () =>
  console.log('MongoDB Connencted...'))
.catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTION');
  next();
});

// Testing adding inventory file
app.post('/add', type, function (req, res) {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const myString = ',';
      const newInventory = [];
      var counter = jsonObj.length;
      for (var i = 0; i < counter; i++) {
        let myString = ' ';
        let vehicle = jsonObj[i]["Vehicle"].split(myString);
        //console.log(vehicle[0]);
        const newInventory = {
          Year: vehicle[0],
          Make: vehicle[1],
          Model: vehicle[2],
          Trim: vehicle[3],
          StockNumber: jsonObj[i]["Stock #"],
          VinNumber: jsonObj[i]["VIN"],
          Class: jsonObj[i]["Class"],
          Age: jsonObj[i]["Age"],
          Body: jsonObj[i]["Body"],
          Color: jsonObj[i]["Color"],
          Cost: jsonObj[i]["Cost"],
          Odometer: jsonObj[i]["Odometer"]
        };
        // new Inventory(newInventory)
        //   .save()

        new Inventory(newInventory).save(); // Saving and overriding mongoose database
        console.log(i + ' File Uploaded in DB');
      }
    });
});
app.post('/api/inventory', (req, res, next) => {
  const inventory = new Inventory({
    Year: req.body.year,
    Make: req.body.make,
    Model: req.body.model,
    StockNumber: req.body.stockNum

  });
  post.save();
  //console.log(inventory);
  res.status(201).json({
    message: 'Inventory added succesfully'
  });
});

app.post('/register', (req, res) => {
  console.log(req.body);

})

// app.get('/api/inventory', (req, res, next) => {
//   Inventory.aggregate([{
//     $group: {
//             _id: "$Model",
//             make: { $first: "$Make" },
//             num_products: { "$sum": 1 }
//         }
//     },
//     {
//     $lookup:
//         {
//             from: "soldinventories",
//             localField: "_id",
//             foreignField: "Model",
//             as: "inventory_docs"
//         }
//     },
//     {
//     $project:
//         {
//             _id: 1,
//             make: 1,
//             num_products: 1,
//             sold: {$size: "$inventory_docs"}
//         }
//     },
//     { $sort: { make: 1, _id: 1 } },
// ])
// .then(documents => {
//       //console.log(documents);
//       res.status(200).json({
//         message: 'Posts fetched successfully',
//         inventories: documents
//       });
//     });
//   // Inventory.find()
//   //   .then(documents => {
//   //     console.log(documents);
//   //     res.status(200).json({
//   //       message: 'Posts fetched successfully',
//   //       inventories: documents
//   //     });
//   //   });
// });

// //module.exports = app;

// User Routes
app.use('/api/inventory', inventory);
app.use('/api/users', user);


// Local Development Port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
