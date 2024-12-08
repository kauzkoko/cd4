<template>
    <UseDeviceMotion v-slot="{ acceleration }">
      Acceleration: {{ acceleration }}
    </UseDeviceMotion>
  </template>

<script setup lang="ts">
import { UseDeviceMotion } from '@vueuse/components'
</script>