const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { middleware_error_handler } = require('./src/middlewares');

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./src/swagger')(app);
require('./src/routes')(app);

app.use(middleware_error_handler);

if(!module.parent) {
  app.listen(8000, () => {
    console.log("api started");
  })
}

module.exports = app;
