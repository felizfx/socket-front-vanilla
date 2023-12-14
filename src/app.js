import express from "express";
import url from "url";
import path from "path";

const app = express();

const currentPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentPath, "../..", "public");

app.use(express.static(publicDirectory));

export default app;