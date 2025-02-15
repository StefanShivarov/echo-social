const app = require("./app");
const { sequelize } = require("./config/databaseConfig");
const { Server } = require("socket.io");
const Message = require("./models/Message");
const http = require("http");
const PORT = 3000;

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL!");
    require("./models");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully!");
  } catch (err) {
    console.error("Could not connect to database: ", err.message);
  }
};

(async () => {
  try {
    await connectToDatabase();

    const server = http.createServer(app);
    const io = new Server(server);

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("joinChat", async ({ chatId }) => {
        console.log("User joined ", chatId);
        socket.join(chatId);
      });

      socket.on("sendMessage", async ({ chatId, senderId, content }) => {
        const message = await Message.create({ chatId, senderId, content });
        io.to(chatId).emit("receiveMessage", message);
        console.log("Emitted: ", message);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected.");
      });
    });

    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });

    const shutdown = () => {
      console.log("Shutting down...");
      sequelize
        .close()
        .then(() => {
          console.log("Database connection closed.");
          server.close(() => {
            console.log("Server closed.");
            process.exit(0);
          });
        })
        .catch((err) => {
          console.error("Error closing the database connection: ", err.message);
          process.exit(1);
        });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("Error starting the app:", err.message);
  }
})();
