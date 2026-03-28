const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: ["CHANNEL"]
});

client.once("ready", () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

const app = express();
app.use(express.json());

app.post("/senddm", async (req, res) => {
  const { discordId, message } = req.body;

  try {
    const user = await client.users.fetch(discordId);
    await user.send(message);
    res.json({ status: "DM sent" });
  } catch (err) {
    console.error(err);
    res.json({ status: "Failed" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

client.login(process.env.TOKEN);
