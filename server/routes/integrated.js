// import { Server } from 'socket.io';
// import WebSocket from 'ws';

// // Create Socket.IO server instance
// const io = new Server({
//   cors: {
//     origin: "*", // Accept all origins
//     methods: ["GET", "POST"]
//   }
// });

// // server ip address is 192.168.41.222
// // Listen on port 3001 (or your preferred port)
// io.listen(3000);

// // Add this data storage at the top
// const dataStores = {
//     "accel": [],
//     "gyro": [],
//     "magnet": []
// };

// // Add WebSocket client connection with network interface specification
// const ws = new WebSocket('wss://192.168.41.62:8080/sensor/connect?type=android.sensor.magnetic_field', {
//   localAddress: '192.168.41.222' // Replace with your WiFi interface IP
// });

// ws.on('open', () => {
//   console.log('Connected to sensor WebSocket');
// });

// ws.on('message', (data) => {
//   const magnetData = JSON.parse(data);
//   console.log(magnetData.values)
//   // // Assuming the data format matches what we need, broadcast it to Socket.IO clients
//   io.emit('magnetAndroid', magnetData.values);
//   // logData('magnet', magnetData);
// });

// ws.on('error', (error) => {
//   console.error('WebSocket error:', error);
// });

// ws.on('close', () => {
//   console.log('Disconnected from sensor WebSocket');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.broadcast.emit('connection');  // Notify others of new connection
  
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('magnetAndroid', (data) => {
//     console.log("forwarded android:", data)
//   });


//   socket.on('acceleration', (data) => {
//     console.log('acceleration data received:', data);
//     logData('accel', data);
//     socket.broadcast.emit('acceleration', data);
//   });

//   socket.on('gyroscope', (data) => {
//     console.log('gyroscope data received:', data);
//     logData('gyro', data);
//     socket.broadcast.emit('gyroscope', data);
//   });

//   socket.on('magnet', (data) => {
//     console.log('magnet data received xxx:', data);
//     logData('magnet', data);
//     socket.broadcast.emit('magnet', data);
//   });
// });

// // Add this helper function at the bottom
// function logData(dataType, data) {
//     dataStores[dataType].push({
//         "x": data[0],
//         "y": data[1],
//         "z": data[2]
//     });
// }