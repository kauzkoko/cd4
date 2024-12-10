<template>
  <div>
    <h1>iPhone</h1>
    <button @click="onClick">Click</button>
    <div>
      <p>Alpha: {{ alpha.toFixed(2) }}</p>
      <p>Compass Heading: {{ compassHeading.toFixed(2) }}</p>
      <p>Compass Accuracy: {{ compassAccuracy.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup>
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
  alpha.value = event.alpha-90
}
</script>