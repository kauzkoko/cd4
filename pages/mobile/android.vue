<template>
  <div>
    <h1>Android</h1>
    <div>Alpha: {{ alpha.toFixed(2) }} </div>
    <button @click="setZeroPoint">Set zero point</button>
    <button @click="snapshot">Take snapshot</button>
  </div>
</template>

<script setup>
const { status, data, send, open, close } = useWebSocket('ws://localhost:8765')

function setZeroPoint() {
  window.removeEventListener('deviceorientation', handleAndroid);
  window.addEventListener('deviceorientation', handleAndroid);
}

function snapshot() {
  send(JSON.stringify({ type: 'snapshot' }))
}

const alpha = ref(0)
function handleAndroid() {
  alpha.value = event.alpha - 90
  send(JSON.stringify({ type: 'orientation', value: alpha.value }))
}
</script>