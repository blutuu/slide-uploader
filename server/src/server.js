// An express server with a simple initial route.
import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";
import fs from "fs";

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
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

//////////////////////////////
//  *  Endpoints            //
//////////////////////////////

app.get("/api", (req, res) => {
  res.status(200).send("Hello from the API");
});

app.post("/api/upload", upload.array("image_file"), (req, res) => {
  console.log(req.files[0]);
  res.status(200).json({ requestBody: req.body });
});

// An endpoint that sends all files from the uploads folder
app.get("/api/images", (req, res) => {
  const data = [];
  const directoryPath = path.join(__dirname, "../uploads");

  // Read all files from the uploads folder

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }

    // Read each file and get its contents

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      // data[file] = fs.readFileSync(filePath, "base64");
      data.push({
        name: file,
        url: `http://localhost:8000/uploads/${file}`,
      });
    });
    res.status(200).json(data);
  });
});

app.listen(port, () => console.log("Listening on port 8000"));
