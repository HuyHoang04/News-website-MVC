import express from "express";
import { connectDB } from "./utils/db.js";
const app = express();
const port = 3000;

await connectDB();

// import { createSampleTags } from "./utils/sampletag.js";

// createSampleTags();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
