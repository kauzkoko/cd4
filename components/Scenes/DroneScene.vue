<template>
  <TresPerspectiveCamera 
    ref="mainCameraRef" 
    :args="[45, 1, 0.1, 1000]" 
    :position="[10, 10, 5]"
  />
  <OrbitControls v-if="!isDroneCam" />
  <TresPerspectiveCamera 
    ref="droneCameraRef" 
    :args="[75, 1, 0.1, 1000]" 
    :position="[0, 2, 0]" 
    :rotation="[-Math.PI/2, 0, 0]"
  />
  <TresMesh ref="cubeRef" :position="[0, 0, 0]">
    <TresBoxGeometry :args="[2, 0.2, 2]"  />
    <TresMeshStandardMaterial color="blue" wireframe />
    <Suspense>
      <HelpersCustomPositional />
    </Suspense>
  </TresMesh>
  <LightsBasic />
  <TresGridHelper :args="[100, 100]" />
</template>

<script setup>
import gsap from 'gsap'
const { camera, setCameraActive } = useTresContext()

const cubeRef = shallowRef(null);
const mainCameraRef = ref(null)
const droneCameraRef = shallowRef(null)
const isDroneCam = ref(true)

watchEffect(() => {
  if (mainCameraRef.value && droneCameraRef.value) {
    const activeCamera = isDroneCam.value ? droneCameraRef.value : mainCameraRef.value
    setCameraActive(activeCamera)
  }
})

const handleClick = (index) => {
  if (index === 0) { // MoveDrone button clicked
    if (cubeRef.value && droneCameraRef.value) {
      let cubePosition = cubeRef.value.position;
      let cameraPosition = droneCameraRef.value.position;
      
      gsap.timeline()
        .to([cubePosition, cameraPosition], {
          x: 10,
          z: 0,
          duration: 2,
          ease: "none",
        })
        .to([cubePosition, cameraPosition], {
          x: 5,
          y: (index) => index === 1 ? 7 : 5,
          z: 0,
          duration: 3,
          ease: "none",
        });
    }
  }
  else if (index === 1) { // Toggle camera button clicked
    isDroneCam.value = !isDroneCam.value
    console.log(camera.value)
  }
}

defineExpose({
  handleClick,
  isDroneCam
})
</script> 