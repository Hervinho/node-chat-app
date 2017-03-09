const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 2000;

var app = express();

app.use(express.static(publicPath));
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

//console.log(__dirname + '/../public');
//console.log(publicPath);
