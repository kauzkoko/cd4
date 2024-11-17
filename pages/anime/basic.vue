<template>
    <div class="container fullScreen flexCenter">
        <h1 class="animation" id="animation">Basic</h1>
    </div>
</template>

<script setup>
import {
  animate,
} from '~/assets/anime/anime.esm.js';

onMounted(() => {
  animate('#animation', {
  // Property keyframes
  translateY: [
    { to: '-2.75rem', ease: 'outExpo', duration: 600 },
    { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
  ],
  // Property specific parameters
  rotate: {
    from: '-1turn', // Specific from value
    to: 0,
    delay: 0
  },
  delay: (_, i) => i * 50, // Function based value
  ease: 'inOutCirc',
  loopDelay: 1000,
    loop: true
  });
});
</script>
