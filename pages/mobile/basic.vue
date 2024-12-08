<template>
    <div>
        <h1>Acceleration: {{ acceleration.y?.toFixed(3) * 100 }}</h1>
    </div>
</template>

<script setup lang="ts">
const {
  acceleration,
  accelerationIncludingGravity,
  rotationRate,
  interval,
} = useDeviceMotion()
console.log(acceleration)
const test = ref(0)
watch(acceleration, (value) => {
    console.log(value)
    test.value = value.x
})
</script>