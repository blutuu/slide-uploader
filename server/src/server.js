// An express server with a simple initial route.
import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";

const app = express();
const port = process.env.PORT || 8000;

// set up multer with a destination and filename
const storage = multer.diskStorage({
  // The file destination
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // The file name with the original extension
  filename: function (req, file, cb) {
    cb(null, file.originalname.slice(0, -3) + file.mimetype.slice(6));
  },
});
const upload = multer({ storage: storage });

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
  console.log(req.files[0]);
  res.json({ requestBody: req.body });
});

app.listen(port, () => console.log("Listening on port 8000"));
