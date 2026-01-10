// 1- Use a readable stream to read a file in chunks and log each chunk
const fs = require("node:fs");

// const readableStream = fs.createReadStream("./big.txt", {
//   encoding: "utf-8",
// });

// readableStream.on("data", (chunk) => {
//   console.log("Chunk received:");
//   console.log(chunk);
// });

// readableStream.on("end", () => {
//   console.log("Finished reading file.");
// });

// 2- Use readable and writable streams to copy content from one file to another
// const readableStream = fs.createReadStream("./source.txt");
// const writableStream = fs.createWriteStream("./dest.txt");

// readableStream.on("data", (chunk) => {
//   writableStream.write(chunk);
// });

// readableStream.on("end", () => {
//   writableStream.end();
//   console.log("File copied using streams");
// });

// 3 - Create a pipeline that reads a file, compresses it, and writes it to another file

// const zlib = require("zlib");
// const { pipeline } = require("stream");
// pipeline(
//   fs.createReadStream("./data.txt"),
//   zlib.createGzip(),
//   fs.createWriteStream("./data.txt.gz"),
//   (err) => {
//     if (err) {
//       console.error("Pipeline failed:", err);
//     } else {
//       console.log("File compressed successfully");
//     }
//   }
// );
