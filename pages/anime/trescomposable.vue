<template>
  <Controls />
  <TresCanvas v-bind="gl">
    <ScenesCustomPositional />
    <TresMesh @click="start()" ref="cubeRef" :position="[3, 0, 0]">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial color="blue" />
    </TresMesh>
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

const cubeRef = shallowRef(null);
const animation = useAnimate(cubeRef, { type: 'position', x: 1, });

// start immediately
// whenever(animation, (value) => {
//   value.play()
// })

// start on click
const start = () => {
  animation.value.play()
}
</script>