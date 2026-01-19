// 1- Use a readable stream to read a file in chunks and log each chunk
// const fs = require("node:fs");

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

// Part2: Simple CRUD Operations Using HTTP ( 5.5 Grades):
// For allthe following APIs, you must use the fs module to read and write data from a JSON file (e.g., users.json).

// API Link :
// https://engqusaykhudair-3998430.postman.co/workspace/Qusay-khudair~568573bb-c91b-4ecb-8c96-f9b238494064/collection/47725764-9fb0a1d0-e030-4459-9bdf-18100d92a1db?action=share&source=copy-link&creator=47725764

// const http = require("node:http");
// const path = require("node:path");

// const filePath = path.join(__dirname, "users.json");
// const server = http.createServer((req, res) => {

//   Create User
//   if (req.method === "POST" && req.url === "/user") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });
//     req.on("end", () => {
//       const { name, age, email } = JSON.parse(body);
//       const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
//       const emailExists = users.find((user) => user.email === email);
//       if (emailExists) {
//         res.writeHead(400, { "Content-Type": "application/json" });
//         return res.end(JSON.stringify({ message: "Email already exists" }));
//       }
//       const newUser = {
//         id: Date.now(),
//         name,
//         age,
//         email,
//       };

//       users.push(newUser);
//       fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
//       res.writeHead(201, { "Content-Type": "application/json" });
//       res.end(
//         JSON.stringify({
//           message: "User added successfully",
//         }),
//       );
//     });
//   }

//   Update User
//   else if (req.method === "PATCH" && req.url.startsWith("/user/")) {
//     const id = Number(req.url.split("/").filter(Boolean)[1]);
//     let body = "";

//     req.on("data", (chunk) => {
//       body += chunk;
//     });

//     req.on("end", () => {
//       const updatedData = JSON.parse(body);
//       const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

//       const userIndex = users.findIndex((user) => Number(user.id) === id);
//       if (userIndex === -1) {
//         res.writeHead(404, { "Content-Type": "application/json" });
//         return res.end(JSON.stringify({ message: "User not found" }));
//       }

//       users[userIndex] = {
//         ...users[userIndex],
//         ...updatedData,
//       };

//       fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(
//         JSON.stringify({
//           message: "User updated successfully",
//           user: users[userIndex],
//         }),
//       );
//     });
//   }

//    Delete User
//   else if (req.method === "DELETE" && req.url.startsWith("/user/")) {
//     const id = Number(req.url.split("/")[2]);
//     const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

//     const newUsers = users.filter((user) => user.id !== id);

//     if (newUsers.length === users.length) {
//       res.writeHead(404, { "Content-Type": "application/json" });
//       return res.end(JSON.stringify({ message: "User not found" }));
//     }

//     fs.writeFileSync(filePath, JSON.stringify(newUsers, null, 2));

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "User deleted successfully" }));
//   }

//    Get All Users
//   else if (req.method === "GET" && req.url === "/user") {
//     const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(users));
//   }

//    Get User by ID
//   else if (req.method === "GET" && req.url.startsWith("/user/")) {
//     const id = Number(req.url.split("/")[2]);
//     const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

//     const user = users.find((user) => user.id === id);
//     if (!user) {
//       res.writeHead(404, { "Content-Type": "application/json" });
//       return res.end(JSON.stringify({ message: "User not found" }));
//     }

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(user));
//   }
// });

// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// 1- What is the Node.js Event Loop?
// The Node.js Event Loop is a core mechanism that allows Node.js to perform non-blocking I/O operations and handle thousands of concurrent connections using a single JavaScript thread. It orchestrates the execution of synchronous and asynchronous code by managing callbacks and offloading tasks to the system kernel or a separate thread pool implemented by the libuv library.

// 2- What is Libuv and What Role Does It Play in Node.js?
// Libuv is a multi-platform C library that provides the core engine for asynchronous I/O operations and the event loop in Node.js. It is crucial for enabling Node.js's non-blocking, event-driven architecture, allowing it to handle many concurrent operations efficiently despite JavaScript itself being single-threaded.

// Role of Libuv in Node.js
// Libuv acts as a bridge between the JavaScript code and the underlying operating system, managing system-level tasks without blocking the main JavaScript execution thread.
// Its primary roles and components include:
// Implementing the Event Loop: Libuv provides the event loop, which is the heart of the Node.js concurrency model. This loop continuously monitors for events (like completed I/O operations, timer expirations, network connections) and dispatches their associated callbacks to the main thread's call stack when it is free.
// Asynchronous I/O Operations: It handles non-blocking operations for tasks such as:
// File System (fs module): Manages reading from and writing to files.
// Networking: Handles TCP and UDP sockets and HTTP requests efficiently by using OS-specific mechanisms like epoll (Linux), kqueue (macOS), and IOCP (Windows).
// DNS lookups and timers.
// Managing a Thread Pool: For operations that are inherently blocking at the operating system level (such as file system access, DNS queries, and CPU-intensive tasks like cryptography or compression), Libuv uses an internal pool of worker threads. It offloads these tasks to the thread pool, ensuring that the main event loop remains free and responsive to other events.
// Cross-Platform Compatibility: Libuv abstracts the differences between various operating systems, providing a consistent API for Node.js developers. This ensures that Node.js applications can run seamlessly across different platforms.
// In essence, Libuv is the "secret sauce" that allows Node.js to perform tasks like handling thousands of network requests concurrently without the main JavaScript thread ever pausing to wait for an I/O operation to complete.

