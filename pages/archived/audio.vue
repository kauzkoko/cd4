<script setup lang="ts">
import { useControls, TresLeches } from "@tresjs/leches";
import { TransitionPresets } from '@vueuse/core'
import "@tresjs/leches/styles";

const gl = {
  clearColor: "#e4e4e4",
  shadows: true,
  alpha: true,
  windowSize: true,
};

</script>

<template>
  <TresLeches />\
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[-5.3, 8.3, 10.6]" />
    <!-- <Box :args="[1, 1, 1]">
      <TresMeshNormalMaterial />

      <Suspense>
        <PositionalAudio
          ref="positionalAudioRef"
          :ready="true"
          :inner-angle="180"
          :outer-angle="220"
          :outer-gain=".2"
          :distance="2"
          helper
          url="https://raw.githubusercontent.com/Tresjs/assets/main/music/beat-1.mp3"
        />
      </Suspense>
    </Box> -->
    <Sphere :args="[1, 12, 12]">
      <TresMeshNormalMaterial />
      <Suspense>
        <PositionalAudio
          ref="positionalAudioRef"
          :ready="true"
          helper
          url="/shortdeep.mp3"
        />
      </Suspense>
    </Sphere>
    <TresAmbientLight :intensity="0.5" />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
