<template>
  <PositionalAudio
    ref="positionalAudioRef"
    :ready="true"
    loop
    helper
    :autoplay="false"
    :key="trigger"
    :url="audioSrc"
  />
</template>

<script setup>
import * as Tone from 'tone'


const positionalAudioRef = shallowRef(null)
const trigger = ref(0)
const oscillator = shallowRef(null)
const panner = shallowRef(null)
const { audio, audioSrc } = storeToRefs(useStore())
watch([audio, audioSrc], (value) => {
  if (value[0]) {
    trigger.value++
    positionalAudioRef.value.play()
  } else {
    positionalAudioRef.value.pause()
  }
})

// Get camera from TresContext
const { camera } = useTresContext()

const clickHandler = async () => {
  await Tone.start()
  
  if (!oscillator.value) {
    // Create a Tone.js 3D panner with fixed position
    panner.value = new Tone.Panner3D({
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      rolloff: 'linear',
      maxDistance: 10000,
      distanceModel: 'linear'
    })

    // Create and connect oscillator through the panner
    oscillator.value = new Tone.Oscillator({
      type: 'sine',
      frequency: 440,
    }).connect(panner.value)
    
    // Connect panner to destination
    panner.value.connect(Tone.Destination)

    // Watch camera position and update Tone.js listener
    watch(() => camera.position, (position) => {
      Tone.Listener.positionX.value = position.x
      Tone.Listener.positionY.value = position.y
      Tone.Listener.positionZ.value = position.z
    }, { deep: true })
  }
  
  // Toggle oscillator
  if (oscillator.value.state === 'started') {
    oscillator.value.stop()
  } else {
    oscillator.value.start()
  }
}

onKeyStroke(['m'], (e) => {
  e.preventDefault()
  clickHandler()
})

// Cleanup
onUnmounted(() => {
  if (oscillator.value) {
    oscillator.value.stop().dispose()
  }
  if (panner.value) {
    panner.value.dispose()
  }
})
</script>
