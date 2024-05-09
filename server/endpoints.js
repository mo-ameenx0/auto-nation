const express = require("express");
const SSH2Shell = require("ssh2shell");

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
const ALGORITHMS = {
  cipher: [
    "aes256-cbc",
    "aes128-ctr",
    "aes192-ctr",
    "aes256-ctr",
    "aes128-gcm",
    "aes128-gcm@openssh.com",
    "aes256-gcm",
    "aes256-gcm@openssh.com",
  ],
  hostKeyAlgorithms: [
    "ssh-rsa",
    "ssh-ed25519",
    "ecdsa-sha2-nistp256",
    "ecdsa-sha2-nistp384",
    "ecdsa-sha2-nistp521",
  ],
  kex: [
    "diffie-hellman-group1-sha1",
    "ecdh-sha2-nistp256",
    "ecdh-sha2-nistp384",
    "ecdh-sha2-nistp521",
    "diffie-hellman-group-exchange-sha256",
    "diffie-hellman-group14-sha256",
  ],
  serverHostKeyAlgs: [
    "ssh-rsa",
    "ssh-ed25519",
    "ecdsa-sha2-nistp256",
    "ecdsa-sha2-nistp384",
    "ecdsa-sha2-nistp521",
  ],
};

const executeSSHCommands = (sshDetails, res) => {
  const { host, username, password, commands } = sshDetails;

  let commandResponses = [];

  let SSHHost = {
    server: {
      host: host,
      port: 22,
      userName: username,
      password: password,
      algorithms: ALGORITHMS,
    },
    commands: commands,
    readyTimeout: 50000,
    idleTimeOut: 15000,
    connectedMessage: "connected",
    readyMessage: "ready",
    closedMessage: "closed",
    msg: {
      send: function (message) {
        console.log("message: " + message);
      },
    },
    onCommandComplete: function (command, response, sshObj) {
      commandResponses.push({ command, response });
    },
    onEnd: function (sessionText, sshObj) {
      res.status(200).json(commandResponses);
    },
  };

  let ssh = new SSH2Shell(SSHHost);

  ssh.on("error", function (err, type, close, callback) {
    console.log("Error occurred: " + err);

    res.status(500).json({ error: err.toString(), commandResponses });
  });

  ssh.connect();
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

const checkConnectivity = (devices, res) => {
  const connectivityResults = {};
  let completedSessions = 0; // Track the number of completed SSH sessions
  let errorOccurred = false; // Flag to track if any error occurred

  devices.forEach((sourceDevice) => {
    // Initialize results array for the source device
    connectivityResults[sourceDevice.name] = [];

    // Generate ping commands to all other devices
    const pingCommands = devices
      .filter((targetDevice) => targetDevice.ip !== sourceDevice.ip)
      .map((targetDevice) => `ping ${targetDevice.ip}`);

    let SSHHost = {
      server: {
        host: sourceDevice.ip,
        port: 22,
        userName: sourceDevice.username,
        password: sourceDevice.password,
        algorithms: ALGORITHMS,
      },
      commands: pingCommands,
      readyTimeout: 50000,
      idleTimeOut: 15000,
      connectedMessage: "connected",
      readyMessage: "ready",
      closedMessage: "closed",
      onCommandComplete: function (command, response, sshObj) {
        if (response.includes("100 percent")) {
          const targetName = devices.find(
            (d) => `ping ${d.ip}` === command
          ).name;
          connectivityResults[sourceDevice.name].push(targetName);
        }
      },
      onEnd: function (sessionText, sshObj) {
        completedSessions++;
        if (completedSessions === devices.length && !errorOccurred) {
          res.status(200).json(connectivityResults);
        }
      },
    };

    let ssh = new SSH2Shell(SSHHost);

    ssh.on("error", function (err, type, close, callback) {
      console.log("Error occurred: " + err);
      if (!errorOccurred) {
        errorOccurred = true; // Set error flag
        res.status(500).json({ error: err.toString(), connectivityResults });
      }
    });

    ssh.connect();
  });
};

endpoints.post("/checkConnectivity", (req, res) => {
  const { devices } = req.body;

  if (!Array.isArray(devices) || devices.length === 0) {
    return res.status(400).send("Devices as an array is required");
  }

  checkConnectivity(devices, res);
});

module.exports = endpoints;
