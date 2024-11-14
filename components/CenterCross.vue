<template>
  <div
    v-if="!cameraControls"
    class="fixed inset-0 pointer-events-none flex items-center justify-center"
  >
    <div class="mt-[-50px] w-[1px] h-12 bg-black/50 absolute"></div>
    <div class="mt-[-50px] w-12 h-[1px] bg-black/50 absolute"></div>
  </div>
</template>

<script setup>
const { cameraControls } = storeToRefs(useStore());
</script>
