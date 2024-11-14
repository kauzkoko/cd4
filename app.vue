<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

.grain {
  filter: contrast(350%) brightness(1250%);
  background: linear-gradient(0deg, rgba(0,0,255,1), rgba(0,0,0,0)),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

// Color combinations array
$color-pairs: (
  (rgba(0, 0, 255, 1), rgba(0, 0, 0, 0)),     // blue -> transparent
  (rgba(255, 0, 0, 1), rgba(0, 0, 0, 0)),     // red -> transparent
  (rgba(0, 255, 0, 1), rgba(0, 0, 0, 0)),     // green -> transparent
  (rgba(128, 0, 255, 1), rgba(0, 0, 0, 0)),   // purple -> transparent
  (rgba(0, 255, 255, 1), rgba(0, 0, 0, 0)),   // cyan -> transparent
  (rgba(255, 192, 203, 1), rgba(0, 0, 0, 0)), // pink -> transparent
  (rgba(255, 165, 0, 1), rgba(0, 0, 0, 0)),   // orange -> transparent
  (rgba(75, 0, 130, 1), rgba(0, 0, 0, 0)),    // indigo -> transparent
  (rgba(0, 128, 128, 1), rgba(0, 0, 0, 0))    // teal -> transparent
);

@for $i from 1 through length($color-pairs) {
  .grain#{$i} {
    filter: contrast(350%) brightness(1250%);
    background: linear-gradient(
        0deg,
        nth(nth($color-pairs, $i), 1),
        nth(nth($color-pairs, $i), 2)
      ),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }
}
</style>
