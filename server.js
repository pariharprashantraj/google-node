// server.js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Proxy route to handle form submissions
app.post("/submit", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const response = await axios.post(
      "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdnylb1f9Hod-ZeVsbtP3m8aWxfIjgUc_i8NBT6eSYILR0MSw/formResponse?access_key=",
      new URLSearchParams({
        "entry.1319179261": name,
        "entry.757630679": email,
        "entry.1488373294": phone,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Send back the response from Google Forms
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while submitting the form.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
