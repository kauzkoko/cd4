<template>
  <ViewsBasic />
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="white" />
    <Suspense>
      <PositionalAudio
          ref="positionalAudioRef"
          :ready="true"
          loop
          helper
          :autoplay="false"
          :key="trigger"
          :url="audioSrc"
        />
      </Suspense>
  </TresMesh>
  <LightsBasic />
</template>

<script setup>
const trigger = ref(0)
const positionalAudioRef = shallowRef(null)
const { audio, audioSrc } = storeToRefs(useStore())
watch([audio, audioSrc], (value) => {
  if (value[0]) {
    trigger.value++
    positionalAudioRef.value.play()
  } else {
    positionalAudioRef.value.pause()
  }
}) 
</script>
