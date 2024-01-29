// An express server with a simple initial route.
import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import fsp from "fs/promises";
import npmlog from "npmlog";
import { deleteFiles, reorderFiles, sortFiles } from "./serverhelpers";

const app = express();
const port = process.env.PORT || 8000;
const log = npmlog;

const fileFilter = (req, file, cb) => {
  let filetypes = /jpg|jpeg|png|gif/;
  let mimetype = filetypes.test(file.mimetype);
  let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  log.error(
    "Uploading images",
    "File upload only supports the following filetypes - " + filetypes
  );
  // cb("Error: File upload only supports the following filetypes - " + filetypes);
};

// set up multer with a destination and filename
const storage = multer.diskStorage({
  // The file destination
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // The file name with the original extension
  filename: function (req, file, cb) {
    const mimetype = file.mimetype;
    const regex = /\/(.+)/;
    const extension = mimetype.match(regex)[1];
    // console.log(file);

    cb(null, file.originalname.slice(0, -3) + extension);
  },
});
const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
});

app.use(express.static(path.join(__dirname, "../build")));
app.use(express.json({ limit: "10mb" }));
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
  //console.log(req.files);

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

    sortFiles(files);

    // Read each file and get its contents
    files.forEach((file, index) => {
      data.push({
        name: file,
        saveAsName: file,
        url: `http://localhost:8000/uploads/${file}`,
        changesMade: false,
        position: index,
      });
    });

    log.info("Getting images", "Files successfully retrieved");
    res.status(200).json(data);
  });
});

// An endpoint that deletes files from an array of file names
app.post("/api/images/delete", (req, res) => {
  const directoryPath = path.join(__dirname, "../uploads");
  const files = req.body;

  deleteFiles(files)
    .then(() => {
      reorderFiles().then((data) => {
        console.log(files);
        log.info("Reordering Files(THEN)", data);
      });

      log.info("Deleting images(THEN)", "Files successfully deleted");
      res.status(200).send("Files successfully deleted");
    })
    .catch((error) => {
      log.error("Deleting images(THEN)", "Unable to delete file: " + error);
      res.status(500).send("Unable to delete file: " + error);
    });
});

// An endpoint that reorders the files in the 'uploads' directory
app.post("/api/images/reorder", async (req, res) => {
  await reorderFiles()
    .then((data) => {
      log.info("Reordering Files(THEN)", data);
      res.status(200).send("Files successfully reordered");
    })
    .catch((error) => {
      log.error("Reordering Files", error);
    });
});

app.listen(port, () => console.log("Listening on port 8000"));
