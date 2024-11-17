<template>
  <div>
    <h1>VanillaSpatial</h1>
    <button @click="playSound">Play Spatial Sound</button>
    <div>
      <p>Position X: {{ panner?.positionX?.value }}</p>
      <p>Position Y: {{ panner?.positionY?.value }}</p>
      <p>Position Z: {{ panner?.positionZ?.value }}</p>
    </div>
  </div>
</template>

<script setup>
const audioContext = ref(null)
const panner = ref(null)
const audioSource = ref(null)

onMounted(() => {
  // Initialize Web Audio API
  audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
  
  // Create panner node
  panner.value = audioContext.value.createPanner()
  panner.value.panningModel = 'HRTF'
  panner.value.distanceModel = 'inverse'
  panner.value.refDistance = 1
  panner.value.maxDistance = 10000
  panner.value.rolloffFactor = 1
  
  // Set position (x: 10, y: 0, z: 10)
  panner.value.positionX.value = 10
  panner.value.positionY.value = 0
  panner.value.positionZ.value = 10
  
  // Connect panner to destination (speakers)
  panner.value.connect(audioContext.value.destination)
  
  // Set listener position at center (0, 0, 0)
  const listener = audioContext.value.listener
  listener.positionX.value = 0
  listener.positionY.value = 0
  listener.positionZ.value = 0
})

const playSound = async () => {
  try {
    // Create oscillator for demo sound
    const oscillator = audioContext.value.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.value = 440 // 440 Hz = A4 note
    
    // Connect oscillator to panner
    oscillator.connect(panner.value)
    
    // Start and stop the sound after 1 second
    oscillator.start()
    setTimeout(() => oscillator.stop(), 1000)
  } catch (error) {
    console.error('Error playing spatial sound:', error)
  }
}
</script>