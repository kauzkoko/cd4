<script setup>
import gsap from 'gsap'
import * as THREE from 'three'

const { width, height } = useWindowSize()
const cameras = ref([])
const tresCanvas = useTresContext().renderer.value

// Create two cameras
const camera1 = ref()
const camera2 = ref()

// Setup viewport sizes and cameras when component mounts
onMounted(() => {
  if (!tresCanvas) return
  
  // Enable scissors
  tresCanvas.setScissorTest(true)
  
  // Setup cameras
  cameras.value = [camera1.value, camera2.value]
})

// Handle resize and render
watch([width, height], () => {
  if (!tresCanvas || cameras.value.length !== 2) return
  
  cameras.value.forEach((camera, index) => {
    const left = index === 0 ? 0 : width.value / 2
    const bottom = 0
    const width_ = width.value / 2
    const height_ = height.value
    
    // Set viewport for each camera
    tresCanvas.setViewport(left, bottom, width_, height_)
    tresCanvas.setScissor(left, bottom, width_, height_)
    
    // Update camera aspect ratio
    camera.aspect = width_ / height_
    camera.updateProjectionMatrix()
  })
})

// Original cube animation
const cube = ref()
watch(cube, (newVal) => {
  if (newVal) {
    gsap.to(newVal.rotation, {
      y: Math.PI * 2,
      duration: 2,
      ease: 'none',
      repeat: -1
    })
  }
})
</script>

<template>
  <!-- Add two cameras with different positions -->
  <TresPerspectiveCamera
    ref="camera1"
    :look-at="[0, 0, 0]"
  />
  <TresPerspectiveCamera
    ref="camera2"
    :look-at="[0, 0, 0]"
  />
  
  <!-- Original scene content -->
  <TresMesh 
    ref="cube"
    :position="[0, 0, 0]"
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="blue" />
  </TresMesh>
  
  <TresAmbientLight :intensity="1" />
  <TresSpotLight
    :intensity="100"
    :position="[0, 0, 5]"
  />
  <TresDirectionalLight :intensity="5" />
  <TresHemisphereLight />
</template> 