require('dotenv').config();

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const database = require('./database/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(morgan('dev'));

require('./controllers/authController')(app);
require('./controllers/projectController')(app);
require('./controllers/churchController')(app);
require('./controllers/adminChurchController')(app)
  
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
})