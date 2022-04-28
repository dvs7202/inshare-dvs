const File = require("./models/FileModel");
const fs = require("fs");
const connectDB = require("./config/db");

connectDB();

async function fetchData() {
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = await File.find({ createdAt: { $lt: pastDate } });
  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`successfully deleted ${file.filename}`);
      } catch (err) {
        console.log(`Error while deleteing file ${err}`);
      }
    }
    console.log("job done");
  }
}

fetchData().then(process.exit);
