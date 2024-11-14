<template>
    <Backdrop
      v-if="backdrop"
      receive-shadow
      :scale="30"
      :floor="5"
      :position="[0, 0, -20]"
    >
      <TresMeshToonMaterial color="yellow" />
    </Backdrop>
    <TresGridHelper :args="[100, 100]" v-if="grid" color="black" />
</template>

<script setup>

const { backdrop, grid } = useStoreRefs()
const texture = ref()
texture.value = await useVideoTexture('/grain180.webm')
</script>
