const jwt = require("jsonwebtoken");
/**
 *
 * @param {SocketIO.Server} io
 */
function connectIO(io, sockets) {
  io.on("connection", socket => {
    decodeToken(socket.handshake.query.token, socket);
    if (!sockets[socket.identity.username]) {
      socket.broadcast.emit("connection", { obj: "null" });
      sockets[socket.identity.username] = socket;
      socket.on("sendmessage", args => {
        io.to(`${sockets[args.userID].id}`).emit("incoming", {
          message: args.message
        });
      });
      socket.on("disconnect", () => {
        socket.broadcast.emit("disconnection");
        delete sockets[socket.identity.username];
      });
    }
  });
}
function decodeToken(token, socket) {
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) return;
    socket.identity = decode.user;
  });
}
module.exports = connectIO;
