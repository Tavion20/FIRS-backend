const express = require('express');
const cors = require('cors')
const formidable = require('express-formidable');
const fs = require('fs')

const app = express();

app.use(cors());
app.use(express.json());
app.use(formidable());

app.get("/", (req, res) => {
  res.status(201).json({message: "Connected to Backend!"});
});

app.post('/runmodel', (req, res) => {
  const {name, path} = req.files.myFile

  fs.writeFileSync(name, fs.readFileSync(path))

  const spawn = require('child_process').spawn;
  const process = spawn('python', ["../python/app.py", name]);

  process.stdout.on('data', (data) => {
    res.status(200).json({"result": data.toString()})
  })
});

const port = 10000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});