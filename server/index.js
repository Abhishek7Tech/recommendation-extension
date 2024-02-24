const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
const port = 7000;
app.use(express.json());


app.post("/", async (req, res) => {
  try {
    if (!req.body) return;
    const {urls} = req.body;
    console.log("URLS", urls);

    const addRatings = urls.map((url) => {
        const rating = generateRandomString();
        return { url, rating };
      });


    res.status(200).send(addRatings);
  } catch (err) {
    console.log("ERROR in handling post req.", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("GOOO");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});



function generateRandomString() {
  const characters = "ABC0123456789+*.?";
  const maxLength = 1;
  let randomString = "";

  const firstChar = characters.charAt(Math.floor(Math.random() * characters.length));
  randomString += firstChar;

  for (let i = 0; i < Math.floor(Math.random() * maxLength) + 1; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}
