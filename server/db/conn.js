const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

var _db;

module.exports = {
  connectToServer: async () => {
    try {
      await client.connect();
      _db = client.db("AutoNationDB");
      console.log("Successfully connected to MongoDB.");
    } catch (err) {
      console.error("Could not connect to MongoDB", err);
      throw err;
    }
  },

  getDb: () => {
    if (!_db) {
      throw new Error("Database not initialized. Call connectToServer first.");
    }
    return _db;
  },
};
