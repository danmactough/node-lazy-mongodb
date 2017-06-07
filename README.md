lazy-mongodb
============

[![Greenkeeper badge](https://badges.greenkeeper.io/danmactough/node-lazy-mongodb.svg)](https://greenkeeper.io/)

A lazy connection client for MongoDB, so you don't have to deal with the
asynchronous connection method provided by [mongodb-native](https://github.com/mongodb/node-mongodb-native).

Usage
-----

Instead of this:

```js
var mongodb = require('mongodb');
var client = new mongodb.MongoClient();
client.connect(url, options, function (err, client) {
  var db = client.db(dbName);
  var collection = db.collection(collectionName);
  collection.insert([docs]);
});
```

Do this:

```js
var lazyMongoDB = require('lazy-mongodb');
var db = lazyMongoDB(dbName, url, options);
var collection = db.collection(collectionName);
collection.insert([docs]);
```

- - -

### Developed by [TerraEclipse](https://github.com/TerraEclipse)

Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Santa Cruz, CA and Washington, D.C.

- - -

### License: BSD
Copyright (C) 2014 Terra Eclipse, Inc. ([http://www.terraeclipse.com](http://www.terraeclipse.com))
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of Terra Eclipse, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
