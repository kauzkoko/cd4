<template>
    <h1>Final</h1>
    <h2>Magnet Android: {{ androidMagnet }}</h2>
    <h2>Magnet iPhone: {{ iphoneMagnet }}</h2>
</template>

<script setup>
const { androidMagnet, iphoneMagnet } = useMagnets()
</script>