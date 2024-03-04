const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const surveyController = require("./controllers/surveyController");

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

//surveyController for routes
app.use("/", surveyController);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
