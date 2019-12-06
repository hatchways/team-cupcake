const jwt = require("jsonwebtoken");
/**
 *
 * @param {SocketIO.Server} io
 */
function connectIO(io, sockets) {
  io.on("connection", socket => {
    decodeToken(socket.handshake.query.token, socket);
    if (!socket.identity) {
      socket.disconnect(true);
      return;
    }
    if (!sockets[socket.identity.username]) {
      socket.broadcast.emit("connection", { obj: "null" });
      sockets[socket.identity.username] = socket;
      socket.on("sendmessage", args => {
        if (sockets[args.username]) {
          console.log("sending..");
          io.to(`${sockets[args.username].id}`).emit("incoming", {
            message: args.message,
            from: socket.identity.username
          });
          io.to(`${sockets[args.username].id}`).emit("newmessage", {
            message: "test"
          });
          io.to(`${sockets[args.username].id}`).emit("notify", {
            message: args.message,
            from: socket.identity.username
          });
        }
        socket.emit("sent", { message: args.message });
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
