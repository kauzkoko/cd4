<template>
  <div class="fixed z-50 top-5 right-5 flex flex-wrap gap-2 flex-col md:flex-row">
    <div class="circle flexCenter no-select active:animate-ping" :class="transforms ? 'grainOn2' : 'grainOff2'"
         v-tooltip="'Transform'" 
         @click="toggleTransforms()">
      T
    </div>
    <div class="circle grainOff2 flexCenter no-select active:animate-ping" :class="transforms ? 'grainOn3' : 'grainOff3'"
         v-tooltip="'Grid'" 
         @click="toggleGrid()">
      G
    </div>
    <div class="circle grain4 flexCenter no-select active:animate-ping" :class="sky ? 'grainOn4' : 'grainOff4'"
         v-tooltip="'Sky'" 
         @click="toggleSky()">
      S
    </div>
    <div class="circle grain5 flexCenter no-select active:animate-ping" :class="backdrop ? 'grainOn5' : 'grainOff5'"
         v-tooltip="'Backdrop'" 
         @click="toggleBackdrop()">
      B
    </div>
    <div class="circle bg-green-300 flexCenter no-select active:animate-ping"
         v-tooltip="'Animate'" 
         @click="animate()">
      A
    </div>
    <div class="circle grain7 flexCenter no-select active:animate-ping" :class="levioso ? 'grainOn7' : 'grainOff7'"
         v-tooltip="'Levioso'" 
         @click="toggleLevioso()">
      L
    </div>
    <div class="circle grain8 flexCenter no-select active:animate-ping" :class="cameraControls ? 'grainOn8' : 'grainOff8'"
         v-tooltip="'Camera'" 
         @click="toggleCameraControls()">
      C
    </div>
    <div class="circle bg-red-300 flexCenter no-select active:animate-ping"
         v-tooltip="'Random'" 
         @click="toggleRandomSpheres()">
      R
    </div>
    <div class="circle grain1 flexCenter no-select active:animate-ping" :class="audio ? 'grainOn1' : 'grainOff1'"
         v-tooltip="'Audio'" 
         @click="toggleAudio()">
      A
    </div>
    <div class="circle bg-orange-200 flexCenter no-select active:animate-ping"
         v-tooltip="'Switch Audio'" 
         @click="switchAudioSrc()">
      S
    </div>
    <div class="circle grain11 flexCenter no-select active:animate-ping" :class="isFullscreen ? 'grainOn11' : 'grainOff11'"
         v-tooltip="'Fullscreen'" 
         @click="toggleFullscreen()">
      F
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
  switchAudioSrc,
  toggleFullscreen
} = useStore()

const { transforms, grid, sky, backdrop, levioso, cameraControls, randomSpheresCounter, audio, isFullscreen, animateCounter } = storeToRefs(useStore())

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

onKeyStroke(['y', 'y'], (e) => {
  e.preventDefault()
  switchAudioSrc()
})

onKeyStroke(['f', 'F'], (e) => {
  e.preventDefault()
  toggleFullscreen()
})
</script>