<template>
  <TresCanvas v-bind="gl">
    <ScenesPresentation />
  </TresCanvas>
</template>

<script setup>
const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
};
</script>