<template>
    <TresAmbientLight :intensity="1.5" />
    <TresDirectionalLight ref="lightRef" :position="[4, 20, 4]" :intensity="2" cast-shadow color="white" />
    <TransformControls :object="lightRef" enabled v-if="transforms" />
</template>

<script setup>
const { sky, transforms } = useStoreRefs()
const lightRef = shallowRef(null)
</script>
