const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const clients = {}; 

// Quando um cliente se conecta
io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    
    socket.on('request-camera', (data) => {
        const { cameraId } = data;
        clients[socket.id] = cameraId; // Associa o cliente à câmera.
        console.log(`Cliente ${socket.id} solicitou câmera ${cameraId}`);
        
        // Notifica o transmissor para começar a enviar o stream
        socket.broadcast.emit('new-client', { clientId: socket.id, cameraId });
    });

   
    socket.on('offer', (data) => {
        const { to, offer } = data;
        io.to(to).emit('offer', { from: socket.id, offer });
    });

    
    socket.on('answer', (data) => {
        const { to, answer } = data;
        io.to(to).emit('answer', { from: socket.id, answer });
    });

   
    socket.on('ice-candidate', (data) => {
        const { to, candidate } = data;
        io.to(to).emit('ice-candidate', { from: socket.id, candidate });
    });


    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
        delete clients[socket.id];
        socket.broadcast.emit('client-disconnected', { clientId: socket.id });
    });
});


server.listen(port, () => console.log(`Servidor de sinalização rodando na porta ${port}`));
