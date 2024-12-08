<template>
  <TresCanvas v-bind="gl">
    <TresMesh v-for="(detection, index) in detections" :key="index" :position="[
      (detection.x_center * 3 - 960) / 32,
      0,
      (detection.y_center * 1.6875 - 540) / 32
    ]">
      <TresSphereGeometry :args="[0.3, 16, 16]" />
      <TresMeshStandardMaterial :color="getColorForClass(detection.class_name)" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[2, 2, 2]" :intensity="1" />
    <TresGridHelper :args="[100, 100]" />
    <OrbitControls />
  </TresCanvas>
</template>

<script setup>
const gl = {
  clearColor: 'white',
  shadows: true,
  alpha: true,
  windowSize: true,
}

const { status, data, send, open, close } = useWebSocket('ws://localhost:8765')
const detections = ref([{ "class_name": "color", "confidence": 0.9829562902450562, "x_center": 178.16854858398438, "y_center": 121.80278015136719, "width": 27.69482421875, "height": 49.7001953125 }, { "class_name": "color", "confidence": 0.960445761680603, "x_center": 33.26150131225586, "y_center": 215.42091369628906, "width": 31.40776824951172, "height": 47.624053955078125 }, { "class_name": "white", "confidence": 0.9586256146430969, "x_center": 250.62478637695312, "y_center": 383.9620361328125, "width": 28.1156005859375, "height": 48.744873046875 }, { "class_name": "color", "confidence": 0.9495633840560913, "x_center": 342.14697265625, "y_center": 205.62538146972656, "width": 27.9920654296875, "height": 49.308807373046875 }, { "class_name": "cochonette", "confidence": 0.7135573029518127, "x_center": 11.67231559753418, "y_center": 338.1814880371094, "width": 23.34463119506836, "height": 68.41998291015625 }])

watch(data, (newVal) => {
  if (!newVal) return
  detections.value = typeof newVal === 'string' ? JSON.parse(newVal) : newVal
})




const getColorForClass = (className) => {
  const colorMap = {
    color: '#ff4444',
    white: '#ffffff',
    cochonette: '#44ff44',
  }
  return colorMap[className] || '#888888'
}
</script>
