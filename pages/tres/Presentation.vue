<template>
  <Controls />
  <TresCanvas v-bind="gl">
    <ScenesPresentation />
  </TresCanvas>
  <CenterCross />
</template>

<script setup>
const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
};
</script>