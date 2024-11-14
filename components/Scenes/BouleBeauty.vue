<template>
  <View />
  <template v-for="(sphere, index) in spheres" :key="index">
    <TresMesh
      :ref="(el) => (sphereRefs[index] = el)"
      :position="sphere.position"
      @click="changeObject(sphereRefs[index])"
      cast-shadow
      :scale="sphere.cochonette ? 0.5 : 1"
    >
      <TresMeshToonMaterial color="white" />
      <TresSphereGeometry :args="[1, 24, 24]" />

      <MeshGlassMaterial
        v-if="transformRef !== sphereRefs[index]"
        :ref="(el) => (materialRefs[index] = el)"
        :color="sphere.color"
      />
      <Superformula
        v-if="transformRef === sphereRefs[index]"
        :num-arms-a="sphere.params.numArmsA"
        :num-arms-b="sphere.params.numArmsB"
        :exp-a="sphere.params.expA"
        cast-shadow
      >
        <MeshWobbleMaterial :speed="2" :factor="10" color="black" />
      </Superformula>
    </TresMesh>
    <Suspense>
      <TinyVideoBox :position="sphere.position" v-if="!sphere.cochonette" />
    </Suspense> 
  </template>
  <TransformControls v-if="transformRef && transforms" :object="transformRef" v-bind="controlsState" />
  <TresGridHelper :args="[100, 100]" v-if="grid" />
  <Suspense>
    <Background />
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


const { transforms, grid } = storeToRefs(useStore())

const controlsState = reactive({
  mode: 'translate',
  enabled: true,
  showX: true,
  showY: false,
  showZ: true,
})
</script>
