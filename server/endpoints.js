const express = require("express");
const { Client, utils } = require("ssh2");

const endpoints = express.Router();

const dbo = require("./db");

const ObjectId = require("mongodb").ObjectId;

/*
 ******************* Tasks Endpoints *******************
 */
const TASKS = "tasks";
endpoints.route("/insertTask").post(async (req, response) => {
  try {
    let db = dbo.getDb();
    db.collection(TASKS).insertOne(req.body);

    response.status(200).json({ message: "task was inserted" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "an error occurred" });
  }
});

endpoints.route("/getTasks").get(async (req, response) => {
  try {
    let db = dbo.getDb();
    var collection = await db
      .collection(TASKS)
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        console.log(result);
      });

    response.json(collection);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "an error occured" });
  }
});

endpoints.route("/updateTask/:id").put(async (req, response) => {
  try {
    let db = dbo.getDb();
    let query = { _id: new ObjectId(req.params.id) };

    var collection = await db.collection(TASKS).updateOne(query, {
      $set: req.body,
    });

    response.json(collection);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "an error occured" });
  }
});

endpoints.route("/deleteTask/:id").delete(async (req, response) => {
  try {
    let db = dbo.getDb();
    let query = { _id: new ObjectId(req.params.id) };

    await db.collection(TASKS).deleteOne(query);

    response.status(200).json({ message: "task successfuly deleted" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "an error occured" });
  }
});

/*
 ******************* Routers Endpoints *******************
 */
const ROUTERS = "routers";
endpoints.route("/insertRouter").post(async (req, response) => {
  try {
    let db = dbo.getDb();
    db.collection(ROUTERS).insertOne(req.body);

    response.status(200).json({ message: "router was inserted" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "an error occurred" });
  }
});

endpoints.route("/getRouters").get(async (req, response) => {
  try {
    let db = dbo.getDb();
    var collection = await db
      .collection(ROUTERS)
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        console.log(result);
      });

    response.json(collection);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "an error occured" });
  }
});

endpoints.route("/deleteRouter/:id").delete(async (req, response) => {
  try {
    let db = dbo.getDb();
    let query = { _id: new ObjectId(req.params.id) };

    await db.collection(ROUTERS).deleteOne(query);

    response.status(200).json({ message: "router successfuly deleted" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "an error occured" });
  }
});

/*
 ******************* Topology Endpoints *******************
 */
const TOPOLOGY = "topology";

endpoints.route("/getTopology").get(async (req, response) => {
  try {
    let db = dbo.getDb();
    var collection = await db
      .collection(TOPOLOGY)
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        console.log(result);
      });

    response.json(collection);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "an error occured" });
  }
});

/*
 ******************* Connection Endpoints *******************
 */

// SSH connection function
const executeSSHCommands = (sshDetails, res) => {
  const { host, username, password, commands } = sshDetails;

  const conn = new Client();
  conn
    .on("ready", () => {
      console.log("Client :: ready");
      const commandString = commands.join(" && ");

      conn.exec(commandString, (err, stream) => {
        if (err) throw err;
        let output = "";
        stream
          .on("close", (code, signal) => {
            console.log(
              "Stream :: close :: code: " + code + ", signal: " + signal
            );
            conn.end();
            res.send(output);
          })
          .on("data", (data) => {
            console.log("STDOUT: " + data);
            output += data;
          })
          .stderr.on("data", (data) => {
            console.log("STDERR: " + data);
            res.status(500).send(data.toString());
          });
      });
    })
    .connect({
      host: host,
      port: 22,
      username: username,
      password: password,
      algorithms: {
        cipher: [
          "aes256-cbc", // Your custom cipher
          "aes128-ctr",
          "aes192-ctr",
          "aes256-ctr", // Common defaults
          "aes128-gcm",
          "aes128-gcm@openssh.com",
          "aes256-gcm",
          "aes256-gcm@openssh.com", // More defaults, including GCM for newer versions
        ],
        hostKeyAlgorithms: [
          "ssh-rsa", // Your custom host key algorithm
          "ssh-ed25519",
          "ecdsa-sha2-nistp256", // Common defaults
          "ecdsa-sha2-nistp384",
          "ecdsa-sha2-nistp521", // More ECDSA defaults
        ],
        kex: [
          "diffie-hellman-group1-sha1", // Your custom KEX algorithm
          "ecdh-sha2-nistp256",
          "ecdh-sha2-nistp384",
          "ecdh-sha2-nistp521", // ECDH defaults
          "diffie-hellman-group-exchange-sha256", // DH group exchange
          "diffie-hellman-group14-sha256", // More secure DH defaults
        ],
        serverHostKeyAlgs: [
          "ssh-rsa", // Your custom public key algorithm for server host keys
          "ssh-ed25519",
          "ecdsa-sha2-nistp256", // Common defaults
          "ecdsa-sha2-nistp384",
          "ecdsa-sha2-nistp521", // More ECDSA defaults
        ],
      },
    });
};

endpoints.post("/executeCommands", (req, res) => {
  const { host, username, password, commands } = req.body;
  if (
    !host ||
    !username ||
    !password ||
    !Array.isArray(commands) ||
    commands.length === 0
  ) {
    return res
      .status(400)
      .send(
        "Host, username, password, and commands (as an array) are required"
      );
  }

  const sshDetails = { host, username, password, commands };
  executeSSHCommands(sshDetails, res);
});

module.exports = endpoints;
