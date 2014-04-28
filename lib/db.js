var mongodb = require('mongodb')
  , Collection = require('./collection');

/**
 * A lazy proxy for mongodb.Db
 */
var Db = function (connection, dbName) {
  this.connection = connection;
  this.dbName = dbName;
};

/**
 * Proxy all the methods to call after the MongoClient has connected
 */
Object.keys(mongodb.Db.prototype).forEach(function (prop) {
  Db.prototype[prop] = function () {
    var connection = this.connection
      , args = [].slice.call(arguments)
      , cb = args[args.length - 1];

    // Special case for collection which can be sync or async
    if ('function' !== typeof cb && prop === 'collection') {
      return new Collection(this, args[0], args[1]);
    }
    // Special case for db
    else if ('function' !== typeof cb && prop === 'db') {
      return new Db(this.connection, args[0]);
    }
    else {
      connection.onConnection(this.dbName, function (err) {
        if (err) return cb(err);
        connection.db[prop].apply(connection.db, args);
      });
    }
  };
});

module.exports = Db;