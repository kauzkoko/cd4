<template>
  <ViewsBasic />
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="white" />
    <Suspense>
      <CustomPos />
    </Suspense>
  </TresMesh>
  <LightsBasic />
</template>