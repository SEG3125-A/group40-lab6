const express = require("express");
const fs = require("fs");
const router = express.Router();

const PUBLIC_DIR = "./public";

router.get("/niceSurvey", (req, res) => {
  res.sendFile(`${PUBLIC_DIR}/index.html`, { root: "." });
});

router.post("/submit", (req, res) => {
  const newData = req.body;
  console.log("New form submission:", newData);

  const DATA_FILE = "./data/submissions.json";

  fs.readFile(DATA_FILE, (err, data) => {
    let currentData = [];
    if (!err) {
      currentData = JSON.parse(data.toString());
    }
    currentData.push(newData);

    fs.writeFile(
      DATA_FILE,
      JSON.stringify(currentData, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error("Failed to save data", writeErr);
          res.status(500).send("Failed to save submission");
          return;
        }
        res.send("Submission saved successfully");
      }
    );
  });
});

// Display the results for analysis
router.get("/analysis", (req, res) => {
  fs.readFile("./data/submissions.json", (err, data) => {
    if (err) {
      console.error("Failed to read data", err);
      res.status(500).send("Failed to load analysis data");
      return;
    }
    res.json(JSON.parse(data));
  });
});

module.exports = router;
