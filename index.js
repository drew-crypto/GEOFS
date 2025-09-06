const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
    console.log("Nouvel utilisateur connecté");

    socket.on("join", (username) => {
        socket.username = username;
        console.log(`${username} a rejoint`);
    });

    socket.on("chatMessage", (data) => {
        io.emit("chatMessage", {
            channel: data.channel,
            user: socket.username,
            text: data.text
        });
    });

    socket.on("disconnect", () => {
        console.log(`${socket.username} s'est déconnecté`);
    });
});

server.listen(PORT, () => {
    console.log(`Serveur Socket.IO lancé sur le port ${PORT}`);
});
