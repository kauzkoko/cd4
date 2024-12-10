<template>
  <div>
    <h1>Websocket</h1>
    <button @click="send('hello from mobile')">Send</button>
    <div>{{ data }}</div>
  </div>
</template>

<script setup>
const { status, data, send, open, close } = useWebSocket('wss://192.168.2.1:4444/_ws')

watch(data, (newData) => {
  console.log(newData)
})
</script>