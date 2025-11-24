import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

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

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

// todo Write data to file
const storeData = () => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

app.get("/data", (req, res) => {
  res.json(data.tweets);
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
