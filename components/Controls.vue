<template>
  <div class="fixed z-50 top-5 right-5 flex flex-row gap-2">
    <div class="circle grain2 flexCenter no-select active:animate-ping" 
         v-tooltip="'Transform'" 
         @click="toggleTransforms()">
      T
    </div>
    <div class="circle grain3 flexCenter no-select active:animate-ping" 
         v-tooltip="'Grid'" 
         @click="toggleGrid()">
      G
    </div>
    <div class="circle grain4 flexCenter no-select active:animate-ping" 
         v-tooltip="'Sky'" 
         @click="toggleSky()">
      S
    </div>
    <div class="circle grain5 flexCenter no-select active:animate-ping" 
         v-tooltip="'Backdrop'" 
         @click="toggleBackdrop()">
      B
    </div>
    <div class="circle grain6 flexCenter no-select active:animate-ping" 
         v-tooltip="'Animate'" 
         @click="animate()">
      A
    </div>
    <div class="circle grain7 flexCenter no-select active:animate-ping" 
         v-tooltip="'Levioso'" 
         @click="toggleLevioso()">
      L
    </div>
    <div class="circle grain8 flexCenter no-select active:animate-ping" 
         v-tooltip="'Camera'" 
         @click="toggleCameraControls()">
      C
    </div>
    <div class="circle grain9 flexCenter no-select active:animate-ping" 
         v-tooltip="'Random'" 
         @click="toggleRandomSpheres()">
      R
    </div>
    <div class="circle grain1 flexCenter no-select active:animate-ping" 
         v-tooltip="'Audio'" 
         @click="toggleAudio()">
      A
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  toggleTransforms,
  toggleGrid,
  toggleSky,
  toggleBackdrop,
  animate,
  toggleLevioso,
  toggleCameraControls,
  toggleRandomSpheres,
  toggleAudio,
} = useStore()

// Add keyboard controls for each toggle
onKeyStroke(['t', 'T'], (e) => {
  e.preventDefault()
  toggleTransforms()
})

onKeyStroke(['g', 'G'], (e) => {
  e.preventDefault()
  toggleGrid()
})

onKeyStroke(['s', 'S'], (e) => {
  e.preventDefault()
  const { cameraControls } = storeToRefs(useStore())
  if (cameraControls.value) {
    toggleSky()
  }
})

onKeyStroke(['b', 'B'], (e) => {
  e.preventDefault()
  toggleBackdrop()
})

onKeyStroke(['a', 'A'], (e) => {
  e.preventDefault()
  animate()
})

onKeyStroke(['l', 'L'], (e) => {
  e.preventDefault()
  toggleLevioso()
})

onKeyStroke(['c', 'C'], (e) => {
  e.preventDefault()
  toggleCameraControls()
})

onKeyStroke(['r', 'R'], (e) => {
  // e.preventDefault()
  toggleRandomSpheres()
})

onKeyStroke(['x', 'X'], (e) => {
  e.preventDefault()
  toggleAudio()
})
</script>

<style scoped>
.tooltip {
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.group:hover .tooltip {
  opacity: 1;
}
</style>
