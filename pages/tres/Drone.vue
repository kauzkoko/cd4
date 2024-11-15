<template>
  <Controls />
  <TresCanvas v-bind="gl">
    <ScenesDrone />
  </TresCanvas>
  <CenterCross />
  <HelpersSliders />
</template>

<script setup>
const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
};
</script>