<template>
  <div>
    <h1>VanillaSpatial</h1>
    <button @click="playSound">Play Spatial Sound</button>
    <div>
      <p>Listener X: {{ listener.x }}</p>
      <p>Listener Y: {{ listener.y }}</p>
      <p>Listener Z: {{ listener.z }}</p>
    </div>
  </div>
</template>

<script setup>
const audioContext = ref(null)
const panner = ref(null)
const audioSource = ref(null)

// Add prop definition
const props = defineProps({
  listener: {
    type: Object,
    required: true,
    validator: (value) => {
      return 'x' in value && 'y' in value && 'z' in value
    }
  }
})

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
  
  // Set panner to a fixed position in space
  panner.value.setPosition(0, 0, 0)
  
  // Connect panner to destination (speakers)
  panner.value.connect(audioContext.value.destination)
  
  // Set initial listener position
  const listener = audioContext.value.listener
  listener.setPosition(props.listener.x, props.listener.y, props.listener.z)
})

watch(() => props.listener, (newPosition) => {
  if (audioContext.value?.listener) {
    // Only update listener position, keep sound source fixed
    audioContext.value.listener.setPosition(
      newPosition.x,
      newPosition.y,
      newPosition.z
    )
  }
}, { immediate: true, deep: true })

const playSound = async () => {
  try {
    if (!audioContext.value) return
    
    // Resume audio context if it's suspended
    if (audioContext.value.state === 'suspended') {
      await audioContext.value.resume()
    }
    
    // Create buffer for white noise
    const bufferSize = audioContext.value.sampleRate * 2 // 2 seconds of audio
    const buffer = audioContext.value.createBuffer(1, bufferSize, audioContext.value.sampleRate)
    const data = buffer.getChannelData(0)
    
    // Fill buffer with random values (white noise)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    
    // Create buffer source
    const whiteNoiseSource = audioContext.value.createBufferSource()
    whiteNoiseSource.buffer = buffer
    whiteNoiseSource.loop = true
    
    // Connect to panner
    whiteNoiseSource.connect(panner.value)
    
    // Start the sound
    whiteNoiseSource.start()
    audioSource.value = whiteNoiseSource
    
    // Stop after 60 seconds
    setTimeout(() => {
      whiteNoiseSource.stop()
      audioSource.value = null
    }, 60000)
  } catch (error) {
    console.error('Error playing spatial sound:', error)
  }
}
</script>