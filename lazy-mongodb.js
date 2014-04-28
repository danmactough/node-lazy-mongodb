var mongodb = require('mongodb')
  , stringify = require('querystring').stringify;

var Db = require('./lib/db');

/**
 * lazyMongoDB
 *
 * @param {String} dbName the name of the database to connect to
 * @param {String|Object} mongoUrl the MongoDB connection string or parts to build the connection string [optional]
 * @param {Object} mongoOptions any additional options for the connection command [optional]
 * @returns {Db} A lazy proxy for mongodb.Db
 */
module.exports = function lazyMongoDB (dbName, mongoUrl, mongoOptions) {

  var url;
  mongoOptions || (mongoOptions = {});

  var Connection = function Connection () {
    this.connecting = false;
    this.connected = false;
    this.client = null;
    this.db = null;
  };

  Connection.prototype.onConnection = function onConnection (dbName, next) {
    var connection = this;
    if (!connection.connected) {
      var c;
      if (!connection.connecting) {
        connection.connecting = true;
        c = new mongodb.MongoClient();
        c.connect(url, mongoOptions, function (err, _client) {
          if (err) return next(err);
          connection.connected = true;
          onConnect(_client);
        });
      }
      else {
        c.once('connect', onConnect);
      }
    }
    else onConnect();

    function onConnect (_client) {
      if (_client) {
        connection.client = _client;
      }
      connection.db = connection.client.db(dbName);
      next();
    }
  };

  if (!dbName) throw new Error('Missing required parameter: dbName');
  if ('string' === typeof mongoUrl) url = mongoUrl;
  else url = buildConnectUrl(mongoUrl);
  return new Db(new Connection(), dbName);

};

/**
 * Builds a MongoDB standard connection string, as defined at
 * http://docs.mongodb.org/manual/reference/connection-string/
 */
function buildConnectUrl (parts) {
  parts || (parts = {});
  var url = 'mongodb://';

  if (parts.auth && parts.auth.username && parts.auth.password) {
    url += parts.auth.username + ':' + parts.auth.password + '@';
  }
  url += Array.isArray(parts.hosts) ? parts.hosts.join(',') : parts.hosts || parts.host || 'localhost:27017';
  url += '/' + (parts.db || '');
  if (Object.prototype.toString.call(parts.options) === '[object Object]') {
    url += '?' + stringify(parts.options);
  }
  return url;
}