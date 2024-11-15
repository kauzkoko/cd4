<template>
      <PositionalAudio
        ref="positionalAudioRef"
        :ready="true"
        loop
        helper
        :autoplay="false"
        :key="trigger"
        :url="audioSrc"
      />
</template>


<script setup>
const positionalAudioRef = shallowRef(null)
const trigger = ref(0)
const { audio, audioSrc } = storeToRefs(useStore())
watch([audio, audioSrc], (value) => {
  if (value[0]) {
    trigger.value++
    positionalAudioRef.value.play()
  } else {
    positionalAudioRef.value.pause()
  }
})

watchEffect(() => {
  if (positionalAudioRef.value) {
    positionalAudioRef.value.root.visible = false
  }
})
</script>