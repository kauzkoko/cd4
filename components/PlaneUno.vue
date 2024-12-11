<template>
  <TresMesh :position="position" :rotation="rotation">
    <TresPlaneGeometry :args="[16, 9]" />
    <TresMeshBasicMaterial :map="texture" />
  </TresMesh>
  <Text3D
        :position="position"
        :text="text"
        font="/generalsans.json"
        :bevelThickness="0.01"
        :bevelSize="0.01"
        :bevelEnabled="false"
        :fontSize="0.5"
        center
        needUpdates
      >
        <TresMeshToonMaterial color="black" />
      </Text3D>
</template>

<script setup>
const props = defineProps({
  videoPath: {
    type: String,
    required: true,
  },
  position: {
    type: Array,
    default: () => [0, 0, -2],
  },
  rotation: {
    type: Array,
    default: () => [0, 0, 0],
  },
  text: {
    type: String,
    default: () => "text",
  },
})
const texture = ref()
texture.value = await useVideoTexture(props.videoPath, { loop: true })
</script>