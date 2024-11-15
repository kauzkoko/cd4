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
const positionalAudioRef = shallowRef(null)
const trigger = ref(0)
const { audio, audioSrc } = storeToRefs(useStore())
const slidersStore = useSlidersStore()

watch([audio, audioSrc], (value) => {
  if (value[0]) {
    trigger.value++
    positionalAudioRef.value.play()
  } else {
    positionalAudioRef.value.pause()
  }
})

//hide the whole audio object in the view
watchEffect(() => {
  if (positionalAudioRef.value) {
    console.log(positionalAudioRef.value.root)
    positionalAudioRef.value.root.visible = false
  }
})

// Watch the gain value from the store
watch(
  () => slidersStore.sliders.find(s => s.name === 'gain')?.value,
  (value) => {
    if (positionalAudioRef.value && value !== undefined) {
      positionalAudioRef.value.root.gain.gain.value = value
    }
  }
)
</script>
