<script setup>
const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
};
</script>

<template>
  <TresCanvas v-bind="gl">
    <ScenesBoulePS2Extended />
  </TresCanvas>
</template>
