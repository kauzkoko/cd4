<template>
  <Controls />
  <TresCanvas v-bind="gl">
    <ScenesDroneScene ref="sceneRef" />
  </TresCanvas>
  <HelpersSliders />
  <HelpersStackedButtons 
    :title="['Move drone', 'Toggle camera']" 
    @clicked="(index) => sceneRef.handleClick(index)" 
  />
</template>

<script setup>
const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
};

const sceneRef = ref(null)
</script>
