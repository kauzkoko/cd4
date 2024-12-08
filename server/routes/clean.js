import { Server } from 'socket.io';
import WebSocket from 'ws';

// ==================== socketio

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// server ip address is 192.168.41.222
io.listen(3000);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('magnet', (data) => {
    console.log('iphone magnet data:', data);
    socket.broadcast.emit('iphonemagnet', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// =================== websocket

const ws = new WebSocket('wss://192.168.41.62:8080/sensor/connect?type=android.sensor.magnetic_field', {
  // localAddress: '192.168.41.222'
});

ws.on('message', (data) => {
  const magnetAndroid = JSON.parse(data);
  console.log(magnetAndroid.values)
  io.emit('magnetAndroid', magnetAndroid.values);
});


ws.on('open', () => {
  console.log('Connected to sensor WebSocket');
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

ws.on('close', () => {
  console.log('Disconnected from sensor WebSocket');
});