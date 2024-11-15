<template>
  <Controls />
  <TresCanvas v-bind="gl">
    <ScenesPositionalHidden />
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