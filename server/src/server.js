// An express server with a simple initial route.
import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import npmlog from "npmlog";

const app = express();
const port = process.env.PORT || 8000;
const log = npmlog;

// set up multer with a destination and filename
const storage = multer.diskStorage({
  // The file destination
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // The file name with the original extension
  filename: function (req, file, cb) {
    console.log(file);

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
  log.info("Uploading images", "Files successfully uploaded");
  res.status(200).send("Files uploaded successfully");
});

// An endpoint that sends all files from the uploads folder
app.get("/api/images", async (req, res) => {
  const data = [];
  const directoryPath = path.join(__dirname, "../uploads");

  // Read all files from the uploads folder

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      fs.mkdirSync("./uploads");
      log.error("Getting images", "Unable to scan directory: " + err);
      return res.status(500).send("Unable to scan directory: " + err);
    }

    if (files.length == 0) {
      log.info("Getting images", "Uploads directory empty.");
      return res.status(200).send("No uploads available.");
    }

    // Read each file and get its contents
    files.forEach((file, index) => {
      data.push({
        name: file,
        url: `http://localhost:8000/uploads/${file}`,
        changesMade: false,
        position: index,
      });
    });

    log.info("Getting images", "Files successfully retrieved");
    res.status(200).json(data);
  });
});

// An endpoint that deletes a file from the uploads folder
app.delete("/api/images/:name", (req, res) => {
  const directoryPath = path.join(__dirname, "../uploads");
  const filePath = path.join(directoryPath, req.params.name);

  fs.unlink(filePath, (err) => {
    if (err) {
      log.error("Deleting image", "Unable to delete file: " + err);
      return res.status(500).send("Unable to delete file: " + err);
    }

    log.info("Deleting image", "File successfully deleted");
    res.status(200).send("File successfully deleted");
  });
});

app.listen(port, () => console.log("Listening on port 8000"));
