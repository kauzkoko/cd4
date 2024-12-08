<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const routes = router.getRoutes()
const isExpanded = ref(false)
</script>

<template>
  <div 
    @click="isExpanded = !isExpanded"
    class="cursor-pointer fixed left-5 top-5 z-50"
    :class="isExpanded ? 'bg-hex-ffff00 inline-block' : 'bg-yellow circle grain'"
  >
    <template v-if="isExpanded">
      <ul>
        <li class="grain w-full h-20px"></li>
        <template v-for="route in routes" :key="route.path">
          <NuxtLink noPrefetch :to="route.path">
            <li>
              {{ route.path.replaceAll("%20", " ") }}
            </li>
          </NuxtLink>
        </template>
      </ul>
      <div class="bg-white" >current: {{ route.path }}</div>
    </template>
  </div>
</template>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>