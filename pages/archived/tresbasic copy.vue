<script setup>
import { TransitionPresets } from '@vueuse/core'
import "@tresjs/leches/styles";

const { slider } = useControls({
  slider: {
    value: 1,
    min: 1,
    max: 20,
    step: 1,
  },
});

const { toggleSlider } = useControls({
	toggleSlider: false,
});

watchEffect(() => {
  slider.value = toggleSlider.value ? 20 : 1;
});

const source = ref(1)
const output = useTransition(slider, {
  duration: 1000,
  transition: TransitionPresets.easeInOutCubic,
})

const gl = {
  // clearColor: "#e4e4e4",
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
};

const BLUE = 'blue'
const YELLOW = '#ffff00'
const HOVER_COLOR = '#ff0000'

// Update the spheres data to include Superformula parameters
const spheres = [
  { position: [2, 1, 0], color: BLUE, params: { numArmsA: 0, numArmsB: 0, expB: [40, 30, 20] } },
  { position: [-2, 1, 0], color: YELLOW, params: { numArmsA: 4, numArmsB: 8, expB: [30, 20, 40] } },
  { position: [0, 1, 2], color: BLUE, params: { numArmsA: 5, numArmsB: 10, expB: [20, 40, 30] } },
  { position: [0, 1, -2], color: YELLOW, params: { numArmsA: 6, numArmsB: 12, expB: [40, 20, 30] } },
  { position: [2, 1, 2], color: BLUE, params: { numArmsA: 7, numArmsB: 14, expB: [30, 40, 20] } },
]

const sphereRefs = ref(Array(spheres.length).fill(null))
const materialRefs = ref(Array(spheres.length).fill(null))
const transformRef = ref(null)
function changeObject(object) {
  transformRef.value = object
}

const controlsState = reactive({
  mode: 'translate',
  enabled: true,
  showX: true,
  showY: false,
  showZ: true,
})

</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[-5.3, 8.3, 10.6]" />
    <CameraControls make-default />
    <template v-for="(sphere, index) in spheres" :key="index">
      <TresMesh 
        :ref="el => sphereRefs[index] = el"
        :position="sphere.position"
        @click="changeObject(sphereRefs[index])"
        cast-shadow
      >
        <Superformula 
          v-if="transformRef === sphereRefs[index]"
          :num-arms-a="sphere.params.numArmsA"
          :num-arms-b="sphere.params.numArmsB"
          :exp-b="sphere.params.expB"
          cast-shadow
        >
          <!-- <TresMeshStandardMaterial :color="sphere.color" wireframe /> -->
          <MeshGlassMaterial />
        </Superformula>
        <TresSphereGeometry 
          v-else  
          :args="[1, 16, 16]" 
        />
        <TresMeshStandardMaterial 
          v-if="transformRef !== sphereRefs[index]"
          :ref="el => materialRefs[index] = el"
          :color="sphere.color"
        />
      </TresMesh>
    </template>
    <TransformControls
      v-if="transformRef"
      :object="transformRef"
      v-bind="controlsState"
    />
    <TresMesh :position="[0, 0.5, 0]">
      <TresSphereGeometry :args="[0.5, 16, 16]" />
      <TresMeshStandardMaterial color="white" />
    </TresMesh>
    <TresAmbientLight :intensity="1.5" />
    <TresDirectionalLight :position="[1, 2, 1]" :intensity="2" cast-shadow />
    <TresGridHelper />
    <Backdrop
      receive-shadow
      :floor="10"
      :scale="30"
      :position="[0, 0, -20]"
    >
      <TresMeshPhysicalMaterial color="pink" :roughness="1" />
    </Backdrop>
  </TresCanvas>
</template>
