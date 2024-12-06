
<template>
  <TresCanvas v-bind="gl">
    <TransformControls :object="pos3dRefs[0]" v-bind="controlsState" />
    <TresMesh @click="reloadAll()" v-for="(i, index) in 3" :key="i" :position="positions[index]">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial color="#4488ff" />
      <Suspense>
        <HelpersPos3d :ref="(el) => (pos3dRefs[index] = el)" :url="urls[index]" :gain="gains[index]" />
      </Suspense>
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[2, 2, 2]" :intensity="1" />
  </TresCanvas>
</template>

<script setup>
const gl = {
  clearColor: 'white',
  shadows: true,
  alpha: true,
  windowSize: true,
}

const pos3dRefs = ref([])

const reloadAll = () => {
  pos3dRefs.value.forEach((ref) => {
    ref.reload()
  })
}

const positions = ref([
  [1, 0, 0],
  [0, 0, 2],
  [0, 1.5, 0],
])

const gains = ref([0.25, 0.5, 1])


const urls = ref(['/shortdeep.mp3', '/strudel/c3major.mp3', '/strudel/g3major.mp3'])

const controlsState = reactive({
  mode: 'translate',
  enabled: true,
  showX: true,
  showY: false,
  showZ: true,
})
</script>
