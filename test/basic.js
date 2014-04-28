describe('basic', function () {

  var assert = require('assert')
    , idgen = require('idgen')
    , lazyMongoDB = require('../');

  var dbName = 'lazy-mongodb-' + idgen(16)
    , db
    , collection;

  after(function (done) {
    db.dropDatabase(done);
  });

  it('works', function (done) {
    db = lazyMongoDB(dbName);
    collection = db.collection('apples');
    collection.insert({ type: 'gala', flavor: 'bland' }, function (err, results) {
      if (err) return done(err);
      assert(results);
      assert(Array.isArray(results) && results.length === 1);
      var doc = results.pop();
      assert(doc);
      assert(doc._id);
      assert.equal(doc.type, 'gala');
      assert.equal(doc.flavor, 'bland');
      done();
    });
  });

  it('can be reused', function (done) {
    collection = db.collection('pears');
    collection.insert({ type: 'bosc', texture: 'rough' }, function (err, results) {
      if (err) return done(err);
      assert(results);
      assert(Array.isArray(results) && results.length === 1);
      var doc = results.pop();
      assert(doc);
      assert(doc._id);
      assert.equal(doc.type, 'bosc');
      assert.equal(doc.texture, 'rough');
      done();
    });
  });

  it('can create additional databases', function (done) {
    var secondDb = db.db('lazy-mongodb-' + idgen(16));
    var otherCollection = secondDb.collection('cars');
    otherCollection.insert({ make: 'Geo', model: 'Metro', cylinders: 3 }, function (err, results) {
      if (err) return done(err);
      assert(results);
      assert(Array.isArray(results) && results.length === 1);
      var doc = results.pop();
      assert(doc);
      assert(doc._id);
      assert.equal(doc.make, 'Geo');
      assert.equal(doc.model, 'Metro');
      assert.equal(doc.cylinders, 3);
      secondDb.dropDatabase(done);
    });
  });

});