<template>
  <div>
    <h1>Websocket</h1>
    <button @click="send('hello from local')">Send</button>
    <div>{{ data }}</div>
  </div>
</template>

<script setup>
console.log(location.host)
const { status, data, send, open, close } = useWebSocket('wss://' + location.host + '/_ws')

watch(data, (newData) => {
  console.log(newData)
})
</script>