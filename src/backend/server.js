import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
console.log(data);

let id = 3;

// * Write data to file

const storeData = () => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

app.get("/api/tweets", (req, res) => {
  res.json(data.tweets);
});

// * add tweets data

app.post("/api/tweets", (req, res) => {
  const { content, author } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).send("content must be add");
  }

  const createTweet = {
    id: id++,
    content: content.trim(),
    author: author || "anonymous",
    likes: 0,
    createdAt: new Date().toISOString(),
    edited: false,
  };

  data.tweets.push(createTweet);
  storeData();
  res.json(createTweet);
});

// ! delete Data

app.delete("/api/tweets/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = data.tweets.findIndex((tweet) => tweet.id === id);

  if (index === -1) {
    return res.status(404).json({ err: "not found" });
  }

  data.tweets.splice(index, 1);
  storeData();
  res.send("data deleted");
});

// * update tweet

app.put("/api/tweets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { content } = req.body;

  const tweet = data.tweets.find((tweet) => tweet.id === id);

  if (!tweet) {
    return res.status(404).json({ err: "tweet not found" });
  }

  if (!content || content.trim() === "") {
    return res.status(400).send("content must be add");
  }

  tweet.content = content.trim();
  tweet.edited = true;

  storeData();

  res.send(tweet);
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});

// trial dummy data

// const tweets = [
//   {
//     id: 1,
//     content:
//       "Just launched my Twitter clone with React + Node.js! Feeling proud",
//     author: "DevKing",
//     likes: 892,
//     createdAt: "2025-04-05T10:30:00.000Z",
//   },
//   {
//     id: 2,
//     content: "Tailwind CSS is love. Change my mind.",
//     author: "CSSWizard",
//     likes: 1205,
//     createdAt: "2025-04-05T09:15:22.000Z",
//   },
// ];
