<script setup lang="ts">
const { accelerationIncludingGravity } = useDeviceMotion()

const test = ref(0)
// watchEffect(() => {
//     console.log(accelerationIncludingGravity.value)
//     test.value = accelerationIncludingGravity.value.x?.toFixed(2)
// })

setInterval(() => {
    test.value = accelerationIncludingGravity.value.x?.toFixed(3)
}, 1000)
</script>

<template>
    <div>
        {{ test }}
    </div>
</template>