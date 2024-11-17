<template>
  <Controls />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera ref="cameraRef" :args="[45, 1, 0.1, 1000]" :position="[0, 0, 0]" />
    <!-- <OrbitControls autoRotate /> -->
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
import { MathUtils } from 'three'
import { useSquare, usePointOnPrimitive } from 'vuexyz'
import { animate } from '~/assets/anime/anime.esm.min.js';


const gl = {
  clearColor: "white",
  shadows: true,
  alpha: true,
  windowSize: true,
};

const cameraRef = ref(null)
// watchEffect(() => {
//   if (cameraRef.value) {
//     let rotation = cameraRef.value.rotation;
//     animate(rotation, {
//       y: MathUtils.degToRad(360),
//       duration: 20000,
//       loop: true,
//     })
//   }
// })

const animation = useAnimate(cameraRef, { type: 'rotation', autoplay: true, y: MathUtils.degToRad(360), duration: 10000, loop: true });

const cubeRef = shallowRef(null);
const square = useSquare({sideLength: 10})
const { point } = usePointOnPrimitive(square, 0.4)
// const animation = useAnimate(cubeRef, { x: point.value.x, z: point.value.y, autoplay: true });
</script>
