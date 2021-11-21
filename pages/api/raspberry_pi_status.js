// this is actually useless but my raspberry pi is on 24/7 so no biggie

// TODO: actually check the status of the raspberry pi

const slackStatus = async (req, res) => {
  res.status(200).json({
    schemaVersion: 1,
    label: "My Raspberry Pi",
    message: "🟢 Online",
    color: "#555555",
    style: "flat-square",
  });
};

export default slackStatus;
