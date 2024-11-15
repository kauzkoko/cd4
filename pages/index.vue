<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const routes = router.getRoutes();
</script>

<template>
  <div class="fullScreen flexCenter flex-col">
    <h1 class="text-6xl font-clash-display grain mb-0">Paratanque</h1>
    <div class="bg-hex-ffff00 inline-block">
      <ul>
        <li class="grain w-full h-20px"></li>
        <template v-for="route in routes" :key="route.path">
          <NuxtLink :to="route.path">
            <li>
              {{ route.path.replaceAll("%20", " ") }}
            </li>
          </NuxtLink>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.grain {
  width: full;
  height: full;
  filter: contrast(170%) brightness(1000%);
  background: linear-gradient(
      0deg,
      rgba(0, 0, 255, 0.6) 20%,
      rgb(255, 255, 0) 70%
    ),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 166 166' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.14' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

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
