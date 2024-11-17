<template>
  <div class="fullScreen flexCenter flex-col" @click="toggleMode">
    <div>
      <VanillaSpatialProp :listenerPosition="listenerPosition" :pannerPosition="pannerPosition" />
      <button @click="toggleMode">Toggle Mode</button>
      <div>Current Mode: {{ mode }}</div>
    </div>
  </div>
</template>

<script setup>
const { x, y } = useMouse()
const { width, height } = useWindowSize()
const map = (value, start1, stop1, start2, stop2) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

const mode = ref('listener')
const toggleMode = () => {
  mode.value = mode.value === 'listener' ? 'panner' : 'listener'
}

const listenerPosition = ref({ x: 0, y: 0, z: 0 })
const pannerPosition = ref({ x: 0, y: 0, z: 0 })

watch([x, y], () => {
  if (mode.value === 'listener') {
    listenerPosition.value = {
      x: map(x.value, 0, width.value, -10, 10),
      y: 0,
      z: map(y.value, 0, height.value, -10, 10),
    }
  } else {
    pannerPosition.value = {
      x: map(x.value, 0, width.value, -10, 10),
      y: 0,
      z: map(y.value, 0, height.value, -10, 10),
    }
  }
})
</script>
