<script setup>
import { PerspectiveCamera, Vector4, Vector3 } from 'three'
import gsap from 'gsap'

const factor = .5
const ratio = window.devicePixelRatio*factor/2

const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
  dpr: factor
};

const { width, height } = useWindowSize()
const WIDTH = width.value
const HEIGHT = height.value
const HALF_WIDTH = WIDTH / 2 * ratio
const HALF_HEIGHT = HEIGHT / 2 * ratio
const ASPECT_RATIO = computed(() => width.value / height.value)

const cameras = []

const cameraOptions = [
  {
    viewPort: new Vector4(0, HALF_HEIGHT, HALF_WIDTH, HALF_HEIGHT),
    position: new Vector3(5, 5, 5),
    factor: .4,
    name: 'top_left',
  },
  {
    viewPort: new Vector4(HALF_WIDTH, HALF_HEIGHT, HALF_WIDTH, HALF_HEIGHT),
    position: new Vector3(-5, 5, 5),
    factor: 1,
    name: 'top_right',
  },
  {
    viewPort: new Vector4(0, 0, HALF_WIDTH, HALF_HEIGHT),
    position: new Vector3(5, -5, 5),
    factor: 1,
    name: 'bottom_left',
  },
  {
    viewPort: new Vector4(HALF_WIDTH, 0, HALF_WIDTH, HALF_HEIGHT),
    position: new Vector3(-5, -5, 5),
    factor: 1,
    name: 'bottom_right',
  },
]

cameraOptions.forEach((data) => {
  const currentCam = new PerspectiveCamera(40, ASPECT_RATIO.value, 0.1, 10)
  currentCam.name = data.name
  currentCam.viewport = data.viewPort
  currentCam.position.set(...data.position)
  currentCam.position.multiplyScalar(data.factor)
  currentCam.lookAt(0, 0, 0)
  currentCam.updateMatrixWorld()
  cameras.push(currentCam)
})
useControls('fpsgraph')

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
  <TresLeches />
  <TresCanvas
    v-bind="gl"
  >
    <TresArrayCamera
      :args="[cameras]"
    />
    <TresMesh 
      ref="cube"
      :position="[0, 0, 0]"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial color="blue" />
    </TresMesh>
    <TresAmbientLight
      :color="0xffffff"
      :intensity="1"
    />
    <TresSpotLight
      :color="0xffffff"
      :intensity="100"
      :position="[0, 0, 5]"
    />
    <TresDirectionalLight
      :color="0xffffff"
      :intensity="5"
    />
    <TresHemisphereLight />
  </TresCanvas>
</template>