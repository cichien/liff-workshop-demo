// ./routes/index.js
const cors = require('cors');
const campaigns = require('./campaign');
module.exports = app => {
  app.use('/campaigns', cors(), campaigns);
};
