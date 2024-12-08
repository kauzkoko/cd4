<template>
    <h1>Final</h1>
    <h2>Magnet Android: {{ androidMagnet }}</h2>
    <h2>Magnet iPhone: {{ iphoneMagnet }}</h2>
</template>

<script setup>
import { io } from "socket.io-client";

const androidMagnet = ref({});
const iphoneMagnet = ref([]);


const socket = io("192.168.41.222:3000");

socket.on("connect", () => {
    console.log("connected")
});

socket.on("disconnect", () => {
    console.log("disconnected")
});

socket.on("iphonemagnet", (...args) => {
    console.log("magnet received", ...args)
    iphoneMagnet.value = args[0]
});



// Use the native WebSocket API
const ws = new WebSocket('ws://192.168.41.62:8080/sensor/connect?type=android.sensor.magnetic_field');

ws.onmessage = (event) => {
    androidMagnet.value = JSON.parse(event.data).values;
};

ws.onerror = (error) => {
    console.error('WebSocket Error:', error);
};

ws.onclose = () => {
    console.log('WebSocket connection closed.');
};
</script>