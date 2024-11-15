<template>
  <ViewsBoule />
  <template v-for="(sphere, index) in spheres" :key="index">
    <Levioso 
      :speed="levioso ? 1 : 0"
      :rotationFactor="levioso ? 1 : 0"
      :floatFactor="levioso ? 0.1 : 0" 
      :range="[levioso ? 1 : 0, levioso ? 1 : 0]"
    >
      <TresMesh
        :ref="(el) => (sphereRefs[index] = el)"
        :position="sphere.position"
        @click="changeObject(sphereRefs[index])"
        cast-shadow
        :scale="sphere.cochonette ? 0.5 : 1"
      >
        <TresSphereGeometry :args="[1, 12, 12]" />
        <TresMeshToonMaterial
          v-if="transformRef === sphereRefs[index]"
          :color="'white'"
        />
        <TresMeshStandardMaterial v-else :color="sphere.color" />
      </TresMesh>
    </Levioso>
  </template>
  <TransformControls
    v-if="transformRef && transforms"
    :object="transformRef"
    v-bind="controlsState"
  />
  <BackgroundsGrain />
  <LightsBasic />
</template>

<script setup>
import gsap from 'gsap'
const { spheres } = useSpheres();
const sphereRefs = ref(Array(spheres.length).fill(null));
const materialRefs = ref(Array(spheres.length).fill(null));
const transformRef = ref(null);
function changeObject(object) {
  transformRef.value = object;
}

const { animateCounter, levioso } = storeToRefs(useStore())
watchStoreRef("animateCounter", (value) => {
  for (const sphere of sphereRefs.value) {
    gsap.to(sphere.position, {
      y: animateCounter.value,
    })
  }
})

const { transforms } = storeToRefs(useStore());

const controlsState = reactive({
  mode: "translate",
  enabled: true,
  showX: true,
  showY: false,
  showZ: true,
});
</script>