// 3- How Does Node.js Handle Asynchronous Operations Under the Hood ?
// Node.js handles asynchronous operations through a sophisticated architecture centered on a single-threaded Event Loop and the libuv library, which manages system interactions and a configurable thread pool.

// Summary of the Flow :

// 1- JavaScript code on the main thread calls an async function (e.g., fs.readFile() or a network request).
// 2- libuv offloads the work to either the OS async APIs or the thread pool.
// 3- The main thread continues executing the rest of the JavaScript code immediately.
// 4- When the background task completes, its callback is added to a queue.
// 5- The Event Loop constantly checks the queues and, when the main call stack is empty, pulls the next callback into the call stack to be executed by the V8 engine.
// This non-blocking, event-driven architecture allows a single Node.js process to handle thousands of concurrent I/O-bound requests efficiently with minimal overhead.

// 4- What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js?

// Call Stack: This is part of the JavaScript engine itself. It is where all synchronous code is run. When a function is called, it's pushed onto the stack, and when it returns, it's popped off. Because there is only one call stack, JavaScript can only execute one function at a time. Long-running synchronous functions in the call stack will "block" the main thread, making the application unresponsive.
// Event Queue (also known as Callback Queue or Macrotask Queue): This queue is part of the Node.js runtime, not the core JavaScript engine. When an asynchronous operation (like setTimeout, I/O operations, or event handlers) finishes, its associated callback function is sent to the event queue. It acts as a waiting room for tasks that are ready to be executed but must wait for the call stack to be empty. Node.js also has a separate Microtask Queue (for Promises and process.nextTick), which has higher priority and is processed before the regular event queue.
// Event Loop: This is the continuous process that coordinates between the Call Stack and the queues. Its primary job is to check if the Call Stack is empty. If the stack is clear, it takes the first pending callback from the appropriate queue (prioritizing the microtask queue, then the event queue) and pushes it onto the Call Stack to be run. This mechanism is what enables Node.js to handle non-blocking asynchronous operations efficiently.

// 5- What is the Node.js Thread Pool and How to Set the Thread Pool Size?
// The Node.js Thread Pool is a collection of worker threads, managed by the libuv library, used to handle "expensive" or blocking operations outside the main JavaScript event loop. This prevents these tasks (e.g., file system access, DNS lookups, and cryptography) from blocking the main thread and slowing down the application.
// The default thread pool size is 4, and it can be changed at runtime or startup by setting the UV_THREADPOOL_SIZE environment variable.

// 6- How Does Node.js Handle Blocking and Non-Blocking Code Execution?
// Node.js handles blocking and non-blocking code execution primarily through its single-threaded Event Loop and a supplementary Worker Pool (threadpool). This architecture allows it to manage many concurrent operations efficiently without the overhead of traditional multi-threaded models.

// How Non-Blocking Code is Handled

// Non-blocking operations, typically I/O-bound tasks (like reading files, network requests, or database queries), are the core of Node.js's efficiency.

// 1- Delegation: When non-blocking I/O is initiated (using asynchronous methods like fs.readFile() or http.get()), the operation is offloaded from the main JavaScript thread to the system kernel or the libuv library's worker pool.
// 2- Event Loop Continues: The main Event Loop continues to execute other JavaScript code and process other client requests, remaining responsive.
// 3- Notification and Callback: Once the I/O operation is complete, the kernel or worker thread notifies the Event Loop. The associated callback function is then placed in a queue (e.g., the poll queue or I/O callbacks queue).
// 4- Execution: When the Event Loop's call stack is empty, it picks up the callback from the queue and executes the JavaScript code to handle the result (e.g., processing the file data or database response).

// Modern asynchronous syntax like Promises and async/await provides a cleaner, more readable way to manage this flow, abstracting away "callback hell".

// How Blocking Code is Handled

// Blocking code (synchronous operations) stops the execution of all additional JavaScript code in the Node.js process until the current operation is completed. This can cause performance bottlenecks and denial-of-service issues in a server environment, as other client requests have to wait.
// CPU-Intensive Tasks: Long-running JavaScript computations (e.g., complex loops, heavy data processing) run entirely on the single Event Loop thread and will "block" it, preventing any other events or callbacks from being processed.
// Synchronous APIs: Node.js core modules provide synchronous versions of some APIs (e.g., fs.readFileSync(), crypto.pbkdf2Sync()), which force the main thread to wait until the operation finishes.
