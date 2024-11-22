<template>
  <PositionalAudio
    ref="positionalAudioRef"
    :ready="props.ready"
    :autoplay="key > 0 ? props.autoplay : false"
    loop
    helper
    :key="key ?? props.trigger"
    :url="props.url"
  />
</template>

<script setup>
const positionalAudioRef = shallowRef(null)

const props = defineProps({
  url: {
    type: String,
    default: '/shortdeep.mp3',
    required: true
  },
  gain: {
    type: [Number, String],
    default: 1,
    validator: (value) => !isNaN(parseFloat(value))
  },
  trigger: {
    type: Number,
    default: 0
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  ready: {
    type: Boolean,
    default: true
  }
})

const key = ref(0)
const reload = () => {
  key.value++
}

const start = () => {
  key.value++
}

watchEffect(() => {
  if (positionalAudioRef.value) {
    if (positionalAudioRef.value.root) {
      positionalAudioRef.value.root.gain.gain.value = props.gain
      positionalAudioRef.value.root.visible = false
    }
  }
})

// add ref pos3d to the component e.g. <HelpersPos3d ref="pos3d" url="/shortdeep.mp3" :gain="gain" />
// start audio with $refs.pos3d.start() e.g <TresMesh @click="$refs.pos3d.start()">
defineExpose({
  key,
  reload,
  start
})
</script>
