var mongodb = require('mongodb');

/**
 * A lazy proxy for mongodb.Collection
 */
var Collection = function () {
  this.args = [].slice.call(arguments);
  this.db = this.args.shift();
  this.collName = this.args.shift();
};

/**
 * Proxy all the methods to call after the MongoClient has connected
 */
Object.keys(mongodb.Collection.prototype).forEach(function (prop) {
  Collection.prototype[prop] = function () {
    var connection = this.db.connection
      , that = this
      , args = [].slice.call(arguments)
      , cb = args[args.length - 1];

    connection.onConnection(this.db.dbName, function (err) {
      if (err) return cb(err);
      var collection = connection.db.collection(that.collName, that.args);
      collection[prop].apply(collection, args);
    });
  };
});

module.exports = Collection;