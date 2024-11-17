<template>
  <ViewsAutoRotate />
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="black" />
    <Suspense>
      <HelpersCustomPositional />
    </Suspense>
  </TresMesh>
  <LightsBasic />
</template>