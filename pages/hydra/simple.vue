<template>
  <div w-screen h-screen flexCenter>
    <canvas w-300px h-300px>come here </canvas>
  </div>
</template>

<script setup>
import Hydra from 'hydra-synth'

onMounted(() => {
  const h = new Hydra({ makeGlobal: false, detectAudio: false, canvas: document.querySelector('canvas') }).synth
  h.osc().diff(h.shape()).out()
  h.gradient().out(h.o1)
  h.render()
})
</script>
