const express = require('express');
const { AutoClient } = require("discord-auto-rpc");
const cors = require('cors');
const app = express();
const port = 6729;

const client = new AutoClient({ transport: "ipc" });
client.on("ready", () => {
  console.log("Discord RPC connected");
});

app.use(cors({ origin: 'http://localhost:5173'}));
app.use(express.json());

app.post('/api/discord/init', (req, res) => {
  client.endlessLogin({ clientId: "1126479353123971072" });
});

// setActivity
app.post('/api/discord/setActivity', (req, res) => {
  client.setActivity(req.body);
  res.json({ msg: "success" });
});

app.post('/api/discord/clearActivity', (req, res) => {
  client.clearActivity();
  res.json({ msg: "success" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
