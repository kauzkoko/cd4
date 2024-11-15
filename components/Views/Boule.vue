<template>
    <TresPerspectiveCamera :position="[-5.3, 8.3, 10.6]" />
    <CameraControls v-if="cameraControls" make-default />
    <KeyboardControls v-else />
</template>

<script setup>
const { cameraControls } = storeToRefs(useStore());

</script>