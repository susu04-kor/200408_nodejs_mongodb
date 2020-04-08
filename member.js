module.exports.insertMember = function(doc){  //모듈로 내보냅니다
  const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');

    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'bit';

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Insert a single document
    db.collection('member').insertOne(doc, function(err, r) {
    //  assert.equal(null, err);
      //assert.equal(1, r.insertedCount);
      client.close();
    });
  });

}

module.exports.deleteMember = function(doc, _id){
    const MongoClient = require('mongodb').MongoClient;
    const ObjectID = require('mongodb').ObjectID;
    const assert = require('assert');

    const url = 'mongodb://localhost:27017';
    const dbName = 'bit';

    (async function() {
      const client = new MongoClient(url);

      try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Get the removes collection
        const col = db.collection('member');
        let r;

        // Remove a single document
        r = await col.deleteOne({_id:new ObjectID(_id) });
        // assert.equal(1, r.deletedCount);

      } catch (err) {
        console.log(err.stack);
      }
      // Close connection
      client.close();
    })();
}


module.exports.updateMember = function(doc, _id){
  const MongoClient = require('mongodb').MongoClient;
  const ObjectID = require('mongodb').ObjectID;
  const assert = require('assert');

  const url = 'mongodb://localhost:27017';
  const dbName = 'bit';

  (async function() {
    const client = new MongoClient(url);

    try {
      await client.connect();
      console.log("Connected correctly to server");

      const db = client.db(dbName);
      const col = db.collection('member');
      let r;
          // Update a single document
      r = await col.updateOne({_id:new ObjectID(_id)}, {$set: doc});
      // assert.equal(1, r.matchedCount);
      // assert.equal(1, r.modifiedCount);

    } catch (err) {
      console.log(err.stack);
    }

    // Close connection
    client.close();
  })();
}
