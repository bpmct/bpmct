const { WebClient } = require("@slack/web-api");

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const web = new WebClient(token);

const slackStatus = async (req, res) => {
  let result;
  let message = "error";
  let color = "critical";
  let labelColor = "ECB22E";
  try {
    const result = await web.users.getPresence({
      user: "U01BE2Z4U82",
      token,
    });
    message = result.presence;
    if (message == "active") {
      color = "success";
      labelColor = "2EB67D";
      message = "🟢 online";
    } else if (message == "away") {
      labelColor = "ECB22E";
      message = "🟡 away";
    } else color = "lightgrey";
  } catch (error) {}

  res.status(200).json({
    schemaVersion: 1,
    label: "slack",
    labelColor,
    message,
    color: "#555555",
    style: "flat-square",
  });
};

export default slackStatus;
