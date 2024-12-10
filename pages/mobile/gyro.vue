<template>
  <div>
    {{ show }}
  </div>
</template>

<script setup>

const {
  isAbsolute,
  alpha,
  beta,
  gamma,
} = useDeviceOrientation()

console.log(alpha.value)

const show = computed(() => alpha.value.toFixed(2))
</script>