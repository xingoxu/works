var moment = require('moment');
module.exports = (date) => {
  return moment(date).format('YYYY-MM-DD');
}