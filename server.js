const app = require("./app");
const dotenv = require("dotenv");
//handling uncaught exception
const connectDatabase = require("./config/database");

process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting Down the server due to uncaught Exception`);
  process.exit(1);
});
//config
dotenv.config({ path: "./config/config.env" });
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting Down the server due to unhandled Promise Rejcetion`);
  server.close(() => {
    process.exit(1);
  });
});