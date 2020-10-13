// ./routes/index.js
const campaigns = require('./campaign');
module.exports = app => {
  app.use('/campaigns', campaigns);
};
