<script setup>
const error = useError()

if (error.value?.statusCode === 404) {
  navigateTo('/')
}
</script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>