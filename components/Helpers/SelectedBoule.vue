<template>  <Box :args="[1, 1, 1]" :position="position">
    <TresMeshToonMaterial color="white" :opacity="0" transparent />
    <Suspense>
      <HelpersCustomPositional />
    </Suspense>
  </Box>
</template>

<script setup>
const { selectedSpherePosition } = storeToRefs(useStore())
const position = computed(() => [selectedSpherePosition.value.x, -0.1, selectedSpherePosition.value.z])
</script>
