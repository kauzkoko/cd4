<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <!-- <button @click="onClick">Click</button> -->
    <p class="text-2xl">Alpha: {{ alpha.toFixed(2) }}</p>
    <div class="w-full h-80vh flex flex-col children:h-full">
      <button @click="setZeroPoint">Set zero point</button>
      <button @click="snapshot">Take snapshot</button>
      <!-- <button @click="sendAlpha">Send alpha</button> -->
      <button @click="toggleMode">Toggle mode</button>
    </div>

  </div>
</template>

<script setup>
console.log(location.host)
const { status, data, send, open, close } = useWebSocket('wss://' + location.host + '/_ws')

function setZeroPoint() {
  window.removeEventListener('deviceorientation', handleAndroid);
  window.addEventListener('deviceorientation', handleAndroid);
}

function snapshot() {
  send(JSON.stringify({ type: 'snapshot' }))
}

function onClick() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    // Handle iOS 13+ devices.
    DeviceMotionEvent.requestPermission()
      .then((state) => {
        if (state === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          console.error('Request to access the orientation was rejected');
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', handleAndroid);
  }
}

const isAbsolute = ref(false)
const alpha = ref(0)
const compassHeading = ref(0)
const compassAccuracy = ref(0)

function handleOrientation(event) {
  console.log(event)
  alpha.value = event.alpha
  compassHeading.value = event.webkitCompassHeading
  compassAccuracy.value = event.webkitCompassAccuracy
}

function handleAndroid() {
  console.log(event)
  alpha.value = event.alpha
}

let lastSentTime = 0
const SEND_INTERVAL = 100 // Send at most every 100ms

function toggleMode() {
  send(JSON.stringify({ type: 'toggleMode' }))
}

function sendAlpha() {
  const now = Date.now()
  if (now - lastSentTime > SEND_INTERVAL) {
    send(JSON.stringify({
      type: 'alpha',
      value: alpha.value.toFixed(2)
    }))
    lastSentTime = now
  }
}

watch(alpha, () => {
  sendAlpha()
})
</script>