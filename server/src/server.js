// An express server with a simple initial route.
import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "../build")));
app.use(express.json());
app.use(cors());

//////////////////////////////
//  *  Endpoints            //
//////////////////////////////

app.get("/api", (req, res) => {
  res.send("Hello from the API");
});

app.post("/api/upload", upload.array("image_file"), (req, res) => {
  console.log(req.body);
  res.send("File uploaded");
});

app.listen(port, () => console.log("Listening on port 8000"));
