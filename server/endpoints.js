const express = require("express");
const sshClient = require("ssh2");

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

  const conn = new sshClient();
  conn
    .on("ready", () => {
      console.log("sshClient :: ready");
      // Join the commands array into a single command string separated by "&&" to execute them sequentially
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
            res.send(output); // Send the combined output of all commands
          })
          .on("data", (data) => {
            console.log("STDOUT: " + data);
            output += data; // Append each command's output to the output variable
          })
          .stderr.on("data", (data) => {
            console.log("STDERR: " + data);
            res.status(500).send(data.toString());
          });
      });
    })
    .connect({
      host: host,
      port: 22, // Default SSH port
      username: username,
      password: password, // Using password for authentication
    });
};

// Define a route for SSH command execution
endpoints.post("/execute-commands", (req, res) => {
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
