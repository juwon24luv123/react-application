// keys.js figure out set of credential to return

if (process.env.NODE_ENV === 'production') {
    //we are in production - return production
    module.exports = require('./prod');
} else {
    // we are in development return dev
    module.exports = require('./dev');
}