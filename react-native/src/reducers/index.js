// Redux imports
const {combineReducers} = require('redux');

// Combine and export reducers
module.exports = combineReducers({
  config: require('./config'),
});
