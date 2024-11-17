<template>
  <ViewsBoule />
  <TresGroup ref="groupRef">
    <template v-for="(sphere, index) in spheres" :key="index">
      <Levioso :speed="10" :rotationFactor="0.2" :floatFactor="0.1" :range="[0.5, 1.2]">
        <TresGroup
          :position="
            transformRef === sphereRefs[index]
              ? [sphere.position[0], sphere.position[1] - 0.6, sphere.position[2]]
              : sphere.position
          "
          :ref="(el) => (sphereRefs[index] = el)"
        >
          <TresMesh @click="changeObject(sphereRefs[index], index)" cast-shadow :scale="sphere.cochonette ? 0.5 : 1">
            <TresMeshToonMaterial color="white" />
            <TresSphereGeometry :args="[1, 12, 12]" />
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
    <HelpersSelectedBoule />
    <Suspense>
    <BackgroundsCylinderSmall />
  </Suspense>
  </TresGroup>
  <TresAmbientLight :intensity="1.5" />
  <TresDirectionalLight ref="lightRef" :position="[4, 20, 4]" :intensity="2" cast-shadow color="white" />
</template>

<script setup>
import gsap from 'gsap'

const { spheres } = useSpheres()
const sphereRefs = ref(Array(spheres.value.length).fill(null))
const materialRefs = ref(Array(spheres.value.length).fill(null))

const transformRef = ref(null)

const tresCanvas = useTresContext().renderer.value.domElement
let h = useHydra(tresCanvas)
h.src(s0).pixelate(200, 100).out()

const { selectedSpherePosition } = storeToRefs(useStore())
function changeObject(object, index) {
  transformRef.value = object
  selectedSpherePosition.value = {
    x: spheres.value[index].position[0],
    y: spheres.value[index].position[1],
    z: spheres.value[index].position[2],
  }
}

const groupRef = ref(null)
watchEffect(() => {
  if (groupRef.value) {
    let rotation = groupRef.value.rotation;
    gsap.to(rotation, {
      y: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: "none"
    })
  }
})

// positions camera: 0, 120, 0 downward facing
// let plate rotate
</script>
