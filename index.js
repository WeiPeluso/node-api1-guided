//import express from 'express' // es6 module

const express = require("express"); // common js module, equivalent to above
const shortid = require("shortid");
const server = express();
server.use(express.json());
const PORT = 8000;
let hubs = [
  {
    id: shortid.generate(),
    name: "web 30 node intro",
    lessonId: 1,
    cohort: "web 30",
  },
  {
    id: shortid.generate(),
    name: "web 30 java intro",
    lessonId: 101,
    cohort: "web 30",
  },
];

let lessons = [
  {
    id: shortid.generate(),
    name: "node intro",
  },
  {
    id: shortid.generate(),
    name: "java intro",
  },
];

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

server.get("/", (req, res) => {
  res.send("<h1>Hello web31 </h1>");
});

server.get("/api/hubs", (req, res) => {
  res.json(hubs);
});

server.get("/api/lessons", (req, res) => {
  res.json(lessons);
});

server.post("/api/hubs", (req, res) => {
  const newHub = req.body; // needs express.json() middleware
  newHub.id = shortid.generate();
  hubs.push(newHub);
  res.json(newHub);
});

server.post("/api/lessons", (req, res) => {
  const newLesson = req.body; // needs express.json() middleware
  newLesson.id = shortid.generate();
  lessons.push(newLesson);
  res.json(newLesson);
});

server.delete("/api/hubs/:id", (req, res) => {
  const id = req.params.id;
  const deleted = hubs.find((h) => h.id !== id);
  hubs = hubs.filter((h) => h.id !== id);

  res.json(deleted);
});

server.delete("/api/lessons/:id", (req, res) => {
  const id = req.params.id;
  const deleted = lessons.find((h) => h.id !== id);
  lessons = lessons.filter((h) => h.id !== id);

  res.json(deleted);
});

server.put("/api/hubs/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  const found = hubs.find((h) => h.id === id);
  console.log(found);

  if (found) {
    //found
    Object.assign(found, changes);
  } else {
    //didn't find hub with that id
    res.status(404).json({ message: "hub not found!" });
  }
  res.json(found);
});
