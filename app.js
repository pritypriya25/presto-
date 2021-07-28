const express = require("express");
const bodyParser = require('body-parser')
var cors = require('cors')
const { lentoTest } = require("./lento");
const { prestoFile } = require("./prest-file");
const { getQueryResult } = require('./presto_client');
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/presto/:pageNumber", getQueryResult);
app.get("/lento", lentoTest)
app.get("/presto-file", prestoFile)

app.listen(3000, () => console.log("listening on port 3000"));