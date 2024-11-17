<template>
  <Controls />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" :position="[0, 10, 0]" />
    <OrbitControls autoRotate />
    <TresMesh ref="cubeRef" :position="[0, 0, 0]">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial color="blue" />
      <Suspense>
        <HelpersCustomPositional />
      </Suspense>
    </TresMesh>
    <TresMesh :position="[0, 0, 0]">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial color="red" />
    </TresMesh>
    <LightsBasic />
    <TresGridHelper :args="[100, 100]" />
  </TresCanvas>
  <HelpersSliders />
</template>

<script setup>
import { useSquare, usePointOnPrimitive } from 'vuexyz'

const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
};

const cubeRef = shallowRef(null);
const square = useSquare({sideLength: 10})
const { point } = usePointOnPrimitive(square, 0.4)
const animation = useAnimate(cubeRef, { x: point.value.x, z: point.value.y, autoplay: true });
</script>