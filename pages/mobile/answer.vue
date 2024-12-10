<template>
  <div>
    <h1>PeerJS</h1>
	<div>{{ message }}</div>
	<button @click="connect">connect</button>
    <video id="video" autoplay></video>
  </div>
</template>

<script setup>
import { Peer } from "peerjs";
const message = ref("");

let peer;
onMounted(() => {
	peer = new Peer("selber", {
		host: location.hostname,
		port: 9000,
		path: "/myapp",
		secure: false
	});
});

const connect = () => {
	const conn = peer.connect("krasse");
	conn.on("open", () => {
		conn.send("hi selber from krasse!");
	});

	peer.on("connection", (conn) => {
		conn.on("data", (data) => {
			// Will print 'hi!'
			console.log(data);
		});
		conn.on("open", () => {
			conn.send("hello!");
		});
	});
};
</script>