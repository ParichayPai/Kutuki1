const express = require('express');
const app = express();
var cors = require('cors');
const port = 5000;
const {url} = require("./config/keys");
const mongoose = require("mongoose");

mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology: true, useFindAndModify: false});
app.use(express.json());
app.use(cors());
require("./routes")(app);


app.listen(port,() => console.log("Listening to port 5000"));