<template>
  <div>
    <h1>VanillaSpatial</h1>
    <button @click="playSound">Play Spatial Sound</button>
    <div>
      <p>Listener X: {{ listenerPosition.x.toFixed(3) }}</p>
      <p>Listener Y: {{ listenerPosition.y.toFixed(3) }}</p>
      <p>Listener Z: {{ listenerPosition.z.toFixed(3) }}</p>
    </div>
    <div>
      <p>Panner X: {{ pannerPosition.x.toFixed(3) }}</p>
      <p>Panner Y: {{ pannerPosition.y.toFixed(3) }}</p>
      <p>Panner Z: {{ pannerPosition.z.toFixed(3) }}</p>
    </div>
    
  </div>
</template>

<script setup>
const audioContext = ref(null)
const panner = ref(null)
const audioSource = ref(null)

// Add prop definition
const props = defineProps({
  listenerPosition: {
    type: Object,
    required: true,
    validator: (value) => {
      return 'x' in value && 'y' in value && 'z' in value
    }
  },
  pannerPosition: {
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
  
  // Set panner position from props
  panner.value.setPosition(props.pannerPosition.x, props.pannerPosition.y, props.pannerPosition.z)
  
  // Connect panner to destination (speakers)
  panner.value.connect(audioContext.value.destination)
  
  // Set initial listener position
  const listener = audioContext.value.listener
  listener.setPosition(props.listenerPosition.x, props.listenerPosition.y, props.listenerPosition.z)
})

watch(() => props.listenerPosition, (newPosition) => {
  if (audioContext.value?.listener) {
    // Only update listener position, keep sound source fixed
    audioContext.value.listener.setPosition(
      newPosition.x,
      newPosition.y,
      newPosition.z
    )
  }
}, { immediate: true, deep: true })

watch(() => props.pannerPosition, (newPosition) => {
  if (panner.value) {
    panner.value.setPosition(newPosition.x, newPosition.y, newPosition.z)
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