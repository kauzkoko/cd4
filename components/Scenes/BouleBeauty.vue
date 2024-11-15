<template>
  <View />
  <template v-for="(sphere, index) in spheres" :key="index">
    <Levioso
      :speed="levioso ? 10 : 0"
      :rotationFactor="levioso ? 0.2 : 0"
      :floatFactor="levioso ? 0.1 : 0"
      :range="[levioso ? 0.5 : 0, levioso ? 1.2 : 0]"
    >
      <TresGroup :position="transformRef === sphereRefs[index] ? [sphere.position[0], sphere.position[1]-.6, sphere.position[2]] : sphere.position" :ref="(el) => (sphereRefs[index] = el)">
        <TresMesh @click="changeObject(sphereRefs[index], index)" cast-shadow :scale="sphere.cochonette ? 0.5 : 1">
          <TresMeshToonMaterial color="white" />
          <TresSphereGeometry :args="[1, 24, 24]" />
          <!-- <Sparkles /> -->
          <MeshGlassMaterial :ref="(el) => (materialRefs[index] = el)" :color="sphere.color" />
        </TresMesh>
        <Suspense>
          <TinyVideoBox
            :animate="transformRef === sphereRefs[index]"
            :cochonette="sphere.cochonette"
            :direction="sphere.direction"
          />
        </Suspense>
      </TresGroup>
    </Levioso>
  </template>
  <TransformControls v-if="transformRef && transforms" :object="transformRef" v-bind="controlsState" />
  <TresGridHelper :args="[100, 100]" v-if="grid" />
  <Suspense>
    <BackgroundsCylinder />
  </Suspense>
    <Box :args="[1, 1, 1]" :position="[selectedSpherePosition[0], -.1, selectedSpherePosition[2]]">
      <TresMeshToonMaterial color="white" :opacity="0" transparent />
      <Suspense>
        <PositionalAudio
          ref="positionalAudioRef"
          :ready="true"
          loop
          helper
          :key="audioSrc"
          :url="audioSrc"
        />
      </Suspense>
    </Box>
  <Lights />
</template>

<script setup>
const { spheres } = useSpheres()
const sphereRefs = ref(Array(spheres.length).fill(null))
const materialRefs = ref(Array(spheres.length).fill(null))
const transformRef = ref(null)

const selectedSpherePosition = ref([0, 0, 0])
function changeObject(object, index ) {
  transformRef.value = object
  selectedSpherePosition.value = spheres.value[index].position
}
const { transforms, grid, levioso, audioSrc } = storeToRefs(useStore())

const positionalAudioRef = shallowRef(null)
watchStoreRef("audio", (value) => {
  if (value) {
    positionalAudioRef.value.play()
  } else {
    positionalAudioRef.value.pause()
  }
})



const controlsState = reactive({
  mode: 'translate',
  enabled: true,
  showX: true,
  showY: false,
  showZ: true,
})
</script>
