<template>
  <TresMesh ref="mesh">
    <TresBoxGeometry :args="[props.cochonette ? 0.15 : 0.5, props.cochonette ? 0.4 : 1, props.cochonette ? 0.4 : 1]" />
    <TresMeshBasicMaterial :map="texture" />
  </TresMesh>
</template>

<script setup>
const props = defineProps({
  animate: {
    type: Boolean,
    default: false,
  },
  cochonette: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: Number,
    default: 'random',
  },
})
const texture = ref()
texture.value = await useVideoTexture('/grain.webm')

const mesh = ref(null)
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta, elapsed }) => {
  if (props.animate && mesh.value) {
    mesh.value.rotation.x += delta * 2
    mesh.value.rotation.z += delta * 1
    mesh.value.rotation.y += delta * 3
  } else if (mesh.value) {
    mesh.value.rotation.x += delta / 5 * props.direction
    mesh.value.rotation.z += delta / 5 * props.direction
    mesh.value.rotation.y += delta / 5 * props.direction
  }
}) 
</script>
