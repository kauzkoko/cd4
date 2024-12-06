<template>
  <TresCanvas v-bind="gl">
    <TresMesh @click="$refs.pos3d.start()":position="[0,0,0]">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial color="#4488ff" />
      <Suspense>
        <HelpersPos3d ref="pos3d" url="/shortdeep.mp3" :gain="gain" />
      </Suspense>
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[2, 2, 2]" :intensity="1" />
  </TresCanvas>
  <input class="fixed top-0 left-0" type="range" min="0" max="1" step="0.01" v-model="gain" />
</template>

<script setup>
const gl = {
  clearColor: 'white',
  shadows: true,
  alpha: true,
  windowSize: true,
}

const gain = ref(0.5)
</script>
