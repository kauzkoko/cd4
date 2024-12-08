// import { Server } from 'socket.io';

// // Create Socket.IO server instance
// const io = new Server({
//   cors: {
//     origin: "*", // Accept all origins
//     methods: ["GET", "POST"]
//   }
// });

// // Listen on port 3001 (or your preferred port)
// io.listen(3001);

// // Add this data storage at the top
// const dataStores = {
//     "accel": [],
//     "gyro": [],
//     "magnet": []
// };

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.broadcast.emit('connection');  // Notify others of new connection
  
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
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
//     console.log('magnet data received:', data);
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