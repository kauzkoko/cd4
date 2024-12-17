<template>
  <TresCanvas v-bind="gl">
    <ScenesCD2 />
  </TresCanvas>
</template>

<script setup>
const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
};

const { width, height } = useWindowSize()
watch([width, height], () => {

})
</script>