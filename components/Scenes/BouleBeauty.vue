<template>
  <View />
  <template v-for="(sphere, index) in spheres" :key="index">
    <Levioso
      :speed="levioso ? 10 : 0"
      :rotationFactor="levioso ? 0.2 : 0"
      :floatFactor="levioso ? 0.1 : 0"
      :range="[levioso ? 0.5 : 0, levioso ? 1.2 : 0]"
    >
      <TresGroup :position="sphere.position" :ref="(el) => (sphereRefs[index] = el)">
        <TresMesh @click="changeObject(sphereRefs[index])" cast-shadow :scale="sphere.cochonette ? 0.5 : 1">
          <TresMeshToonMaterial color="white" />
          <TresSphereGeometry :args="[1, 24, 24]" />
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
  <Lights />
</template>

<script setup>
const { spheres } = useSpheres()
const sphereRefs = ref(Array(spheres.length).fill(null))
const materialRefs = ref(Array(spheres.length).fill(null))
const transformRef = ref(null)
function changeObject(object) {
  transformRef.value = object
}
const { transforms, grid, levioso } = storeToRefs(useStore())

const controlsState = reactive({
  mode: 'translate',
  enabled: true,
  showX: true,
  showY: false,
  showZ: true,
})
</script>
