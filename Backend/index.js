import express from "express";
import { connectDB } from "./utils/db.js";
const app = express();
const port = 3000;

await connectDB();

import { createSampleCategories } from "./utils/samplecategory.js";

createSampleCategories();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//TEST TEST          TEST          TEST
